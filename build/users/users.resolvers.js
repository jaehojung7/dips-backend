"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prisma = _interopRequireDefault(require("../prisma"));

var _default = {
  User: {
    // Resolvers for relations
    // These resolvers use root (User) information
    // Reminder: (root, args, context, info)
    // Sort programs in reverse chronological order
    programs: function programs(_ref) {
      var id = _ref.id;
      return _prisma["default"].user.findUnique({
        where: {
          id: id
        }
      }).programs({
        orderBy: {
          updatedAt: "desc"
        }
      });
    },
    // Sort exercises (1) by body part and then (2) in alphabetical order
    exercises: function exercises(_ref2) {
      var id = _ref2.id;
      return _prisma["default"].user.findUnique({
        where: {
          id: id
        }
      }).exercises({
        orderBy: [{
          bodyPart: "asc"
        }, {
          exercise: "asc"
        }]
      });
    },
    // Sort records in reverse chronological order
    records: function records(_ref3) {
      var id = _ref3.id;
      return _prisma["default"].user.findUnique({
        where: {
          id: id
        }
      }).records({
        orderBy: {
          createdAt: "desc"
        }
      });
    },
    // Sort programs in reverse chronological order
    likes: function likes(_ref4) {
      var id = _ref4.id;
      return _prisma["default"].user.findUnique({
        where: {
          id: id
        }
      }).likes({
        orderBy: {
          createdAt: "desc"
        }
      });
    },
    // Resolvers for computed fields (fields that do not exist in DB)
    isMyProfile: function isMyProfile(_ref5, _, _ref6) {
      var id = _ref5.id;
      var loggedInUser = _ref6.loggedInUser;

      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },
    recentProgram: function () {
      var _recentProgram = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref7) {
        var id, records, recentProgramBasedRecord, _recentProgram2;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref7.id;
                _context.next = 3;
                return _prisma["default"].user.findUnique({
                  where: {
                    id: id
                  }
                }).records({
                  orderBy: {
                    createdAt: "desc"
                  }
                });

              case 3:
                records = _context.sent;

                if (!records) {
                  _context.next = 12;
                  break;
                }

                recentProgramBasedRecord = records.find(function (record) {
                  return record.baseProgramId !== null;
                });

                if (!recentProgramBasedRecord) {
                  _context.next = 11;
                  break;
                }

                _context.next = 9;
                return _prisma["default"].program.findUnique({
                  where: {
                    id: recentProgramBasedRecord.baseProgramId
                  }
                });

              case 9:
                _recentProgram2 = _context.sent;
                return _context.abrupt("return", _recentProgram2);

              case 11:
                return _context.abrupt("return", null);

              case 12:
                return _context.abrupt("return", null);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function recentProgram(_x) {
        return _recentProgram.apply(this, arguments);
      }

      return recentProgram;
    }(),
    recentWorkoutIndex: function () {
      var _recentWorkoutIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref8) {
        var id, records, recentProgramBasedRecord;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref8.id;
                _context2.next = 3;
                return _prisma["default"].user.findUnique({
                  where: {
                    id: id
                  }
                }).records({
                  orderBy: {
                    createdAt: "desc"
                  }
                });

              case 3:
                records = _context2.sent;

                if (!records) {
                  _context2.next = 9;
                  break;
                }

                recentProgramBasedRecord = records.find(function (record) {
                  return record.baseProgramId !== null;
                });

                if (!recentProgramBasedRecord) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", recentProgramBasedRecord.baseWorkoutIndex);

              case 8:
                return _context2.abrupt("return", null);

              case 9:
                return _context2.abrupt("return", null);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function recentWorkoutIndex(_x2) {
        return _recentWorkoutIndex.apply(this, arguments);
      }

      return recentWorkoutIndex;
    }()
  }
};
exports["default"] = _default;