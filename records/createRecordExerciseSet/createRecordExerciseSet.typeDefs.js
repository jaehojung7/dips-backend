import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createRecordExerciseSet(
      recordId: Int!
      recordExerciseIndex: Int!
      weight: Int!
      repCount: Int! # rir: Int
    ): MutationResult!
  }
`;
