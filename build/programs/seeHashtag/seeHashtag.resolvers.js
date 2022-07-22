"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

// This query cannot filter out private programs
// searchPrograms should be used instead for selective search
var _default = {
  Query: {
    seeHashtag: function seeHashtag(_, _ref) {
      var hashtag = _ref.hashtag;
      return _prisma["default"].hashtag.findUnique({
        where: {
          hashtag: hashtag
        }
      });
    }
  }
};
exports["default"] = _default;