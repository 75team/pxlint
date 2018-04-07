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
exports.default = {
  screenshot: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, viewport, path) {
      var browser, _viewport, width, height, page;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (viewport instanceof Array && viewport.length === 2 && typeof viewport[0] === 'number' && typeof viewport[1] === 'number') {
                _context.next = 3;
                break;
              }

              throw new Error('[format] viewport need [number, number]');

            case 3:
              _context.next = 5;
              return _puppeteer2.default.launch();

            case 5:
              browser = _context.sent;
              _viewport = (0, _slicedToArray3.default)(viewport, 2), width = _viewport[0], height = _viewport[1];
              _context.next = 9;
              return browser.newPage();

            case 9:
              page = _context.sent;

              page.setViewport({ width: width, height: height });
              _context.next = 13;
              return page.goto(url);

            case 13:
              _context.next = 15;
              return page.screenshot({
                path: path + '/' + width + 'x' + height + '.screenshot.png',
                fullPage: true
              });

            case 15:
              _context.next = 17;
              return page.close();

            case 17:
              _context.next = 19;
              return browser.close();

            case 19:
              return _context.abrupt('return', path + '/' + width + 'x' + height + '.screenshot.png');

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function screenshot(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return screenshot;
  }()
};