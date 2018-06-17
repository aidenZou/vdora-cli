#!/usr/bin/env node

var program = require('commander')
var appInfo = require('../package')

program
    .version(appInfo.version)
    .description('version ' + appInfo.version + '\n  什么鬼')
    .usage('<command> [options]')
    .command('dev', 'dev')
    .command('build', 'build')
    .command('publish', 'publish')
    .command('list', 'list packages installed')
    .parse(process.argv)
