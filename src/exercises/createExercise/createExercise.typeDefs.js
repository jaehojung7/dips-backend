import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createExercise(exercise: String!, bodyPart: String!): MutationResult!
  }
`;
