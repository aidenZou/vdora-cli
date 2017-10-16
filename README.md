# vdora-cli

> 一个命令行工具


## 用法

### 安装脚手架

```
npm install -g vue-cli
```


### 创建 vue + webpack 工程

```
vue init webpack my-project
```


### 删除构建相关配置、模块

```
cd my-project
rm -rf build
rm -rf config
```

删除`package.json`文件 `devDependencies`模块


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
  "engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  "devDependencies": {
    "vdora-cli": "^0.1.0"
  }
}
```


