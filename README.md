# vdora-cli

> Vue.js projects build tool

[github](https://github.com/aidenZou/vdora-cli)
[npm](https://www.npmjs.com/package/vdora-cli)
[projects example](https://github.com/aidenZou/vdora-cli/tree/example)


## 用法

### 安装 vue-cli脚手架

```
npm install -g vue-cli
```


### 创建 vue + webpack 工程

```
vue init webpack my-project && cd my-project
```


### 删除构建相关配置、模块

```
rm -rf build
rm -rf config
```

删除`package.json`文件 `devDependencies`模块（保留 `vue-template-compiler`）


### 安装`vdora-cli`

npm

```
npm install vdora-cli --save-dev
```

yarn

```
yarn add vdora-cli -D
```


### 更改 `package.json`下 `scripts`脚本

```
"scripts": {
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "build": "node build/build.js"
}
```

```
"scripts": {
    "dev": "vdora-dev",
    "start": "npm run dev",
    "build": "vdora-build"
}
```


### 起飞

`yarn run dev`：开发
`yarn run build`：构建


## 工程结构

```
.
├── README.md
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.js
├── static
└── yarn.lock
```

package.json

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "aidenZou <aidenzou@gmail.com>",
  "private": true,
  "scripts": {
    "dev": "vdora-dev",
    "start": "npm run dev",
    "build": "vdora-build",
    "lint": "eslint --ext .js,.vue src"
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  "devDependencies": {
    "vdora-cli": "^0.1.0",
    "vue-template-compiler": "^2.5.2"
  },
  "engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

## 配置


### webpack 自定义配置

项目根目录下新加 `webpack.config.js` 文件

```javascript
'use strict'

var webpackConfig = {
  // 影响所有（dev、build）
  entry: {
    app: './src/main.js'
  }
}

// 影响 build
if (process.env.NODE_ENV === 'production') {
  webpackConfig.output = {
    filename: 'js/diy-[name].[chunkhash].js'
  }
}

module.exports = webpackConfig
```


### 构建相关配置

`package.json`

```
{
  ...
  "buildConfig": {
    "output.path": "./dist" // 构建输出目录：默认 ./dist
  }
}
```
