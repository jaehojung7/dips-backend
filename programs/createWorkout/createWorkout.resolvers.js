import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createWorkout: protectedResolver(
      async (_, { programId, workoutIndex, title }, { loggedInUser }) => {
        const existingProgram = await prisma.program.findUnique({
          where: {
            id: programId,
          },
        });
        if (!existingProgram) {
          return {
            ok: false,
            error: "Cannot find program.",
          };
        }
        const newWorkout = await prisma.workout.create({
          data: {
            program: {
              connect: {
                id: programId,
              },
            },
            workoutIndex,
            title,
          },
        });
        return {
          ok: true,
          programId,
          workoutIndex,
        };
      }
    ),
  },
};
