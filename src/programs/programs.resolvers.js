import prisma from "../prisma";

export default {
  Program: {
    // Resolvers for relations
    user: ({ userId }) => prisma.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      prisma.hashtag.findMany({
        where: {
          programs: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }) =>
      prisma.like.count({
        where: { programId: id },
      }),
    workouts: ({ id }) =>
      prisma.program
        .findUnique({ where: { id } })
        .workouts({ orderBy: { workoutIndex: "asc" } }),

    // Relations for computed fields
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const like = await prisma.like.findUnique({
        where: {
          programId_userId: {
            programId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (like) {
        return true;
      }
      return false;
    },
    likeCount: ({ id }) =>
      prisma.like.count({
        where: { programId: id },
      }),
  },

  Workout: {
    // Resolvers for relations
    workoutSets: ({ id }) =>
      prisma.workout
        .findUnique({ where: { id } })
        .workoutSets({ orderBy: { workoutSetIndex: "asc" } }),
  },

  Hashtag: {
    // Resolvers for relations
    programs: ({ id }) => {
      return prisma.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .programs();
    },

    // // Not working
    // programCount: ({ id }) => {
    //   prisma.program.count({
    //     where: {
    //       hashtags: {
    //         some: {
    //           id,
    //         },
    //       },
    //     },
    //   });
    // },
  },

  Like: {
    // Resolvers for relations
    program: ({ id }) => {
      return prisma.like
        .findUnique({
          where: {
            id,
          },
        })
        .program();
    },
  },
};
