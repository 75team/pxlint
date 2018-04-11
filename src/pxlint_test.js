import PxLint from './pxlint.js'
const config = {
  host: 'dc.360.cn', // 服务器host 可为空
  port: '', // 端口号 可为空
}

const pxlint = new PxLint(config)


pxlint.run([
  {
    path: '/',
    viewport: [800, 600], // 视口大小
    design: 'http://p4.qhimg.com/t01b5c6b67f6d480e1b.png', // 设计稿的路径
  },
  {
    path: '/',
    viewport: [1920, 1080],
    design: 'http://p4.qhimg.com/t01b5c6b67f6d480e1b.png',
  },
]).then((data) => {
  console.log(data)
}).catch((e) => {
  console.log('error', e)
})
