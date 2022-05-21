import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createProgram(
      title: String!
      description: String
      isPublic: Boolean!
    ): MutationResult!
  }
`;
