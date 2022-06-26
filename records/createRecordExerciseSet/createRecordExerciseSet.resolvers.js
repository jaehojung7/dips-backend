import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createRecordExerciseSet: protectedResolver(
      async (
        _,
        {
          recordId,
          recordExerciseIndex,
          recordExerciseSetIndex,
          weight,
          repCount,
        },
        { loggedInUser }
      ) => {
        const existingRecordExercise = await prisma.recordExercise.findFirst({
          where: {
            recordId,
            recordExerciseIndex,
          },
          select: {
            id: true,
          },
        });
        if (!existingRecordExercise) {
          return {
            ok: false,
            error: "Cannot find matching exercise in the record.",
          };
        }
        const newRecordExerciseSet = await prisma.recordExerciseSet.create({
          data: {
            recordId,
            recordExercise: {
              connect: {
                id: existingRecordExercise.id,
              },
            },
            recordExerciseSetIndex,
            weight,
            repCount,
          },
        });
        return {
          ok: true,
          id: newRecordExerciseSet.id,
        };
      }
    ),
  },
};
