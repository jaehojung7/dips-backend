import prisma from "../../prisma";

export default {
  Query: {
    seeProgram: async (_, { id }, { loggedInUser }) =>
      prisma.program.findFirst({
        where: {
          id,
          OR: [
            {
              user: {
                id: loggedInUser != null ? loggedInUser.id : undefined,
              },
            },
            { isPrivate: false },
          ],
        },
      }),
  },
};
