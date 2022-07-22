"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _exercises = require("../../exercises/exercises.utils");

var _prisma = _interopRequireDefault(require("../../prisma"));

var _programs = require("../../programs/programs.utils");

var _default = {
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, email, password, existingUser, encryptedPassword, _newUser, newUser;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, email = _ref.email, password = _ref.password;
                _context.prev = 1;
                _context.next = 4;
                return _prisma["default"].user.findFirst({
                  where: {
                    OR: [{
                      username: username
                    }, {
                      email: email
                    }]
                  }
                });

              case 4:
                existingUser = _context.sent;

                if (!existingUser) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Username or email exists already."
                });

              case 7:
                _context.next = 9;
                return _bcrypt["default"].hash(password, 10);

              case 9:
                encryptedPassword = _context.sent;

                if (!(username === "admin")) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return _prisma["default"].user.create({
                  data: {
                    username: username,
                    email: email,
                    password: encryptedPassword,
                    programs: {
                      create: _programs.defaultPrograms
                    }
                  },
                  include: {
                    programs: {
                      include: {
                        workouts: {
                          include: {
                            workoutSets: true
                          }
                        }
                      }
                    }
                  }
                });

              case 13:
                _newUser = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: _newUser.id
                });

              case 15:
                _context.next = 17;
                return _prisma["default"].user.create({
                  data: {
                    username: username,
                    email: email,
                    password: encryptedPassword,
                    exercises: {
                      create: _exercises.defaultExercises
                    },
                    likes: {
                      create: [{
                        program: {
                          connect: {
                            title: "StrongLifts 5x5"
                          }
                        }
                      }, {
                        program: {
                          connect: {
                            title: "Dips' Push-Pull-Legs"
                          }
                        }
                      }]
                    }
                  }
                });

              case 17:
                newUser = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  id: newUser.id
                });

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  ok: false,
                  error: "Cannot create account."
                });

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 21]]);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }
};
exports["default"] = _default;