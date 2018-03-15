'use strict';

var _screen_shot = require('./screen_shot.js');

var _screen_shot2 = _interopRequireDefault(_screen_shot);

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

(0, _screen_shot2.default)('http://ppt.baomitu.com', configs);