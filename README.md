# pxLint

检查页面效果与设计稿是否相符合

## 配置 .pxlintrc.js

```js
module.exports = {
  protocol: 'http', // 协议，默认http
  host: '', // 主机名，必填
  port: '', // 端口号
  output_diff_image: true, // 是否输出差异图片，默认true
  output_score: true, // 是否输出分数，默认true
  temp_output_dir: path.resolve(__dirname, '../temp_output'), // 默认临时文件输出目录
}
```
## 使用方法

### nodejs 
1. 使用pxlintrc.js进行项目配置时

```javascript
  import PxLint from 'pxlint'
  // 默认会使用 .pxlintrc.js中的配置
  const pxlint = new PxLint()

  // 执行检测
  pxlint.run([
    {
      path: '/', // 测试网页url，不包括origin 
      viewport: [800, 600], // 视口大小
      design: 'design.png', // 设计稿的路径，可为本地路径、url
    },
    // 更多lint内容...
  ]).then((result) => {
    /* 
      result 数据接口
      [
        { 
          path: '/',
          viewport: [ 800, 600 ],
          design: 'design.png',
          score: 0.39450209490402416,
          diff: 'diff.png',
          similar: false 
        },
        ...
      ]
    */
    // do something
  })
``` 

2. 在js中书写配置时

```javascript
  import PxLint from 'pxlint'

  const config =  {
    protocol: 'http', // 协议，默认http
    host: '', // 主机名，必填
    port: '', // 端口号
    output_diff_image: true, // 是否输出差异图片，默认true
    output_score: true, // 是否输出分数，默认true
    temp_output_dir: path.resolve(__dirname, '../temp_output'), // 默认临时文件输出目录
  }
  
  // 传入config
  const pxlint = new PxLint(config)

  pxlint.run([
      {
        path: '/', // 测试网页url，不包括origin 
        viewport: [800, 600], // 视口大小
        design: 'design.png', // 设计稿的路径，可为本地路径、url
      },
      // 更多lint内容...
    ]).then((result) => {
      // do something
    })
```

## 输出
```
[
  { 
    path: '/',
    viewport: [ 800, 600 ],
    design: 'design.png',
    score: 0.39450209490402416,
    diff: 'diff.png',
    similar: false 
  },
  ...
]
```