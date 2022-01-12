import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createTemplateSet(
      programId: Int!
      templateIndex: Int!
      exercise: [String]
      setCount: Int!
    ): # rir: Int
    # minReps: Int
    # maxReps: Int
    MutationResult!
  }
`;
