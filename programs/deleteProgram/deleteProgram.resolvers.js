import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteProgram: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingProgram = await prisma.program.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!existingProgram) {
        return {
          ok: false,
          error: "프로그램을 찾을 수 없습니다.",
        };
      } else if (existingProgram.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다.",
        };
      } else {
        // Delete workoutSets and workouts first,
        // to make the program deletable
        const deleteWorkoutSets = await prisma.workoutSet.deleteMany({
          where: {
            programId: existingProgram.id,
          },
        });

        const deleteWorkouts = await prisma.workout.deleteMany({
          where: {
            programId: existingProgram.id,
          },
        });

        const deleteProgram = await prisma.program.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
