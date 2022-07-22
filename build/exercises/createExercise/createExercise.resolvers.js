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

var _exercises = require("../exercises.utils");

var _default = {
  Mutation: {
    createExercise: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var exercise, bodyPart, loggedInUser, exerciseUpperCase, existingExercise, newExercise;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                exercise = _ref.exercise, bodyPart = _ref.bodyPart;
                loggedInUser = _ref2.loggedInUser;
                _context.prev = 2;
                // Convert exercise to uppercase letters
                exerciseUpperCase = exercise.toUpperCase(); // Check if body part is correct

                if ((0, _exercises.checkBodyPart)(bodyPart)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Body part is not correct."
                });

              case 6:
                _context.next = 8;
                return _prisma["default"].exercise.findUnique({
                  where: {
                    exercise_userId: {
                      userId: loggedInUser.id,
                      exercise: exerciseUpperCase
                    }
                  }
                });

              case 8:
                existingExercise = _context.sent;

                if (!existingExercise) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "You already have this exercise. (Body part: ".concat(existingExercise.bodyPart, ")")
                });

              case 11:
                _context.next = 13;
                return _prisma["default"].exercise.create({
                  data: {
                    exercise: exerciseUpperCase,
                    bodyPart: bodyPart,
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    }
                  }
                });

              case 13:
                newExercise = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: newExercise.id
                });

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot create exercise."
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 17]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;