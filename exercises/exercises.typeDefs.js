import { gql } from "apollo-server";

export default gql`
  type Exercise {
    id: Int!
    user: User!
    exercise: String!
    bodyPart: String!
    createdAt: String!
    updatedAt: String!
  }
`;
