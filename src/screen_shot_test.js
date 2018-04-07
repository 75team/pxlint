import pxlint from './pixel_lint.js'
import path from 'path'


const configs = {
  host: "", // 服务器host 可为空
  port: "", // 端口号 可为空
  tests: [
    {
      viewport: [1920, 1080],
      design: path.resolve(__dirname, '../test/1920x1080.baidu.png'),
    }
  ],
  path: path.resolve(__dirname, '../test'), // 最终diff图存储的路径
}

pxlint('https://baidu.com', configs).then((result) => {
  console.log(result)
})
