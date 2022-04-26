import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteRecord: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const existingRecord = await prisma.record.findUnique({
        where: {
          id,
        },
      });
      if (!existingRecord) {
        return {
          ok: false,
          error: "운동 기록을 찾을 수 없습니다.",
        };
      } else if (existingRecord.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다.",
        };
      } else {
        // Delete recordExerciseSets and recordExercises first,
        // to make the record deletable
        const deleteRecordExerciseSets =
          await prisma.recordExerciseSet.deleteMany({
            where: {
              recordId: existingRecord.id,
            },
          });

        const deleteRecordExercises = await prisma.recordExercise.deleteMany({
          where: {
            recordId: existingRecord.id,
          },
        });

        const deleteRecord = await prisma.record.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
          id: deleteRecord.id,
        };
      }
    }),
  },
};
