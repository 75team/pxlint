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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

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

  /**
   * 判断是否是静床图片
   * @param {*} imgPath
   */
};function isQhimg(imgPath) {
  var reg = /qhimg.com/g;
  return reg.test(imgPath);
}

/**
 * 根据地址，读取文件流
 * @param {*} imgPath
 */
function readFile(imgPath) {
  var isQhimgUrl = isQhimg(imgPath);
  // 如果是静床文件，使用request请求
  if (isQhimgUrl) {
    return (0, _request2.default)(imgPath);
  }
  return _fs2.default.createReadStream(imgPath);
}

/**
 * output diffImage and score the similarity
 * @param {*} img_online 线上图片path
 * @param {*} img_design 设计稿path
 * @param {*} test
 */
function diffAndScoreImage(img_online, img_design, test, path, need_diff_image) {
  return new _promise2.default(function (res, rej) {
    var PNG = _pngjs2.default.PNG;
    var img_online_png = readFile(img_online).pipe(new PNG()).on('parsed', doneReading);
    var img_design_png = readFile(img_design).pipe(new PNG()).on('parsed', doneReading);
    var filesRead = 0;
    function doneReading() {
      if (++filesRead < 2) return;
      var diff = new PNG({
        width: img_online_png.width,
        height: img_online_png.height
      });
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
      return require(path.join(dir, '.pxlintrc.js'));
    } catch (e) {
      dir = path.join(dir, '../');
    }
  }
  throw new Error('no config!');
}

exports.default = function (url, configs) {
  var opts = void 0;
  if (configs === undefined) {
    opts = (0, _assign2.default)({}, defaultConfigs, findConfig());
  } else {
    opts = (0, _assign2.default)({}, defaultConfigs, configs);
  }

  var origin = '';
  if (opts.host) {
    origin += '://' + opts.host;
  }
  if (opts.port) {
    origin += ':' + opts.port;
  }
  if (opts.tests.length === 0) {
    throw new Error('empty test Info');
  }
  return _promise2.default.all(opts.tests.map(function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(test) {
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
              return diffAndScoreImage(img_online, img_design, test, opts.path, opts.need_diff_image);

            case 7:
              score = _context2.sent;

              // result.isSimilar = await isImageSimilar(img_online, img_design)
              if (opts.need_score) {
                result.score = score;
              }
              return _context2.abrupt('return', result);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }()));
};