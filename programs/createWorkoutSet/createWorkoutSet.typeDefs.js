import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createWorkoutSet(
      programId: Int!
      workoutIndex: Int!
      exercise: String!
      setCount: Int!
      repCount: Int # rir: Int
    ): MutationResult!
  }
`;
