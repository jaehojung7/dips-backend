import prisma from "../../prisma";

export default {
  Query: {
    seeProfile: (_, { username }, { loggedInUser }) =>
      prisma.user.findUnique({
        where: {
          username,
        },

        // Include programs that belong to the user or are public
        include: {
          programs: {
            where: {
              OR: [
                {
                  user: {
                    id: loggedInUser != null ? loggedInUser.id : undefined,
                  },
                },
                { isPrivate: false },
              ],
            },
          },
        },
      }),
  },
};
