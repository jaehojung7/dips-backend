"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prisma = _interopRequireDefault(require("../../prisma"));

var _users = require("../../users/users.utils");

var _programs = require("../programs.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  Mutation: {
    createProgram: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var title, description, isPublic, loggedInUser, existingProgram, hashtagObjs, newProgram;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = _ref.title, description = _ref.description, isPublic = _ref.isPublic;
                loggedInUser = _ref2.loggedInUser;
                _context.prev = 2;
                _context.next = 5;
                return _prisma["default"].program.findFirst({
                  where: {
                    title: title
                  }
                });

              case 5:
                existingProgram = _context.sent;

                if (!existingProgram) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Program with the same title exists already."
                });

              case 8:
                // Parse hashtags and prepare hashtagObjs
                hashtagObjs = [];

                if (description) {
                  hashtagObjs = (0, _programs.processHashtags)(description);
                }

                _context.next = 12;
                return _prisma["default"].program.create({
                  data: _objectSpread({
                    title: title,
                    description: description,
                    isPublic: isPublic,
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    }
                  }, hashtagObjs.length > 0 && {
                    hashtags: {
                      connectOrCreate: hashtagObjs
                    }
                  })
                });

              case 12:
                newProgram = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: newProgram.id
                });

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot create program."
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