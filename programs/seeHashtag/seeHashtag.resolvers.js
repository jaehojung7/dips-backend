import prisma from "../../prisma";

export default {
  Query: {
    seeHashtag: (_, { hashtag }, { loggedInUser }) =>
      prisma.hashtag.findUnique({
        where: {
          hashtag,
        },

        // // I private programs of other users
        // include: {
        //   programs: {
        //     where: {
        //       // OR: [
        //       //   {
        //       //     user: {
        //       //       id: loggedInUser != null ? loggedInUser.id : undefined,
        //       //     },
        //       //   },
        //       //   { isPrivate: false },
        //       // ],
        //       isPrivate: false,
        //     },
        //   },
        // },
      }),
  },
};
