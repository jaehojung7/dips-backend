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
    templates: ({ id }) =>
      prisma.program.findUnique({ where: { id } }).templates(),

    // Relations for computed fields
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    likeCount: ({ id }) =>
      prisma.like.count({
        where: { programId: id },
      }),
  },

  Template: {
    // Resolvers for relations
    templateSets: ({ id }) =>
      prisma.template.findUnique({ where: { id } }).templateSets(),
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
