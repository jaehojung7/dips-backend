import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../programs.utils";

export default {
  Mutation: {
    editProgram: protectedResolver(
      async (_, { id, title, description, isPublic }, { loggedInUser }) => {
        const existingProgram = await prisma.program.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },

          // Without this part, we cannot disconnect existing hashtags
          // Relations are not included by default
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!existingProgram) {
          return {
            ok: false,
            error: "프로그램을 찾을 수 없습니다.",
          };
        } else if (existingProgram.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "변경 권한이 없습니다.",
          };
        } else {
          // Delete existing workouts and workoutSets,
          // so that updated workouts and workoutSets can be connected to the program
          const deleteWorkoutSets = await prisma.workoutSet.deleteMany({
            where: {
              programId: existingProgram.id,
            },
          });

          const deleteWorkouts = await prisma.workout.deleteMany({
            where: {
              programId: existingProgram.id,
            },
          });

          // Process hashtags in the updated description
          let hashtagObjs = [];
          if (description) {
            hashtagObjs = processHashtags(description);
          } else {
            description = "";
          }

          // Update title, description, and hashtags
          const updatedProgram = await prisma.program.update({
            where: {
              id,
            },
            data: {
              title,
              description,
              isPublic,
              hashtags: {
                disconnect: existingProgram.hashtags,
                connectOrCreate: hashtagObjs,
              },
            },
          });
          return {
            ok: true,
            id: updatedProgram.id,
          };
        }
      }
    ),
  },
};
