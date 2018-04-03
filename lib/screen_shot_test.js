'use strict';

var _pixel_lint = require('./pixel_lint.js');

var _pixel_lint2 = _interopRequireDefault(_pixel_lint);

var _color_log = require('./color_log.js');

var _color_log2 = _interopRequireDefault(_color_log);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = {
  host: "", // 服务器host 可为空
  port: "", // 端口号 可为空
  tests: [{
    viewport: [1920, 1080],
    design: _path2.default.resolve(__dirname, '../test/1920x1080.baidu.png')
  }],
  path: _path2.default.resolve(__dirname, '../test') // 最终diff图存储的路径
};

(0, _pixel_lint2.default)('https://baidu.com', configs).then(function (result) {
  console.log(result);
});