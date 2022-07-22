"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prisma = _interopRequireDefault(require("../prisma"));

var _default = {
  Exercise: {
    // Resolvers for relations
    user: function user(_ref) {
      var userId = _ref.userId;
      return _prisma["default"].user.findUnique({
        where: {
          id: userId
        }
      });
    }
  }
};
exports["default"] = _default;