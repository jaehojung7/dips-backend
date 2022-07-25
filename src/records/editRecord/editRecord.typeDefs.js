import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editRecord(id: Int!, title: String!, description: String): MutationResult!
  }
`;
