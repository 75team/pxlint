'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  success: function success(message) {
    console.log(('[success] ' + message).green);
  },
  warning: function warning(message) {
    console.log('[warning] ${message}'.yellow);
  },
  error: function error(message) {
    console.log('[error] ${message}'.red);
  },
  info: function info(message) {
    console.log(message);
  }
};