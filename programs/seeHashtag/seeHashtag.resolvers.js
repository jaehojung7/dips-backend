import prisma from "../../prisma";

// This query cannot filter out private programs
// searchPrograms should be used instead for selective search
export default {
  Query: {
    seeHashtag: (_, { hashtag }) =>
      prisma.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};
