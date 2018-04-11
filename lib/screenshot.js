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
            if (viewport instanceof Array && viewport.length === 2 && typeof viewport[0] === 'number' && typeof viewport[1] === 'number') {
              _context.next = 2;
              break;
            }

            throw new Error('[format] viewport need [number, number]');

          case 2:
            _context.next = 4;
            return _puppeteer2.default.launch();

          case 4:
            browser = _context.sent;
            _viewport = (0, _slicedToArray3.default)(viewport, 2), width = _viewport[0], height = _viewport[1];
            _context.next = 8;
            return browser.newPage();

          case 8:
            page = _context.sent;

            page.setViewport({ width: width, height: height });
            _context.next = 12;
            return page.goto(url);

          case 12:
            _context.next = 14;
            return page.screenshot({
              path: path + '/' + width + 'x' + height + '.screenshot.png',
              fullPage: true
            });

          case 14:
            _context.next = 16;
            return page.close();

          case 16:
            _context.next = 18;
            return browser.close();

          case 18:
            return _context.abrupt('return', path + '/' + width + 'x' + height + '.screenshot.png');

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function screenshot(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return screenshot;
}();

module.exports = exports['default'];