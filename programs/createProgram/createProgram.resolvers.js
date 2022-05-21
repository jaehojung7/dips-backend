import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../programs.utils";

export default {
  Mutation: {
    createProgram: protectedResolver(
      async (_, { title, description, isPublic }, { loggedInUser }) => {
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

          // Parse hashtags and prepare hashtagObjs
          let hashtagObjs = [];
          if (description) {
            hashtagObjs = processHashtags(description);
          }

          const newProgram = await prisma.program.create({
            data: {
              title,
              description,
              isPublic,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(hashtagObjs.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtagObjs,
                },
              }),
            },
          });
          return {
            ok: true,
            id: newProgram.id,
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
