import { gql } from "apollo-server";

export default gql`
  type Exercise {
    id: Int!
    users: [User]
    exercise: String!
    bodyPart: String!
    createdAt: String!
    updatedAt: String!
  }
`;
