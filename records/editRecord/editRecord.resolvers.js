import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editRecord: protectedResolver(
      async (_, { id, title, description }, { loggedInUser }) => {
        const existingRecord = await prisma.record.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
        });
        if (!existingRecord) {
          return {
            ok: false,
            error: "기록을 찾을 수 없습니다.",
          };
        } else if (existingRecord.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "변경 권한이 없습니다.",
          };
        } else {
          // Delete existing recordExercises and recordExerciseSets,
          // so that updated recordExercises and recordExerciseSets can be connected to the record
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

          // Update title and description
          const updatedRecord = await prisma.record.update({
            where: {
              id,
            },
            data: {
              title,
              description,
            },
          });
          return {
            ok: true,
            id: updatedRecord.id,
          };
        }
      }
    ),
  },
};
