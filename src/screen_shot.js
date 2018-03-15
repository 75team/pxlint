import puppeteer from 'puppeteer';
import report from './color_log.js'
/**
 * 
 * @param {待截图的URL} url 
 * @param {配置信息: [{viewport（尺寸）, path（储存截图地址）}]} configs
 */
export default async (url, configs) => {
  // validate params

  const browser = await puppeteer.launch()

  await Promise.all(configs.map(async(config, index) => {
    const [width, height] = config.viewport
    const page = await browser.newPage()
    page.setViewport({width, height})
    await page.goto(url)
    await page.screenshot({
      path: `${config.path}/${width}x${height}.screenshot.png`,
      fullPage: true,
    })
    report.success(`截取页面 ${width}x${height}.screenshot.png`)
    await page.close()
  }))
  await browser.close()
}
