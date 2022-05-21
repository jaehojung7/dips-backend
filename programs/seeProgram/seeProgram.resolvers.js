import prisma from "../../prisma";

// Return program only if it belongs to loggedInUser or is public
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
            { isPublic: false },
          ],
        },
      }),
  },
};
