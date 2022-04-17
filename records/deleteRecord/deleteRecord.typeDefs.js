import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteRecord(id: Int!): MutationResult!
  }
`;
