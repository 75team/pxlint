import pxlint from './pixel_lint.js'
import report from './color_log.js'


const configs = [{
  viewport: [1920, 1080],
  path: '../test',

}, {
  viewport: [375, 667],
  path: '../test'
}]

pxlint('http://ppt.baomitu.com', configs)
