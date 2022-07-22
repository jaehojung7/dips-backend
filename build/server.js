"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./schema");

var _users = require("./users/users.utils");

// Always import and execute dotenv in the very beginning to use the virtualenv
require("dotenv").config();

var PORT = process.env.PORT; // Apollo server

var apollo = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _schema.resolvers,
  // Get user token from the headers and retrieve a logged-in user with the token
  // Add the logged-in user information to context, which is carried by every executed resolver on the server
  context: function () {
    var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var req;
      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = _ref.req;
              _context2.next = 3;
              return (0, _users.getUser)(req.headers.token);

            case 3:
              _context2.t0 = _context2.sent;
              return _context2.abrupt("return", {
                loggedInUser: _context2.t0
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }()
}); // Express

var app = (0, _express["default"])(); // Connect Apollo server and Express

apollo.applyMiddleware({
  app: app
});
app.listen({
  port: PORT
}, function () {
  console.log("Server is running on http://localhost:".concat(PORT, "/"));
});