import prisma from "../prisma";

export default {
  Program: {
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
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },

  Hashtag: {
    programs: ({ id }) => {
      return prisma.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .programs();
    },

    // Not working
    programCount: ({ id }) => {
      prisma.program.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
