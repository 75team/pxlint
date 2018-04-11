'use strict';

var _pxlint = require('./pxlint.js');

var _pxlint2 = _interopRequireDefault(_pxlint);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = {
  host: '', // 服务器host 可为空
  port: '', // 端口号 可为空
  tests: [{
    viewport: [1920, 1080],
    design: _path2.default.resolve(__dirname, '../test/1920x1080.baidu.png')
  }],
  path: _path2.default.resolve(__dirname, '../test') // 最终diff图存储的路径
};

(0, _pxlint2.default)('://baidu.com', configs).then(function (result) {
  console.log(111, result);
});