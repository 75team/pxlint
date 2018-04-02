'use strict';

var _pixel_lint = require('./pixel_lint.js');

var _pixel_lint2 = _interopRequireDefault(_pixel_lint);

var _color_log = require('./color_log.js');

var _color_log2 = _interopRequireDefault(_color_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tests = [{
  viewport: [1920, 1080],
  path: '/Users/betsey/Documents/qiwoo/openSource/pxlint/test',
  design: '/Users/betsey/Documents/qiwoo/openSource/pxlint/test/1920x1080.baidu.png'
}];

(0, _pixel_lint2.default)('https://baidu.com', tests).then(function (result) {});