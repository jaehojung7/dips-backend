// Always import and execute dotenv in the very beginning to use the virtualenv
require("dotenv").config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

// Apollo server
const apollo = new ApolloServer({
  schema,

  // Get user token from the headers and retrieve a logged-in user with the token
  // Add the logged-in user information to context, which is carried by every executed resolver on the server
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

apollo
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
