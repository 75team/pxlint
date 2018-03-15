import screenshot from './screen_shot.js'
import report from './color_log.js'


const configs = [{
  viewport: [1920, 1080],
  path: '../test'
}, {
  viewport: [375, 667],
  path: '../test'
}]

screenshot('http://ppt.baomitu.com', configs)
