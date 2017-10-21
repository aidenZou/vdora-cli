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
