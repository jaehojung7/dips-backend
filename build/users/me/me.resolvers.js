"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _users = require("../users.utils");

var _default = {
  Query: {
    me: (0, _users.protectedResolver)(function (_, __, _ref) {
      var loggedInUser = _ref.loggedInUser;
      return _prisma["default"].user.findUnique({
        where: {
          id: loggedInUser.id
        },
        include: {
          programs: {
            include: {
              workouts: {
                include: {
                  workoutSets: true
                }
              }
            }
          },
          exercises: true,
          records: {
            include: {
              recordExercises: {
                include: {
                  recordExerciseSets: true
                }
              }
            }
          },
          likes: {
            include: {
              program: true
            }
          } // lastProgram might have be to added here

        }
      });
    })
  }
};
exports["default"] = _default;