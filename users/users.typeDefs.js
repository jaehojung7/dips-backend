import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    avatar: String
    # programs: [Program]
    createdAt: String!
    updatedAt: String!
    isMyProfile: Boolean!
  }
`;
