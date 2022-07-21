import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProgram(
      id: Int!
      title: String!
      description: String
      isPublic: Boolean!
    ): MutationResult!
  }
`;
