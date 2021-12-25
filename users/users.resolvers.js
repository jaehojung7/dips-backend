import prisma from "../prisma";

export default {
  User: {
    // Resolvers for computed fields (fields that do not exist in DB)
    // These resolvers use root (User) information
    // Reminder: (root, args, context, info)
    isMyProfile: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};
