import { gql } from "apollo-server";

export default gql`
  type CreateTemplateResult {
    ok: Boolean!
    programId: Int!
    templateIndex: Int!
    error: String
  }
  type Mutation {
    createTemplate(
      programId: Int!
      templateIndex: Int!
      title: String!
    ): CreateTemplateResult!
  }
`;
