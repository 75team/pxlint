'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

/**
 * use dhash and hamming distance to judge if one image is similar to another
 * @param {*} img_online 
 * @param {*} img_design 
 */
var isImageSimilar = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(img_online, img_design) {
    var img_online_hash, img_design_hash, results, distance;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            img_online_hash = _imghash2.default.hash(img_online, 8, 'binary');
            img_design_hash = _imghash2.default.hash(img_design, 8, 'binary');
            _context.next = 4;
            return _promise2.default.all([img_online_hash, img_design_hash]);

          case 4:
            results = _context.sent;
            distance = (0, _hammingDistance2.default)(results[0], results[1]);

            if (!(distance <= 5)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', true);

          case 8:
            return _context.abrupt('return', false);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isImageSimilar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pngjs = require('pngjs');

var _pngjs2 = _interopRequireDefault(_pngjs);

var _pixelmatch = require('pixelmatch');

var _pixelmatch2 = _interopRequireDefault(_pixelmatch);

var _imghash = require('imghash');

var _imghash2 = _interopRequireDefault(_imghash);

var _hammingDistance = require('hamming-distance');

var _hammingDistance2 = _interopRequireDefault(_hammingDistance);

var _screen = require('./screen.js');

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfigs = {
  need_diff_image: true,
  need_score: true
};

function readFile(img) {
  return new _promise2.default(function (res, rej) {
    _fs2.default.readFile(img, function (err, data) {
      if (err) rej(err);
      res(data);
    });
  });
}

/**
 * output diffImage and score the similarity
 * @param {*} img_online 
 * @param {*} img_design 
 * @param {*} test 
 */
function getDiffImage(img_online, img_design, test, path, need_diff_image) {
  return new _promise2.default(function (res, rej) {
    var PNG = _pngjs2.default.PNG;
    var img_online_png = _fs2.default.createReadStream(img_online).pipe(new PNG()).on('parsed', doneReading);
    var img_design_png = _fs2.default.createReadStream(img_design).pipe(new PNG()).on('parsed', doneReading);
    var filesRead = 0;
    function doneReading() {
      if (++filesRead < 2) return;
      var diff = new PNG({ width: img_online_png.width, height: img_online_png.height });
      var result = (0, _pixelmatch2.default)(img_online_png.data, img_design_png.data, diff.data, img_online_png.width, img_online_png.height, { threshold: 0.5 });
      if (need_diff_image) {
        diff.pack().pipe(_fs2.default.createWriteStream(path + '/' + test.viewport[0] + 'x' + test.viewport[1] + '.diff.png'));
      }
      res(result / (img_online_png.width * img_online_png.height));
    }
  });
}

function findConfig() {
  var dir = __dirname;
  // Mac/Linux only
  while (dir !== '/') {
    try {
      return require(_path2.default.join(dir, '.pxlintrc.js'));
    } catch (e) {
      dir = _path2.default.join(dir, '../');
    }
  }
  throw new Error('no config!');
}

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url, configs) {
    var opts, origin;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            opts = void 0;

            if (configs === undefined) {
              opts = (0, _assign2.default)({}, defaultConfigs, findConfig());
            } else {
              opts = (0, _assign2.default)({}, defaultConfigs, configs);
            }

            origin = '';

            if (opts.host) {
              origin += '://' + opts.host;
            }
            if (opts.port) {
              origin += ':' + opts.port;
            }

            if (!(opts.tests.length === 0)) {
              _context3.next = 7;
              break;
            }

            throw new Error('empty test Info');

          case 7:
            return _context3.abrupt('return', _promise2.default.all(opts.tests.map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(test) {
                var result, img_online, img_design, score;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        result = {};
                        _context2.next = 3;
                        return _screen2.default.screenshot(url, test.viewport, opts.path);

                      case 3:
                        img_online = _context2.sent;
                        img_design = test.design;
                        _context2.next = 7;
                        return getDiffImage(img_online, img_design, test, opts.path, opts.need_diff_image);

                      case 7:
                        score = _context2.sent;
                        _context2.next = 10;
                        return isImageSimilar(img_online, img_design);

                      case 10:
                        result.isSimilar = _context2.sent;

                        if (opts.need_score) {
                          result.score = score;
                        }
                        return _context2.abrupt('return', result);

                      case 13:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }())));

          case 8:
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