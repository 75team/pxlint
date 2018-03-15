'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url, configs) {
    var browser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _puppeteer2.default.launch();

          case 2:
            browser = _context2.sent;
            _context2.next = 5;
            return _promise2.default.all(configs.map(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config, index) {
                var _config$viewport, width, height, page;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _config$viewport = (0, _slicedToArray3.default)(config.viewport, 2), width = _config$viewport[0], height = _config$viewport[1];
                        _context.next = 3;
                        return browser.newPage();

                      case 3:
                        page = _context.sent;

                        page.setViewport({ width: width, height: height });
                        _context.next = 7;
                        return page.goto(url);

                      case 7:
                        _context.next = 9;
                        return page.screenshot({
                          path: config.path + '/' + width + 'x' + height + '.screenshot.png',
                          fullPage: true
                        });

                      case 9:
                        _color_log2.default.success('\u622A\u53D6\u9875\u9762 ' + width + 'x' + height + '.screenshot.png');
                        _context.next = 12;
                        return page.close();

                      case 12:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 5:
            _context2.next = 7;
            return browser.close();

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();