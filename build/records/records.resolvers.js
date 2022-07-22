"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prisma = _interopRequireDefault(require("../prisma"));

var _default = {
  Record: {
    // Resolvers for relations
    user: function user(_ref) {
      var userId = _ref.userId;
      return _prisma["default"].user.findUnique({
        where: {
          id: userId
        }
      });
    },
    recordExercises: function recordExercises(_ref2) {
      var id = _ref2.id;
      return _prisma["default"].record.findUnique({
        where: {
          id: id
        }
      }).recordExercises({
        orderBy: {
          recordExerciseIndex: "asc"
        }
      });
    }
  },
  RecordExercise: {
    // Resolvers for relations
    recordExerciseSets: function recordExerciseSets(_ref3) {
      var id = _ref3.id;
      return _prisma["default"].recordExercise.findUnique({
        where: {
          id: id
        }
      }).recordExerciseSets({
        orderBy: {
          recordExerciseSetIndex: "asc"
        }
      });
    }
  }
};
exports["default"] = _default;