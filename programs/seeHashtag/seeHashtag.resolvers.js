import client from "../../client";

export default {
  Query: {
    seeHashtag: (_, { hashtag }) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
        include: {
          programs: {
            where: {
              isPrivate: false,
            },
          },
        },
      }),
  },
};
