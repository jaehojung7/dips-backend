import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createRecordExercise: protectedResolver(
      async (
        _,
        { recordId, recordExerciseIndex, exercise },
        { loggedInUser }
      ) => {
        const existingRecord = await prisma.record.findUnique({
          where: {
            id: recordId,
          },
          select: {
            id: true,
          },
        });
        if (!existingRecord) {
          return {
            ok: false,
            error: "Cannot find record.",
          };
        }
        const newRecordExercise = await prisma.recordExercise.create({
          data: {
            record: {
              connect: {
                id: recordId,
              },
            },
            recordExerciseIndex,
            exercise,
          },
        });
        return {
          ok: true,
          recordId,
          recordExerciseIndex,
        };
      }
    ),
  },
};
