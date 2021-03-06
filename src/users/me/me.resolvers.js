import prisma from "../../prisma";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) =>
      prisma.user.findUnique({
        where: {
          id: loggedInUser.id,
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
          exercises: true,
          records: {
            include: {
              recordExercises: {
                include: {
                  recordExerciseSets: true,
                },
              },
            },
          },
          likes: {
            include: {
              program: true,
            },
          },

          // lastProgram might have be to added here
        },
      })
    ),
  },
};
