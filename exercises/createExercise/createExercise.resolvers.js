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
              error: "운동 부위가 올바르지 않습니다.",
            };
          }

          // If user does not have exercise yet, create new exercise
          const existingExercise = await prisma.exercise.findFirst({
            where: {
              userId: loggedInUser.id,
              exercise: exerciseUpperCase,
            },
          });

          if (existingExercise) {
            return {
              ok: false,
              error: `같은 이름의 종목이 이미 ${existingExercise.bodyPart} 부위 운동으로 등록되어 있습니다.`,
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
            error: "종목을 생성할 수 없습니다.",
          };
        }
      }
    ),
  },
};
