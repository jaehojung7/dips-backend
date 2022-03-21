import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteExercise(id: Int!): MutationResult!
  }
`;
