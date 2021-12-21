import client from "../../client";

export default {
  Query: {
    seeProgram: (_, { id }) =>
      client.program.findUnique({
        where: {
          id,
        },
      }),
  },
};
