# pxLint

检查页面效果与设计稿是否相符合

## 配置 .pxlint.js

```js
module.exports = {
  host: "127.0.0.1",
  port: "8360",
  route: [
    {
      path: "/index",
      design: [{
        viewport: [800, 600],
        image: './index.800x600.png',
      }, {
        viewport: [1920, 1280],
        image: './index.1920x1280.png',
      }]
    },
    {
      path: "/user",
      design: [{
        delay: 5000,  // 5秒后再截图
        viewport: [480, 800],
        image: './user.480x800.png',
      }]
    }
  ]
}
```

## 命令

```bash
pxlint --verbose
```

## 输出

...
