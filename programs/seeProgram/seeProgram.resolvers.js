import client from "../../client";

export default {
  Query: {
    seeProgram: async (_, { id }, { loggedInUser }) =>
      client.program.findUnique({
        where: {
          AND: [{ id }, { public: true }],
        },
      }),
  },
};
