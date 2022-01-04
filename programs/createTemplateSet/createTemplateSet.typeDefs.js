import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createTemplateSet(
      templateId: Int!
      exercise: [String]
      setCount: Int!
      rir: Int
      recReps: [Int]
    ): MutationResult!
  }
`;
