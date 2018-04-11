import fs from 'fs'
import hamming from 'hamming-distance'
import imghash from 'imghash'
import md5 from 'blueimp-md5'
import path from 'path'
import pngjs from 'pngjs'
import pixelmatch from 'pixelmatch'
import request from 'request'
import screenshot from './screenshot.js'

const exec = require('child_process').exec

export default class Pixlint {
  constructor(config) {
    this.defaultConfig = {
      protocol: 'http', // 协议
      host: '', // 主机名
      port: '', // 端口号
      output_diff_image: true, // 是否输出差异图片
      output_score: true, // 是否输出分数
      temp_output_dir: path.resolve(__dirname, '../temp_output'), // 临时文件输出目录
    }
    if(config === undefined) {
      this.fileConfig = this.searchFileConfig()
      this.config = Object.assign({}, this.defaultConfig, this.fileConfig)
    } else {
      this.config = Object.assign({}, this.defaultConfig, config)
    }
    this.validateConfig()
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
  diffAndScoreImage(
    img_online,
    img_design,
    lintItem,
    temp_output_dir,
    output_diff_image,
    tempHashPath
  ) {
    return new Promise((res, rej) => {
      const ret = {}
      const PNG = pngjs.PNG
      const img_online_png = fs
        .createReadStream(img_online)
        .pipe(new PNG())
        .on('parsed', doneReading)
      const img_design_png = fs
        .createReadStream(img_design)
        .pipe(new PNG())
        .on('parsed', doneReading)
      let filesRead = 0
      function doneReading() {
        if(++filesRead < 2) return
        const diff = new PNG({
          width: img_online_png.width,
          height: img_online_png.height,
        })
        const result = pixelmatch(
          img_online_png.data,
          img_design_png.data,
          diff.data,
          img_online_png.width,
          img_online_png.height,
          {threshold: 0.5}
        )
        if(output_diff_image) {
          const diffPath = `${temp_output_dir}/${tempHashPath}_${lintItem.viewport[0]}x${
            lintItem.viewport[1]
          }.diff.png`
          diff
            .pack()
            .pipe(fs.createWriteStream(diffPath))
          ret.diff = diffPath
        }
        ret.score = result / (img_online_png.width * img_online_png.height)
        res(ret)
      }
    })
  }
  /**
   * 判断是否为图片链接
   * @param {*} imgPath
   */
  isUrl(imgPath) {
    // 只支持png
    const reg = /^http[s]?:\/\/[\d|\w|.|/]+.png$/g
    return reg.test(imgPath)
  }
  /**
   * use dhash and hamming distance to judge if one image is similar to another
   * @param {*} img_online
   * @param {*} img_design
   */
  async checkSimilar(img_online, img_design) {
    const img_online_hash = imghash.hash(img_online, 8, 'binary')
    const img_design_hash = imghash.hash(img_design, 8, 'binary')
    const results = await Promise.all([img_online_hash, img_design_hash])
    const distance = hamming(results[0], results[1])
    if(distance <= 5) {
      return true
    }
    return false
  }
  /**
   * 执行pxlint
   * @param {Array} lintList 需要lint的内容
   */
  run(lintList) {
    if(!lintList || lintList.length === 0) {
      throw new Error('lintList is empty')
    }

    // 根据lintList、当前时间、随机值生成hash值，设计稿、截屏文件存入该文件夹下，lint完便于清除
    const tempHashPath = md5(JSON.stringify(lintList) + Date.now() + Math.random())
    const subTempDir = `${this.config.temp_output_dir}/${tempHashPath}`
    // 判断 temp_output_dir目录下tempHashPath是否存在，不存在则创建
    try {
      fs.accessSync(subTempDir)
    } catch (e) {
      fs.mkdirSync(subTempDir)
    }

    let origin = `${this.config.protocol}://${this.config.host}`
    if(this.config.port) {
      origin += `:${this.config.port}`
    }
    return Promise.all(lintList.map(async (lintItem) => {
      const result = Object.assign({}, lintItem)
      const lintItemUrl = `${origin}${lintItem.path}`
      // lintItemUrl 在线截图
      const imgOnline = await screenshot(
        lintItemUrl,
        lintItem.viewport,
        subTempDir
      )
      let imgDesign = ''
      // 如果设计稿为url，则下载到本地
      if(this.isUrl(lintItem.design)) {
        const imgDesignPath = `${
          this.config.temp_output_dir
        }/${tempHashPath}/${lintItem.viewport[0]}x${
          lintItem.viewport[1]
        }.design.png`
        await new Promise((resolve, reject) => {
          request(lintItem.design)
            .pipe(fs.createWriteStream(imgDesignPath))
            .on('close', () => {
              resolve()
            })
        })
        imgDesign = imgDesignPath
      } else {
        imgDesign = lintItem.design
      }
      const [{score, diff}, similar] = await Promise.all([
        this.diffAndScoreImage(
          imgOnline,
          imgDesign,
          lintItem,
          this.config.temp_output_dir,
          this.config.output_diff_image,
          tempHashPath
        ),
        this.checkSimilar(imgOnline, imgDesign),
      ])
      if(this.config.output_score) {
        result.score = score
      }
      if(this.config.output_diff_image) {
        result.diff = diff
      }
      result.similar = similar
      return result
    })).then((rets) => {
      // 清空临时 subTempDir
      exec(`rm -rf ${subTempDir}`, (err, out) => {
        if(err) {
          throw err
        }
      })
      return rets
    })
  }
  /**
   * 从当前目录开始 查找.pxlintrc.js文件
   */
  searchFileConfig() {
    let dir = __dirname
    // Mac/Linux only
    while(dir !== '/') {
      try {
        return require(path.join(dir, '.pxlintrc.js'))
      } catch (e) {
        dir = path.join(dir, '../')
      }
    }
    throw new Error('Config not found!')
  }

  /**
   * 检测配置是否合格
   */
  validateConfig() {
    if(!this.config.protocol) {
      throw new Error('config error: protocol can not be empty')
    }
    if(!this.config.host) {
      throw new Error('config error: host can not be empty')
    }
    // 判断 temp_output_dir目录是否存在，不存在则创建
    try {
      fs.accessSync(this.config.temp_output_dir)
    } catch (e) {
      fs.mkdirSync(this.config.temp_output_dir)
    }
  }
}
