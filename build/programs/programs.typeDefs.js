"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Program {\n    id: Int!\n    user: User!\n    title: String!\n    description: String\n    hashtags: [Hashtag]\n    likes: [Like]\n    workouts: [Workout]\n    createdAt: String!\n    updatedAt: String!\n    isPublic: Boolean!\n    isMine: Boolean!\n    isLiked: Boolean!\n    likeCount: Int\n  }\n  type Hashtag {\n    id: Int!\n    hashtag: String!\n    programs: [Program]\n    # programCount: Int!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Like {\n    id: Int!\n    program: Program!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Workout {\n    id: Int!\n    program: Program!\n    workoutIndex: Int!\n    title: String!\n    workoutSets: [WorkoutSet]\n    createdAt: String!\n    updatedAt: String!\n  }\n  type WorkoutSet {\n    id: Int!\n    programId: Int!\n    workout: Workout!\n    workoutSetIndex: Int!\n    exercise: String!\n    setCount: Int!\n    repCount: Int!\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));

exports["default"] = _default;