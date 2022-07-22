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
    editRecord: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, title, description, loggedInUser, existingRecord, deleteRecordExerciseSets, deleteRecordExercises, updatedRecord;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id, title = _ref.title, description = _ref.description;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _prisma["default"].record.findFirst({
                  where: {
                    id: id,
                    userId: loggedInUser.id
                  },
                  select: {
                    userId: true,
                    id: true
                  }
                });

              case 4:
                existingRecord = _context.sent;

                if (existingRecord) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot find record."
                });

              case 9:
                if (!(existingRecord.userId !== loggedInUser.id)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "You are not authorized to update this record."
                });

              case 13:
                _context.next = 15;
                return _prisma["default"].recordExerciseSet.deleteMany({
                  where: {
                    recordId: existingRecord.id
                  }
                });

              case 15:
                deleteRecordExerciseSets = _context.sent;
                _context.next = 18;
                return _prisma["default"].recordExercise.deleteMany({
                  where: {
                    recordId: existingRecord.id
                  }
                });

              case 18:
                deleteRecordExercises = _context.sent;
                _context.next = 21;
                return _prisma["default"].record.update({
                  where: {
                    id: id
                  },
                  data: {
                    title: title,
                    description: description
                  }
                });

              case 21:
                updatedRecord = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: updatedRecord.id
                });

              case 23:
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