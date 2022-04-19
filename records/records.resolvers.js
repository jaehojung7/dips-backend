import prisma from "../prisma";

export default {
  Record: {
    // Resolvers for relations
    user: ({ userId }) => prisma.user.findUnique({ where: { id: userId } }),
    recordExercises: ({ id }) =>
      prisma.record
        .findUnique({ where: { id } })
        .recordExercises({ orderBy: { createdAt: "asc" } }),
  },

  RecordExercise: {
    // Resolvers for relations
    recordExerciseSets: ({ id }) =>
      prisma.recordExercise
        .findUnique({ where: { id } })
        .recordExerciseSets({ orderBy: { createdAt: "asc" } }),
  },
};
