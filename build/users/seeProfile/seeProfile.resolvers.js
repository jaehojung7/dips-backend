"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _default = {
  Query: {
    seeProfile: function seeProfile(_, _ref, _ref2) {
      var username = _ref.username;
      var loggedInUser = _ref2.loggedInUser;
      return _prisma["default"].user.findUnique({
        where: {
          username: username
        },
        // Include programs that belong to the user or are public
        include: {
          programs: {
            where: {
              OR: [{
                user: {
                  id: loggedInUser != null ? loggedInUser.id : undefined
                }
              }, {
                isPublic: false
              }]
            }
          }
        }
      });
    }
  }
};
exports["default"] = _default;