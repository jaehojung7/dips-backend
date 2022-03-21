import { gql } from "apollo-server";

export default gql`
  type CreateWorkoutResult {
    ok: Boolean!
    programId: Int!
    workoutIndex: Int!
    error: String
  }
  type Mutation {
    createWorkout(
      programId: Int!
      workoutIndex: Int!
      title: String!
    ): CreateWorkoutResult!
  }
`;
