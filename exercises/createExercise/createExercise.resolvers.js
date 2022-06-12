import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.utils";
import { checkBodyPart } from "../exercises.utils";

export default {
  Mutation: {
    createExercise: protectedResolver(
      async (_, { exercise, bodyPart }, { loggedInUser }) => {
        try {
          // Convert exercise to uppercase letters
          const exerciseUpperCase = exercise.toUpperCase();

          // Check if body part is correct
          if (!checkBodyPart(bodyPart)) {
            return {
              ok: false,
              error: "Bodypart is not correct",
            };
          }

          // If user does not have exercise yet, create new exercise
          const existingExercise = await prisma.exercise.findUnique({
            where: {
              exercise_userId: {
                userId: loggedInUser.id,
                exercise: exerciseUpperCase,
              },
            },
          });

          if (existingExercise) {
            return {
              ok: false,
              error: `Already registered with ${existingExercise.bodyPart}`,
            };
          }

          const newExercise = await prisma.exercise.create({
            data: {
              exercise: exerciseUpperCase,
              bodyPart,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });

          return {
            ok: true,
            id: newExercise.id,
          };
        } catch (e) {
          return {
            ok: false,
            error: "Not available to create this exercise",
          };
        }
      }
    ),
  },
};
