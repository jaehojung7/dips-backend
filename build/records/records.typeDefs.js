"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Record {\n    id: Int!\n    user: User!\n    title: String!\n    date: String!\n    description: String\n    baseProgramId: Int\n    baseWorkoutIndex: Int\n    recordExercises: [RecordExercise]\n    createdAt: String!\n    updatedAt: String!\n  }\n  type RecordExercise {\n    id: Int!\n    record: Record!\n    recordExerciseIndex: Int!\n    exercise: String!\n    recordExerciseSets: [RecordExerciseSet]\n    createdAt: String!\n    updatedAt: String!\n  }\n  type RecordExerciseSet {\n    id: Int!\n    recordId: Int!\n    recordExercise: RecordExercise!\n    recordExerciseSetIndex: Int!\n    weight: Int!\n    repCount: Int!\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));

exports["default"] = _default;