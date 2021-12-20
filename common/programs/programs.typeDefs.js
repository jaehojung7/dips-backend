import { gql } from "apollo-server";

export default gql`
  type Program {
    id: Int!
    user: User!
    description: String
    # hashtags: [Hashtag]
    # likes: Int
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }
  # type Hashtag {
  #   id: Int!
  #   hashtag: String!
  #   photos(page: Int!): [Photo]
  #   totalPhotos: Int!
  #   createdAt: String!
  #   updatedAt: String!
  # }
  # type Like {
  #   id: Int!
  #   photos: Photo!
  #   createdAt: String!
  #   updatedAt: String!
  # }
`;
