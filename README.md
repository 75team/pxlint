# pxLint

检查页面效果与设计稿是否相符合

## 配置 .pxlint.js

```js
module.exports = {
  host: "127.0.0.1",
  port: "8360",
  tests: [
    {
      path: "/index",
      viewport: [800, 600],
      design: './index.800x600.png',
    },
    {
      path: "/user",
      viewport: [1920, 1080],
      design: './user.1920x1080.png',
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
