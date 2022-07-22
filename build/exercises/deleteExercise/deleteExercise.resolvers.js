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
    deleteExercise: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, loggedInUser, existingExercise, deleteExercise;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _prisma["default"].exercise.findUnique({
                  where: {
                    id: id
                  },
                  select: {
                    userId: true,
                    id: true
                  }
                });

              case 4:
                existingExercise = _context.sent;

                if (existingExercise) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot find exercise."
                });

              case 9:
                if (!(existingExercise.userId !== loggedInUser.id)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "You are not authorized to delete this exercise."
                });

              case 11:
                _context.next = 13;
                return _prisma["default"].exercise["delete"]({
                  where: {
                    id: id
                  }
                });

              case 13:
                deleteExercise = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: deleteExercise.id
                });

              case 15:
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