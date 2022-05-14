import prisma from "../prisma";

export default {
  User: {
    // Resolvers for relations
    // These resolvers use root (User) information
    // Reminder: (root, args, context, info)
    programs: ({ id }) => prisma.user.findUnique({ where: { id } }).programs(),
    // Sort exercises (1) by body part and then (2) in alphabetical order
    exercises: ({ id }) =>
      prisma.user.findUnique({ where: { id } }).exercises({
        orderBy: [{ bodyPart: "asc" }, { exercise: "asc" }],
      }),
    // Sort records in reverse chronological order
    records: ({ id }) =>
      prisma.user
        .findUnique({ where: { id } })
        .records({ orderBy: { createdAt: "desc" } }),
    likes: ({ id }) => prisma.user.findUnique({ where: { id } }).likes(),

    // Resolvers for computed fields (fields that do not exist in DB)
    isMyProfile: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    recentProgram: async ({ id }) => {
      const records = await prisma.user
        .findUnique({ where: { id } })
        .records({ orderBy: { createdAt: "desc" } });
      if (records) {
        const recentProgramBasedRecord = records.find(
          (record) => record.baseProgramId !== null
        );
        if (recentProgramBasedRecord) {
          const recentProgram = await prisma.program.findUnique({
            where: { id: recentProgramBasedRecord.baseProgramId },
          });
        } else {
          return null;
        }
      } else {
        return null;
      }
      return recentProgram;
    },
    recentWorkoutIndex: async ({ id }) => {
      const records = await prisma.user
        .findUnique({ where: { id } })
        .records({ orderBy: { createdAt: "desc" } });
      if (records) {
        const recentProgramBasedRecord = records.find(
          (record) => record.baseProgramId !== null
        );
        if (recentProgramBasedRecord) {
          return recentProgramBasedRecord.baseWorkoutIndex;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },
};
