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
          select: {
            id: true,
          },
        });
        if (!existingProgram) {
          return {
            ok: false,
            error: "프로그램을 찾을 수 없습니다.",
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
