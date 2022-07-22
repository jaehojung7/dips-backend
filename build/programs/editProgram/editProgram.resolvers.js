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

var _programs = require("../programs.utils");

var _default = {
  Mutation: {
    editProgram: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, title, description, isPublic, loggedInUser, existingProgram, programWithSameTitle, deleteWorkoutSets, deleteWorkouts, hashtagObjs, updatedProgram;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id, title = _ref.title, description = _ref.description, isPublic = _ref.isPublic;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _prisma["default"].program.findFirst({
                  where: {
                    id: id,
                    userId: loggedInUser.id
                  },
                  // Without this part, we cannot disconnect existing hashtags
                  // Relations are not included by default
                  include: {
                    hashtags: {
                      select: {
                        hashtag: true
                      }
                    }
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
                if (!(existingProgram.userId !== loggedInUser.id)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "You are not authorized to update this program."
                });

              case 9:
                _context.next = 11;
                return _prisma["default"].program.findFirst({
                  where: {
                    title: title
                  }
                });

              case 11:
                programWithSameTitle = _context.sent;

                if (!(programWithSameTitle && programWithSameTitle.id !== existingProgram.id)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Program with the same title exists already."
                });

              case 14:
                _context.next = 16;
                return _prisma["default"].workoutSet.deleteMany({
                  where: {
                    programId: existingProgram.id
                  }
                });

              case 16:
                deleteWorkoutSets = _context.sent;
                _context.next = 19;
                return _prisma["default"].workout.deleteMany({
                  where: {
                    programId: existingProgram.id
                  }
                });

              case 19:
                deleteWorkouts = _context.sent;
                // Process hashtags in the updated description
                hashtagObjs = [];

                if (description) {
                  hashtagObjs = (0, _programs.processHashtags)(description);
                } else {
                  description = "";
                } // Update title, description, and hashtags


                _context.next = 24;
                return _prisma["default"].program.update({
                  where: {
                    id: id
                  },
                  data: {
                    title: title,
                    description: description,
                    isPublic: isPublic,
                    hashtags: {
                      disconnect: existingProgram.hashtags,
                      connectOrCreate: hashtagObjs
                    }
                  }
                });

              case 24:
                updatedProgram = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: updatedProgram.id
                });

              case 26:
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