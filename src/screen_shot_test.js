import pxlint from './pixel_lint.js'
import report from './color_log.js'


const tests = [{
  viewport: [1920, 1080],
  path: '/Users/betsey/Documents/qiwoo/openSource/pxlint/test',
  design: '/Users/betsey/Documents/qiwoo/openSource/pxlint/test/1920x1080.baidu.png'
}]

pxlint('https://baidu.com', tests).then((result) => {
})
