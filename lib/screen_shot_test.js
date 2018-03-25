'use strict';

var _pixel_lint = require('./pixel_lint.js');

var _pixel_lint2 = _interopRequireDefault(_pixel_lint);

var _color_log = require('./color_log.js');

var _color_log2 = _interopRequireDefault(_color_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = [{
  viewport: [1920, 1080],
  path: '../test'

}, {
  viewport: [375, 667],
  path: '../test'
}];

(0, _pixel_lint2.default)('http://ppt.baomitu.com', configs);