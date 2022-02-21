import { gql } from "apollo-server";

// templates should be editable later
export default gql`
  type Mutation {
    deleteExercise(id: Int!): MutationResult!
  }
`;
