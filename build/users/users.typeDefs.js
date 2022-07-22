"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type User {\n    id: Int!\n    username: String!\n    email: String!\n    avatar: String\n    programs: [Program]\n    exercises: [Exercise]\n    records: [Record]\n    likes: [Like]\n    createdAt: String!\n    updatedAt: String!\n    isMyProfile: Boolean!\n    recentProgram: Program\n    recentWorkoutIndex: Int\n    # nextWorkoutIndex: Int\n  }\n"])));

exports["default"] = _default;