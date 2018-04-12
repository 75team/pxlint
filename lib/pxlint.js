'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _hammingDistance = require('hamming-distance');

var _hammingDistance2 = _interopRequireDefault(_hammingDistance);

var _imghash = require('imghash');

var _imghash2 = _interopRequireDefault(_imghash);

var _blueimpMd = require('blueimp-md5');

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pngjs = require('pngjs');

var _pngjs2 = _interopRequireDefault(_pngjs);

var _pixelmatch = require('pixelmatch');

var _pixelmatch2 = _interopRequireDefault(_pixelmatch);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _screenshot = require('./screenshot.js');

var _screenshot2 = _interopRequireDefault(_screenshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = require('child_process').exec;

var Pixlint = function () {
  function Pixlint(config) {
    (0, _classCallCheck3.default)(this, Pixlint);

    this.defaultConfig = {
      protocol: 'http', // 协议
      host: '', // 主机名
      port: '', // 端口号
      output_diff_image: true, // 是否输出差异图片
      output_score: true, // 是否输出分数
      temp_output_dir: _path2.default.resolve(__dirname, '../temp_output') // 临时文件输出目录
    };
    if (config === undefined) {
      this.fileConfig = this.searchFileConfig();
      this.config = (0, _assign2.default)({}, this.defaultConfig, this.fileConfig);
    } else {
      this.config = (0, _assign2.default)({}, this.defaultConfig, config);
    }
    this.validateConfig();
  }
  /**
   * output diffImage and score the similarity
   * @param {*} img_online 线上图片path
   * @param {*} img_design 设计稿path
   * @param {*} lintItem lint项
   * @param {*} temp_output_dir 临时文件存放目录
   * @param {*} output_diff_image 是否输出diff图
   * @param {*} output_diff_image 临时md5值
   */


  (0, _createClass3.default)(Pixlint, [{
    key: 'diffAndScoreImage',
    value: function diffAndScoreImage(img_online, img_design, lintItem, temp_output_dir, output_diff_image, tempHashPath) {
      return new _promise2.default(function (res, rej) {
        var ret = {};
        var PNG = _pngjs2.default.PNG;
        var img_online_png = _fs2.default.createReadStream(img_online).pipe(new PNG()).on('parsed', doneReading);
        var img_design_png = _fs2.default.createReadStream(img_design).pipe(new PNG()).on('parsed', doneReading);
        var filesRead = 0;
        function doneReading() {
          if (++filesRead < 2) return;
          var diff = new PNG({
            width: img_online_png.width,
            height: img_online_png.height
          });
          var result = (0, _pixelmatch2.default)(img_online_png.data, img_design_png.data, diff.data, img_online_png.width, img_online_png.height, { threshold: 0.1 });
          ret.score = 1 - result / (img_online_png.width * img_online_png.height);
          if (output_diff_image) {
            var diffPath = temp_output_dir + '/' + tempHashPath + '_' + lintItem.viewport[0] + 'x' + lintItem.viewport[1] + '.diff.png';
            diff.pack().pipe(_fs2.default.createWriteStream(diffPath));
            ret.diff = diffPath;
          }
          res(ret);
        }
      });
    }
    /**
     * 判断是否为图片链接
     * @param {*} imgPath
     */

  }, {
    key: 'isUrl',
    value: function isUrl(imgPath) {
      // 只支持png
      var reg = /^http[s]?:\/\/[\d|\w|.|/]+.png$/g;
      return reg.test(imgPath);
    }
    /**
     * use dhash and hamming distance to judge if one image is similar to another
     * @param {*} img_online
     * @param {*} img_design
     */

  }, {
    key: 'checkSimilar',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(img_online, img_design) {
        var img_online_hash, img_design_hash, results, distance;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                img_online_hash = _imghash2.default.hash(img_online, 8, 'binary');
                img_design_hash = _imghash2.default.hash(img_design, 8, 'binary');
                _context.next = 4;
                return _promise2.default.all([img_online_hash, img_design_hash]);

              case 4:
                results = _context.sent;
                distance = (0, _hammingDistance2.default)(results[0], results[1]);

                if (!(distance <= 5)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', true);

              case 8:
                return _context.abrupt('return', false);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkSimilar(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return checkSimilar;
    }()
    /**
     * 执行pxlint
     * @param {Array} lintList 需要lint的内容
     */

  }, {
    key: 'run',
    value: function run(lintList) {
      var _this = this;

      if (!lintList || lintList.length === 0) {
        throw new Error('lintList is empty');
      }

      // 根据lintList、当前时间、随机值生成hash值，设计稿、截屏文件存入该文件夹下，lint完便于清除
      var tempHashPath = (0, _blueimpMd2.default)((0, _stringify2.default)(lintList) + Date.now() + Math.random());
      var subTempDir = this.config.temp_output_dir + '/' + tempHashPath;
      // 判断 temp_output_dir目录下tempHashPath是否存在，不存在则创建
      try {
        _fs2.default.accessSync(subTempDir);
      } catch (e) {
        _fs2.default.mkdirSync(subTempDir);
      }

      var origin = this.config.protocol + '://' + this.config.host;
      if (this.config.port) {
        origin += ':' + this.config.port;
      }
      return _promise2.default.all(lintList.map(function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(lintItem) {
          var result, lintItemUrl, imgOnline, imgDesign, imgDesignPath, _ref3, _ref4, _ref4$, score, diff, similar;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  result = (0, _assign2.default)({}, lintItem);
                  lintItemUrl = '' + origin + lintItem.path;
                  // lintItemUrl 在线截图

                  _context2.next = 4;
                  return (0, _screenshot2.default)(lintItemUrl, lintItem.viewport, subTempDir);

                case 4:
                  imgOnline = _context2.sent;
                  imgDesign = '';
                  // 如果设计稿为url，则下载到本地

                  if (!_this.isUrl(lintItem.design)) {
                    _context2.next = 13;
                    break;
                  }

                  imgDesignPath = _this.config.temp_output_dir + '/' + tempHashPath + '/' + lintItem.viewport[0] + 'x' + lintItem.viewport[1] + '.design.png';
                  _context2.next = 10;
                  return new _promise2.default(function (resolve, reject) {
                    (0, _request2.default)(lintItem.design).pipe(_fs2.default.createWriteStream(imgDesignPath)).on('close', function () {
                      resolve();
                    });
                  });

                case 10:
                  imgDesign = imgDesignPath;
                  _context2.next = 14;
                  break;

                case 13:
                  imgDesign = lintItem.design;

                case 14:
                  _context2.next = 16;
                  return _promise2.default.all([_this.diffAndScoreImage(imgOnline, imgDesign, lintItem, _this.config.temp_output_dir, _this.config.output_diff_image, tempHashPath), _this.checkSimilar(imgOnline, imgDesign)]);

                case 16:
                  _ref3 = _context2.sent;
                  _ref4 = (0, _slicedToArray3.default)(_ref3, 2);
                  _ref4$ = _ref4[0];
                  score = _ref4$.score;
                  diff = _ref4$.diff;
                  similar = _ref4[1];

                  if (_this.config.output_score) {
                    result.score = score;
                  }
                  if (_this.config.output_diff_image) {
                    result.diff = diff;
                  }
                  result.similar = similar;
                  return _context2.abrupt('return', result);

                case 26:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }())).then(function (rets) {
        // 清空临时 subTempDir
        exec('rm -rf ' + subTempDir, function (err, out) {
          if (err) {
            throw err;
          }
        });
        return rets;
      });
    }
    /**
     * 从当前目录开始 查找.pxlintrc.js文件
     */

  }, {
    key: 'searchFileConfig',
    value: function searchFileConfig() {
      var dir = __dirname;
      // Mac/Linux only
      while (dir !== '/') {
        try {
          return require(_path2.default.join(dir, '.pxlintrc.js'));
        } catch (e) {
          dir = _path2.default.join(dir, '../');
        }
      }
      throw new Error('Config not found!');
    }

    /**
     * 检测配置是否合格
     */

  }, {
    key: 'validateConfig',
    value: function validateConfig() {
      if (!this.config.protocol) {
        throw new Error('config error: protocol can not be empty');
      }
      if (!this.config.host) {
        throw new Error('config error: host can not be empty');
      }
      // 判断 temp_output_dir目录是否存在，不存在则创建
      try {
        _fs2.default.accessSync(this.config.temp_output_dir);
      } catch (e) {
        _fs2.default.mkdirSync(this.config.temp_output_dir);
      }
    }
  }]);
  return Pixlint;
}();

exports.default = Pixlint;
module.exports = exports['default'];