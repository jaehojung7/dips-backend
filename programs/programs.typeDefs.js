import { gql } from "apollo-server";

export default gql`
  type Program {
    id: Int!
    user: User!
    title: String!
    description: String
    hashtags: [Hashtag]
    templates: [Template]
    isPrivate: Boolean!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
    likeCount: Int
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    programs: [Program]
    # programCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    program: Program!
    createdAt: String!
    updatedAt: String!
  }
  type Template {
    id: Int!
    program: Program!
    templateIndex: Int!
    title: String!
    templateSets: [TemplateSet]
    createdAt: String!
    updatedAt: String!
  }
  type TemplateSet {
    id: Int!
    template: Template!
    exercises: [String]
    setCount: Int!
    # rir: Int
    # minReps: Int
    # maxReps: Int
    createdAt: String!
    updatedAt: String!
  }
`;
