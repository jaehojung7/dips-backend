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
    isPrivate: Boolean!
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
    workout: Workout!
    exercise: String!
    setCount: Int!
    repCount: Int
    # rir: Int
    # minReps: Int
    # maxReps: Int
    createdAt: String!
    updatedAt: String!
  }
`;
