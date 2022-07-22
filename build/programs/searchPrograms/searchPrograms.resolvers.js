"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

// If cursor-based pagination should be implemented, check out searchUsers.resolvers.js
// Lazy loading on the client side might be sufficient
var _default = {
  Query: {
    searchPrograms: function searchPrograms(_, _ref, _ref2) {
      var keyword = _ref.keyword;
      var loggedInUser = _ref2.loggedInUser;
      return _prisma["default"].program.findMany({
        where: {
          // Title or description should contain keyword
          OR: [{
            title: {
              contains: keyword,
              mode: "insensitive"
            }
          }, {
            description: {
              contains: keyword,
              mode: "insensitive"
            }
          }],
          // Program should by owned by loggedInUser or public
          AND: {
            OR: [{
              user: {
                id: loggedInUser != null ? loggedInUser.id : undefined
              }
            }, {
              isPublic: true
            }]
          }
        }
      });
    }
  }
};
exports["default"] = _default;