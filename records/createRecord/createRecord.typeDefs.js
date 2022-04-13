import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createRecord(
      title: String!
      description: String
      baseProgramId: Int
      baseWorkoutIndex: Int
    ): MutationResult!
  }
`;
