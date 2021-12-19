// Always import and execute dotenv in the very beginning to use the virtualenv
require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

// Apollo server
const apollo = new ApolloServer({
  typeDefs,
  resolvers,

  // Get user token from the headers and retrieve a logged-in user with the token
  // Add the logged-in user information to context, which is carried by every executed resolver on the server
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

// Express
const app = express();

// Connect Apollo server and Express
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
