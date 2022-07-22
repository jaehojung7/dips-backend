"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prisma = _interopRequireDefault(require("../../prisma"));

// Return program only if it belongs to loggedInUser or is public
var _default = {
  Query: {
    seeProgram: function () {
      var _seeProgram = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                loggedInUser = _ref2.loggedInUser;
                return _context.abrupt("return", _prisma["default"].program.findFirst({
                  where: {
                    id: id,
                    OR: [{
                      user: {
                        id: loggedInUser != null ? loggedInUser.id : undefined
                      }
                    }, {
                      isPublic: false
                    }]
                  }
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeProgram(_x, _x2, _x3) {
        return _seeProgram.apply(this, arguments);
      }

      return seeProgram;
    }()
  }
};
exports["default"] = _default;