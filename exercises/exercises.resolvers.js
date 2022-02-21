import prisma from "../prisma";

export default {
  Exercise: {
    // Resolvers for relations
    users: ({ id }) => {
      return prisma.exercise
        .findUnique({
          where: {
            id,
          },
        })
        .users();
    },
  },
};
