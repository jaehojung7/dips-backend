import prisma from "../../prisma";

// If cursor-based pagination should be implemented, check out searchUsers.resolvers.js
// Lazy loading on the client side might be sufficient
export default {
  Query: {
    searchPrograms: (_, { keyword }, { loggedInUser }) =>
      prisma.program.findMany({
        where: {
          // Title or description should contain keyword
          OR: [
            {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
          // Program should by owned by loggedInUser or public
          AND: {
            OR: [
              {
                user: {
                  id: loggedInUser != null ? loggedInUser.id : undefined,
                },
              },
              { isPublic: true },
            ],
          },
        },
      }),
  },
};
