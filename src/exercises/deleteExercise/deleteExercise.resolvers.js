import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteExercise: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingExercise = await prisma.exercise.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
          id: true,
        },
      });

      if (!existingExercise) {
        return {
          ok: false,
          error: "Cannot find exercise.",
        };
      } else if (existingExercise.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "You are not authorized to delete this exercise.",
        };
      }

      const deleteExercise = await prisma.exercise.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        id: deleteExercise.id,
      };
    }),
  },
};
