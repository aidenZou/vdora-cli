'use strict'

const path = require('path')
const fs = require('fs')

// 检测文件或者文件夹存在
function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}

/**
 * 装配配置文件
 * @param  {string} filename   文件名
 */
module.exports = function (filename) {
    const configPath = path.join(process.cwd(), filename)

    let config

    if (!fsExistsSync(configPath)) {
        return config
    }

    try {
        config = require(configPath)
    } catch (e) {
        console.error('读取配置错误...')
        console.error(e.stack)
    }

    // config.name = filename

    return config
}
