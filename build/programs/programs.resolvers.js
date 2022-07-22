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
  Program: {
    // Resolvers for relations
    user: function user(_ref) {
      var userId = _ref.userId;
      return _prisma["default"].user.findUnique({
        where: {
          id: userId
        }
      });
    },
    hashtags: function hashtags(_ref2) {
      var id = _ref2.id;
      return _prisma["default"].hashtag.findMany({
        where: {
          programs: {
            some: {
              id: id
            }
          }
        }
      });
    },
    likes: function likes(_ref3) {
      var id = _ref3.id;
      return _prisma["default"].like.count({
        where: {
          programId: id
        }
      });
    },
    workouts: function workouts(_ref4) {
      var id = _ref4.id;
      return _prisma["default"].program.findUnique({
        where: {
          id: id
        }
      }).workouts({
        orderBy: {
          workoutIndex: "asc"
        }
      });
    },
    // Relations for computed fields
    isMine: function isMine(_ref5, _, _ref6) {
      var userId = _ref5.userId;
      var loggedInUser = _ref6.loggedInUser;

      if (!loggedInUser) {
        return false;
      }

      return userId === loggedInUser.id;
    },
    isLiked: function () {
      var _isLiked = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref7, _, _ref8) {
        var id, loggedInUser, like;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref7.id;
                loggedInUser = _ref8.loggedInUser;

                if (loggedInUser) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", false);

              case 4:
                _context.next = 6;
                return _prisma["default"].like.findUnique({
                  where: {
                    programId_userId: {
                      programId: id,
                      userId: loggedInUser.id
                    }
                  },
                  select: {
                    id: true
                  }
                });

              case 6:
                like = _context.sent;

                if (!like) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", true);

              case 9:
                return _context.abrupt("return", false);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isLiked(_x, _x2, _x3) {
        return _isLiked.apply(this, arguments);
      }

      return isLiked;
    }(),
    likeCount: function likeCount(_ref9) {
      var id = _ref9.id;
      return _prisma["default"].like.count({
        where: {
          programId: id
        }
      });
    }
  },
  Workout: {
    // Resolvers for relations
    workoutSets: function workoutSets(_ref10) {
      var id = _ref10.id;
      return _prisma["default"].workout.findUnique({
        where: {
          id: id
        }
      }).workoutSets({
        orderBy: {
          workoutSetIndex: "asc"
        }
      });
    }
  },
  Hashtag: {
    // Resolvers for relations
    programs: function programs(_ref11) {
      var id = _ref11.id;
      return _prisma["default"].hashtag.findUnique({
        where: {
          id: id
        }
      }).programs();
    } // // Not working
    // programCount: ({ id }) => {
    //   prisma.program.count({
    //     where: {
    //       hashtags: {
    //         some: {
    //           id,
    //         },
    //       },
    //     },
    //   });
    // },

  },
  Like: {
    // Resolvers for relations
    program: function program(_ref12) {
      var id = _ref12.id;
      return _prisma["default"].like.findUnique({
        where: {
          id: id
        }
      }).program();
    }
  }
};
exports["default"] = _default;