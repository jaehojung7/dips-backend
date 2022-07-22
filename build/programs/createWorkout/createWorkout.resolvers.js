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
    createWorkout: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var programId, workoutIndex, title, loggedInUser, existingProgram, newWorkout;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                programId = _ref.programId, workoutIndex = _ref.workoutIndex, title = _ref.title;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _prisma["default"].program.findUnique({
                  where: {
                    id: programId
                  }
                });

              case 4:
                existingProgram = _context.sent;

                if (existingProgram) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot find program."
                });

              case 7:
                _context.next = 9;
                return _prisma["default"].workout.create({
                  data: {
                    program: {
                      connect: {
                        id: programId
                      }
                    },
                    workoutIndex: workoutIndex,
                    title: title
                  }
                });

              case 9:
                newWorkout = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  programId: programId,
                  workoutIndex: workoutIndex
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