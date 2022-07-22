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
    createRecordExerciseSet: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var recordId, recordExerciseIndex, recordExerciseSetIndex, weight, repCount, loggedInUser, existingRecordExercise, newRecordExerciseSet;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                recordId = _ref.recordId, recordExerciseIndex = _ref.recordExerciseIndex, recordExerciseSetIndex = _ref.recordExerciseSetIndex, weight = _ref.weight, repCount = _ref.repCount;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _prisma["default"].recordExercise.findFirst({
                  where: {
                    recordId: recordId,
                    recordExerciseIndex: recordExerciseIndex
                  },
                  select: {
                    id: true
                  }
                });

              case 4:
                existingRecordExercise = _context.sent;

                if (existingRecordExercise) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot find matching exercise in the record."
                });

              case 7:
                _context.next = 9;
                return _prisma["default"].recordExerciseSet.create({
                  data: {
                    recordId: recordId,
                    recordExercise: {
                      connect: {
                        id: existingRecordExercise.id
                      }
                    },
                    recordExerciseSetIndex: recordExerciseSetIndex,
                    weight: weight,
                    repCount: repCount
                  }
                });

              case 9:
                newRecordExerciseSet = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: newRecordExerciseSet.id
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