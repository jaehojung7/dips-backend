import prisma from "../prisma";

export default {
  Exercise: {
    // Resolvers for relations
    user: ({ userId }) => prisma.user.findUnique({ where: { id: userId } }),
  },
};
