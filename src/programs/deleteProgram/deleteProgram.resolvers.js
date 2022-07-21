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
          id: true,
        },
      });

      if (!existingProgram) {
        return {
          ok: false,
          error: "Cannot find program.",
        };
      } else if (existingProgram.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "You are not authorized to delete this program.",
        };
      }

      // Delete likes,  workoutSets, and workouts, to make the program deletable
      const deleteLikes = await prisma.like.deleteMany({
        where: {
          programId: existingProgram.id,
        },
      });

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
        id: deleteProgram.id,
      };
    }),
  },
};
