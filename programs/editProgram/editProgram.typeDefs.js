import { gql } from "apollo-server";

// templates should be editable later
export default gql`
  type Mutation {
    editProgram(id: Int!, title: String!, description: String): MutationResult!
  }
`;
