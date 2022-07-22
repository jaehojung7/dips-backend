"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToS3 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

_awsSdk["default"].config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
}); // In case file upload does not work due to the version of GraphQLUpload
// (Warning: [DEP0135] DeprecationWarning: ReadStream.prototype.open() is deprecated)
// Go to package.json, set the version of "resolutions": {"fs-capacitor": "3.0.0"}
// (Use Apollo Server 2 if this does not work with Apollo Server 3)
// Make sure the AWS S3 bucket is "ACL-enabled"
// Run npm install


var uploadToS3 = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, userId, folderName) {
    var _yield$file, filename, createReadStream, readStream, objectName, _yield$AWS$S3$upload$, Location;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return file;

          case 2:
            _yield$file = _context.sent;
            filename = _yield$file.filename;
            createReadStream = _yield$file.createReadStream;
            readStream = createReadStream();
            objectName = "".concat(folderName, "/").concat(userId, "-").concat(Date.now(), "-").concat(filename);
            _context.next = 9;
            return new _awsSdk["default"].S3().upload({
              Bucket: "dips-uploads",
              Key: objectName,
              ACL: "public-read",
              Body: readStream
            }).promise();

          case 9:
            _yield$AWS$S3$upload$ = _context.sent;
            Location = _yield$AWS$S3$upload$.Location;
            return _context.abrupt("return", Location);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadToS3(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadToS3 = uploadToS3;