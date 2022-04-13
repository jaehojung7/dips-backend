import prisma from "../prisma";

export default {
  User: {
    // Resolvers for relations
    // These resolvers use root (User) information
    // Reminder: (root, args, context, info)
    programs: ({ id }) => prisma.user.findUnique({ where: { id } }).programs(),
    exercises: ({ id }) =>
      prisma.user.findUnique({ where: { id } }).exercises(),
    records: ({ id }) => prisma.user.findUnique({ where: { id } }).records(),
    likes: ({ id }) => prisma.user.findUnique({ where: { id } }).likes(),

    // Resolvers for computed fields (fields that do not exist in DB)
    isMyProfile: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    // lastProgram:
    // Use the latest non-null baseProgramId to find the title (string) of the most recently used program
    // Use async-await (refer to isFollowing field on Instagram-clone)
  },
};
