import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const program = await prisma.program.findUnique({
        where: {
          id,
        },
      });
      if (!program) {
        return {
          ok: false,
          error: "Program not found",
        };
      }
      const likeObj = {
        programId_userId: {
          userId: loggedInUser.id,
          programId: id,
        },
      };
      const like = await prisma.like.findUnique({
        where: likeObj,
      });
      if (like) {
        await prisma.like.delete({
          where: likeObj,
        });
      } else {
        await prisma.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            program: {
              connect: {
                id: program.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
