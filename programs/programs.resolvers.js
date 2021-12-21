import client from "../client";

export default {
  Program: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          programs: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
