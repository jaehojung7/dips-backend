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
            error: "운동 기록을 찾을 수 없습니다.",
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
