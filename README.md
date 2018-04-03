# pxLint

检查页面效果与设计稿是否相符合

## 配置 .pxlint.js

```js
module.exports = {
  host: "", // 服务器host 可为空
  port: "", // 端口号 可为空
  tests: [
    {
      viewport: [800, 600], // 视口大小 
      design: './index.800x600.png', // 设计稿的路径
    },
    {
      viewport: [1920, 1080],
      design: './user.1920x1080.png',
    }
  ],
  path: './test', // 最终diff图存储的路径
  need_score: true, // 是否需要为匹配程度打分，默认为true
  need_diff_image: true, // 是否需要diff图， 默认为true
}
```

## 输出
```
[
  {
    isSimilar: true, // 两张图片是否相似,
    score: 0.2, // 匹配分数， 数值为0-1的小数
  },
  {
    ...
  }
]
```
...
