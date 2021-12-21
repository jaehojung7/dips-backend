import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createProgram(title: String!, description: String): MutationResult!
    # createProgram(title: String!, description: String, templates: Template): MutationResult!
  }
`;
