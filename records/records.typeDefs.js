import { gql } from "apollo-server";

export default gql`
  type Record {
    id: Int!
    user: User!
    title: String!
    description: String
    baseProgramId: Int
    baseWorkoutIndex: Int
    recordExercises: [RecordExercise]
    createdAt: String!
    updatedAt: String!
  }
  type RecordExercise {
    id: Int!
    record: Record!
    recordExerciseIndex: Int!
    exercise: String!
    recordExerciseSets: [RecordExerciseSet]
    createdAt: String!
    updatedAt: String!
  }
  type RecordExerciseSet {
    id: Int!
    recordId: Int!
    recordExercise: RecordExercise!
    weight: Int!
    repCount: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
