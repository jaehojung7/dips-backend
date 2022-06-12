import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createWorkoutSet: protectedResolver(
      async (
        _,
        {
          programId,
          workoutIndex,
          workoutSetIndex,
          exercise,
          setCount,
          repCount,
        },
        { loggedInUser }
      ) => {
        const existingWorkout = await prisma.workout.findFirst({
          where: {
            programId,
            workoutIndex,
          },
          select: {
            id: true,
          },
        });
        if (!existingWorkout) {
          return {
            ok: false,
            error: "워크아웃을 찾을 수 없습니다.",
          };
        }
        const newWorkoutSet = await prisma.workoutSet.create({
          data: {
            programId,
            workout: {
              connect: {
                id: existingWorkout.id,
              },
            },
            workoutSetIndex,
            exercise,
            setCount,
            repCount,
          },
        });
        return {
          ok: true,
          id: newWorkoutSet.id,
        };
      }
    ),
  },
};
