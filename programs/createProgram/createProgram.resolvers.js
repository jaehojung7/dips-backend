import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createProgram: protectedResolver(
      async (_, { title, description, isPrivate }, { loggedInUser }) => {
        try {
          // Check if an existing program has the same title
          const existingProgram = await prisma.program.findFirst({
            where: { title },
          });
          if (existingProgram) {
            return {
              ok: false,
              error: "같은 이름의 프로그램이 이미 존재합니다.",
            };
          }

          // Parse description and create hashtags
          let hashtagObj = [];
          if (description) {
            const hashtags = description.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
            hashtagObj = hashtags.map((hashtag) => ({
              where: { hashtag },
              create: { hashtag },
            }));
          }

          // Save program with parsed hashtags
          // Add program to the hashtags
          await prisma.program.create({
            data: {
              title,
              description,
              isPrivate,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(hashtagObj.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtagObj,
                },
              }),
            },
          });
          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: "프로그램을 생성할 수 없습니다.",
          };
        }
      }
    ),
  },
};
