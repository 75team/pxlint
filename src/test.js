import pxlint from './pixel_lint.js'
const config = {
  host: '', // 服务器host 可为空
  port: '', // 端口号 可为空
  tests: [
    {
      viewport: [800, 600], // 视口大小
      design:
        'http://p4.qhimg.com/t01b5c6b67f6d480e1b.png', // 设计稿的路径
    },
    {
      viewport: [1920, 1080],
      design:
        'http://p4.qhimg.com/t01b5c6b67f6d480e1b.png',
    },
  ],
  path: './test', // 最终diff图存储的路径
  need_score: true, // 是否需要为匹配程度打分，默认为true
  need_diff_image: true, // 是否需要diff图， 默认为true
}

pxlint('http://study.qiyun.360.cn', config)
  .then((result) => {
    console.log(result)
  })
  .catch((e) => {
    console.log(e)
  })
