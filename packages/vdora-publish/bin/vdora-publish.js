#!/usr/bin/env node

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const {
    join,
} = require('path');
const fs = require('fs');
const qiniu = require("qiniu");

// const {
//     project,
// } = require(path.resolve(process.cwd(), './package.json')) || {};

const {
    qiniu: qiniuConfig,
} = require(path.resolve(process.cwd(), './.project.config.js')) || {};

// success、notice、info、warn、error
const log = {
    success(msg) {
        console.log(chalk.green(msg));
    },
    info(msg) {
        console.log(chalk.blue(msg));
    },
    error(msg) {
        console.log(chalk.red(msg));
    },
};

const {
    distDir, // 本地目录
    rootDir = 'temp/', // 远端根目录
    accessKey,
    secretKey,
    cover = false, // 同名文件上传是否覆盖
    scope = 'static',
    host = 'https://static.cool-app.cn/'
} = qiniuConfig;

const spinner = ora('发布中...')
// spinner.start()

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
// 是否使用https域名
// config.useHttpsDomain = true;
// 上传是否使用cdn加速
// config.useCdnDomain = true;

const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// 文件上传
const uploader = function (localFile, key) {
    const options = {
        scope: cover ? `${scope}:${key}` : scope
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    // formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr,
    formUploader.putFile(uploadToken, key, localFile, null, (respErr,
        respBody, respInfo) => {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            log.success(`发布成功: ${host}${respBody.key}`);
        } else {
            log.error(localFile);
            // log.error(respInfo.statusCode);
            log.info(JSON.stringify(respBody));
        }
    });
    // spinner.stop();
};

function findSync(startPath) {
    const result = [];

    function finder(path) {
        const files = fs.readdirSync(path);
        files.forEach((val, index) => {
            const fPath = join(path, val);
            // const fPath = path.join(path, val);
            const stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    return result;
}
const fileNames = findSync(distDir);

// log.info(fileNames)

fileNames.forEach((localFile, index) => {
    const key = localFile.replace(distDir, rootDir);
    // log.info(localFile, key);
    uploader(localFile, key);
    // spinner.stop();
});