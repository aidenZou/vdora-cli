#!/usr/bin/env node

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
var merge = require('webpack-merge')
const config = require('../config/webpack/config')
const defaultWebpackConfig = require('../config/webpack/webpack.prod.conf')
var loadConfig = require('../lib/load-config')

const spinner = ora('building for production...')
spinner.start()

var divConfig = loadConfig('webpack.config.js')
var webpackConfig = merge.smartStrategy({
    entry: 'replace' // or 'replace', defaults to 'append'
    // 'module.loaders': 'prepend'
})(defaultWebpackConfig, divConfig)

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
