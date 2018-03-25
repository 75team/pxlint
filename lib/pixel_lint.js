'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var diff = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(img_online, img_design) {
    var img_online_file, img_design_file;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readFile(img_online);

          case 2:
            img_online_file = _context.sent;
            _context.next = 5;
            return readFile(img_design);

          case 5:
            img_design_file = _context.sent;

            console.log(img_design_file);

            // const img_online_png = await new pngjs.PNG().parse(img_online_file)
            // const img_design_png = await new pngjs.PNG().parse(img_design_file)
            // console.log(img_online_png)

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function diff(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pngjs = require('pngjs');

var _pngjs2 = _interopRequireDefault(_pngjs);

var _pixelmatch = require('pixelmatch');

var _pixelmatch2 = _interopRequireDefault(_pixelmatch);

var _imghash = require('imghash');

var _imghash2 = _interopRequireDefault(_imghash);

var _hammingDistance = require('hamming-distance');

var _hammingDistance2 = _interopRequireDefault(_hammingDistance);

var _color_log = require('./color_log.js');

var _color_log2 = _interopRequireDefault(_color_log);

var _screen_shot = require('./screen_shot.js');

var _screen_shot2 = _interopRequireDefault(_screen_shot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFile(img) {
  return new _promise2.default(function (res, rej) {
    _fs2.default.readFile(img, function (err, data) {
      if (err) rej(err);
      res(data);
    });
  });
}

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url, configs) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _promise2.default.all(configs.map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(config) {
                var img_online;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _screen_shot2.default)(url, config.viewport, config.path);

                      case 2:
                        img_online = _context2.sent;
                        _context2.next = 5;
                        return diff(img_online, img_design);

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();