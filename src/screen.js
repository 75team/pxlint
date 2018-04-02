import puppeteer from 'puppeteer';
import report from './color_log.js'
/**
 * 
 * @param {待截图的URL} url 
 * @param {配置信息: [{viewport（尺寸）, path（储存截图地址）}]} configs
 */
export default {
  screenshot: async (url, viewport, path) => {
    // validate params
  
    const browser = await puppeteer.launch()
    const [width, height] = viewport
    const page = await browser.newPage()
    page.setViewport({width, height})
    await page.goto(url)
    await page.screenshot({
      path: `${path}/${width}x${height}.screenshot.png`,
      fullPage: true,
    })
    await page.close()
    await browser.close()
    return `${path}/${width}x${height}.screenshot.png`
  }
} 
