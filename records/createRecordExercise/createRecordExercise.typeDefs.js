import { gql } from "apollo-server";

export default gql`
  type CreateRecordExerciseResult {
    ok: Boolean!
    recordId: Int!
    recordExerciseIndex: Int!
    error: String
  }
  type Mutation {
    createRecordExercise(
      recordId: Int!
      recordExerciseIndex: Int!
      exercise: String!
    ): CreateRecordExerciseResult!
  }
`;
