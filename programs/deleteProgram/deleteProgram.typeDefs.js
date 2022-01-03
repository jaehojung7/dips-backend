import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteProgram(id: Int!): MutationResult!
  }
`;
