import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createRecordExerciseSet: protectedResolver(
      async (
        _,
        { recordId, recordExerciseIndex, weight, repCount },
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
            error: "운동 기록에 해당 종목을 찾을 수 없습니다.",
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
            weight,
            repCount,
            // rir,
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
