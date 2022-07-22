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
    createRecord: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var title, description, baseProgramId, baseWorkoutIndex, loggedInUser, weekday, today, dd, mm, yyyy, day, date, newRecord;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = _ref.title, description = _ref.description, baseProgramId = _ref.baseProgramId, baseWorkoutIndex = _ref.baseWorkoutIndex;
                loggedInUser = _ref2.loggedInUser;
                _context.prev = 2;
                // Create a string for today's date
                weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                today = new Date();
                dd = String(today.getDate()).padStart(2, "0");
                mm = String(today.getMonth() + 1).padStart(2, "0");
                yyyy = today.getFullYear();
                day = weekday[today.getDay()];
                date = yyyy + "-" + mm + "-" + dd + " " + day;
                _context.next = 12;
                return _prisma["default"].record.create({
                  data: {
                    title: title,
                    date: date,
                    description: description,
                    baseProgramId: baseProgramId,
                    baseWorkoutIndex: baseWorkoutIndex,
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    }
                  }
                });

              case 12:
                newRecord = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: newRecord.id
                });

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot save record."
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 16]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;