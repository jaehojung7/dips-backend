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
          select: {
            userId: true,
            id: true,
          },
        });
        if (!existingRecord) {
          return {
            ok: false,
            error: "Cannot find record.",
          };
        } else if (existingRecord.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "You are not authorized to update this record.",
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
