import fs from 'fs'
import pngjs from 'pngjs'
import pixelmatch from 'pixelmatch'
import imghash from 'imghash'
import hamming from 'hamming-distance'

import report from './color_log.js'
import screen from './screen.js'


const defaultConfigs = {
  need_diff_image: true,
  need_score: true,
}

function readFile(img) {
  return new Promise((res, rej) => {
    fs.readFile(img, (err, data) => {
      if (err) rej(err)
      res(data)
    })
  })
}

/**
 * output diffImage and score the similarity
 * @param {*} img_online 
 * @param {*} img_design 
 * @param {*} test 
 */
function getDiffImage (img_online, img_design, test, path, need_diff_image) {
  return new Promise((res, rej) => {
    const PNG = pngjs.PNG
    const img_online_png = fs.createReadStream(img_online).pipe(new PNG()).on('parsed', doneReading)
    const img_design_png = fs.createReadStream(img_design).pipe(new PNG()).on('parsed', doneReading)
    let filesRead = 0
    function doneReading () {
      if (++filesRead < 2) return;
      var diff = new PNG({width: img_online_png.width, height: img_online_png.height});
      const result = pixelmatch(img_online_png.data, img_design_png.data, diff.data, img_online_png.width, img_online_png.height, {threshold: 0.5});
      if(need_diff_image) {
        diff.pack().pipe(fs.createWriteStream(`${path}/${test.viewport[0]}x${test.viewport[1]}.diff.png`))
      }
      res(result / (img_online_png.width * img_online_png.height))
    }
  })

}

/**
 * use dhash and hamming distance to judge if one image is similar to another
 * @param {*} img_online 
 * @param {*} img_design 
 */
async function isImageSimilar(img_online, img_design) {
  const img_online_hash = imghash.hash(img_online, 8, 'binary')
  const img_design_hash = imghash.hash(img_design, 8, 'binary')
  const results = await Promise.all([img_online_hash, img_design_hash])
  const distance = hamming(results[0], results[1])
  if(distance <= 5) {
    return true
  }
  return false
}


export default async (url, configs) => {
  const opts = Object.assign({}, defaultConfigs, configs)
  console.log(opts)
  let origin = ''
  if(opts.host) {
    origin += `://${opts.host}`
  }
  if(opts.port) {
    origin += `:${opts.port}`
  }
  if(opts.tests.length === 0){
    throw new Error('empty test Info')
  }
  return Promise.all(opts.tests.map(async(test) => {
    const result= {}
    const img_online = await screen.screenshot(url, test.viewport, opts.path)
    const img_design = test.design
    const score = await getDiffImage(img_online, img_design, test, opts.path, opts.need_diff_image)
    result.isSimilar = await isImageSimilar(img_online, img_design)
    if(opts.need_score) {
      result.score = score
    }
    return result
  }))
}


