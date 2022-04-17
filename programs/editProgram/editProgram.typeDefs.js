import { gql } from "apollo-server";

// workouts should be editable later
export default gql`
  type Mutation {
    editProgram(
      id: Int!
      title: String!
      description: String
      isPrivate: Boolean!
    ): MutationResult!
  }
`;
