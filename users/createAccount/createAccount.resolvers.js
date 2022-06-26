import bcrypt from "bcrypt";
import { defaultExercises } from "../../exercises/exercises.utils";
import prisma from "../../prisma";
import { defaultPrograms } from "../../programs/programs.utils";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        // Check if username/email already exists
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "Username or email exists already.",
          };
        }

        // Create a new user with an encrypted password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create admin account with default programs
        if (username === "admin") {
          const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password: encryptedPassword,
              programs: { create: defaultPrograms },
            },
            include: {
              programs: {
                include: {
                  workouts: {
                    include: {
                      workoutSets: true,
                    },
                  },
                },
              },
            },
          });

          return {
            ok: true,
            id: newUser.id,
          };
        }

        // Create user with default exercises and likes
        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: encryptedPassword,
            exercises: { create: defaultExercises },
            likes: {
              create: [
                { program: { connect: { title: "StrongLifts 5x5" } } },
                { program: { connect: { title: "Dips' Push-Pull-Legs" } } },
              ],
            },
          },
        });

        return {
          ok: true,
          id: newUser.id,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Cannot create account.",
        };
      }
    },
  },
};
