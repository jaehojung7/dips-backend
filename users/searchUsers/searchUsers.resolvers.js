import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) =>
      // Cursor-based pagination
      client.user.findMany({
        where: { username: { startsWith: keyword.toLowercase() } },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
