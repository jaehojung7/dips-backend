import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createWorkoutSet: protectedResolver(
      async (
        _,
        { programId, workoutIndex, exercise, setCount },
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
            error: "템플릿을 찾을 수 없습니다.",
          };
        }
        const newWorkoutSet = await prisma.workoutSet.create({
          data: {
            workout: {
              connect: {
                id: existingWorkout.id,
              },
            },
            exercise,
            setCount,
            // rir,
            // minReps,
            // maxReps,
            // Let's think about if a workoutSet has to be connected to a user
            // In this case, Prisma model has to be updated as well
            // user: {
            //   connect: {
            //     id: loggedInUser.id,
            //   },
            // },
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
