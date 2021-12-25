import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../programs.utils";

// templates should be editable later
export default {
  Mutation: {
    editProgram: protectedResolver(
      async (_, { id, description }, { loggedInUser }) => {
        const existingProgram = await prisma.program.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },

          // Without this part, we cannot disconnect existing hashtags
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!existingProgram) {
          return {
            ok: false,
            error: "프로그램을 찾을 수 없습니다.",
          };
        }
        await prisma.program.update({
          where: {
            id,
          },
          data: {
            description,
            hashtags: {
              disconnect: existingProgram.hashtags,
              connectOrCreate: processHashtags(description),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
