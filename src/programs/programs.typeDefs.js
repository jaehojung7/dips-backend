import { gql } from "apollo-server";

export default gql`
  type Program {
    id: Int!
    user: User!
    title: String!
    description: String
    hashtags: [Hashtag]
    likes: [Like]
    workouts: [Workout]
    createdAt: String!
    updatedAt: String!
    isPublic: Boolean!
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
  type Workout {
    id: Int!
    program: Program!
    workoutIndex: Int!
    title: String!
    workoutSets: [WorkoutSet]
    createdAt: String!
    updatedAt: String!
  }
  type WorkoutSet {
    id: Int!
    programId: Int!
    workout: Workout!
    workoutSetIndex: Int!
    exercise: String!
    setCount: Int!
    repCount: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
