import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createWorkoutSet(
      programId: Int!
      workoutIndex: Int!
      workoutSetIndex: Int!
      exercise: String!
      setCount: Int!
      repCount: Int!
    ): MutationResult!
  }
`;
