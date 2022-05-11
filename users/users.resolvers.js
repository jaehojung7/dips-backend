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
      const recentProgramBasedRecord = records.find(
        (record) => record.baseProgramId !== null
      );
      const recentProgram = await prisma.program.findUnique({
        where: { id: recentProgramBasedRecord.baseProgramId },
      });
      return recentProgram;
    },
    recentWorkoutIndex: async ({ id }) => {
      const records = await prisma.user
        .findUnique({ where: { id } })
        .records({ orderBy: { createdAt: "desc" } });
      const recentProgramBasedRecord = records.find(
        (record) => record.baseProgramId !== null
      );
      return recentProgramBasedRecord.baseWorkoutIndex;
    },
  },
};
