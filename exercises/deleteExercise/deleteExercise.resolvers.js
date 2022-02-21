import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteExercise: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingExercise = await prisma.exercise.findUnique({
        where: {
          id,
        },

        // Without this part, we cannot disconnect exercise from user
        include: {
          users: true,
        },
      });

      if (!existingExercise) {
        return {
          ok: false,
          error: "해당 종목을 찾을 수 없습니다.",
        };
      }

      await prisma.exercise.update({
        where: {
          id,
        },
        data: {
          users: {
            disconnect: {
              id: loggedInUser.id,
            },
          },
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
