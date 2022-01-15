import prisma from "../prisma";

export default {
  User: {
    // Resolvers for relations
    // These resolvers use root (User) information
    // Reminder: (root, args, context, info)
    programs: ({ id }) => prisma.user.findUnique({ where: { id } }).programs(),
    likes: ({ id }) => prisma.user.findUnique({ where: { id } }).likes(),

    // Resolvers for computed fields (fields that do not exist in DB)
    isMyProfile: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};
