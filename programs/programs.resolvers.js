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
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },

  Hashtag: {
    programs: ({ id }, { page }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .programs();
    },
    programCount: ({ id }) => {
      client.program.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
