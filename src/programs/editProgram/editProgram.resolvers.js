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
            error: "Cannot find program.",
          };
        }
        if (existingProgram.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "You are not authorized to update this program.",
          };
        }
        const programWithSameTitle = await prisma.program.findFirst({
          where: { title },
        });
        if (
          programWithSameTitle &&
          programWithSameTitle.id !== existingProgram.id
        ) {
          return {
            ok: false,
            error: "Program with the same title exists already.",
          };
        }

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
    ),
  },
};
