import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createTemplate(programId: Int!, title: String!): MutationResult!
  }
`;
