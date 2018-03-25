import fs from 'fs'
import pngjs from 'pngjs'
import pixelmatch from 'pixelmatch'
import imghash from 'imghash'
import hamming from 'hamming-distance'

import report from './color_log.js'
import screenshot from './screen_shot.js'

function readFile(img) {
  return new Promise((res, rej) => {
    fs.readFile(img, (err, data) => {
      if (err) rej(err)
      res(data)
    })
  })
}

async function diff (img_online, img_design) {
  const img_online_file = await readFile(img_online)
  const img_design_file = await readFile(img_design)
  console.log(img_design_file)

  // const img_online_png = await new pngjs.PNG().parse(img_online_file)
  // const img_design_png = await new pngjs.PNG().parse(img_design_file)
  // console.log(img_online_png)
}


export default async (url, configs) => {
   Promise.all(configs.map(async(config) => {
    const img_online = await screenshot(url, config.viewport, config.path)
    await diff(img_online, img_design)
   }))
}


