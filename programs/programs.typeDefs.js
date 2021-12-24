import { gql } from "apollo-server";

export default gql`
  type Program {
    id: Int!
    user: User!
    title: String!
    description: String
    hashtags: [Hashtag]
    # templates: [Template]
    # likes: Int
    isPrivate: Boolean!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    programs(page: Int!): [Program]
    programCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  # type Like {
  #   id: Int!
  #   photos: Photo!
  #   createdAt: String!
  #   updatedAt: String!
  # }
`;
