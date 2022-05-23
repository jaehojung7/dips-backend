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
          error: "해당 종목을 찾을 수 없습니다.",
        };
      } else if (existingExercise.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다.",
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
