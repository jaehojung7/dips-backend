"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prisma = _interopRequireDefault(require("../../prisma"));

var _users = require("../../users/users.utils");

var _default = {
  Mutation: {
    createWorkoutSet: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var programId, workoutIndex, workoutSetIndex, exercise, setCount, repCount, loggedInUser, existingWorkout, newWorkoutSet;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                programId = _ref.programId, workoutIndex = _ref.workoutIndex, workoutSetIndex = _ref.workoutSetIndex, exercise = _ref.exercise, setCount = _ref.setCount, repCount = _ref.repCount;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _prisma["default"].workout.findFirst({
                  where: {
                    programId: programId,
                    workoutIndex: workoutIndex
                  },
                  select: {
                    id: true
                  }
                });

              case 4:
                existingWorkout = _context.sent;

                if (existingWorkout) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot find workout."
                });

              case 7:
                _context.next = 9;
                return _prisma["default"].workoutSet.create({
                  data: {
                    programId: programId,
                    workout: {
                      connect: {
                        id: existingWorkout.id
                      }
                    },
                    workoutSetIndex: workoutSetIndex,
                    exercise: exercise,
                    setCount: setCount,
                    repCount: repCount
                  }
                });

              case 9:
                newWorkoutSet = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: newWorkoutSet.id
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;