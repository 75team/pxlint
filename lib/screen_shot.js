'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _color_log = require('./color_log.js');

var _color_log2 = _interopRequireDefault(_color_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {待截图的URL} url 
 * @param {配置信息: [{viewport（尺寸）, path（储存截图地址）}]} configs
 */
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, viewport, path) {
    var browser, _viewport, width, height, page;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer2.default.launch();

          case 2:
            browser = _context.sent;
            _viewport = (0, _slicedToArray3.default)(viewport, 2), width = _viewport[0], height = _viewport[1];
            _context.next = 6;
            return browser.newPage();

          case 6:
            page = _context.sent;

            page.setViewport({ width: width, height: height });
            _context.next = 10;
            return page.goto(url);

          case 10:
            _context.next = 12;
            return page.screenshot({
              path: path + '/' + width + 'x' + height + '.screenshot.png',
              fullPage: true
            });

          case 12:
            _color_log2.default.success('\u622A\u53D6\u9875\u9762 ' + width + 'x' + height + '.screenshot.png');
            _context.next = 15;
            return page.close();

          case 15:
            _context.next = 17;
            return browser.close();

          case 17:
            return _context.abrupt('return', path + '/' + width + 'x' + height + '.screenshot.png');

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();