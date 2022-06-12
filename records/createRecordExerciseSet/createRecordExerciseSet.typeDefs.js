import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createRecordExerciseSet(
      recordId: Int!
      recordExerciseIndex: Int!
      recordExerciseSetIndex: Int!
      weight: Int!
      repCount: Int!
    ): MutationResult!
  }
`;
