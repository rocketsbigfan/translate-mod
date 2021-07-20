#! /usr/bin/env node

const { program } = require("commander")
const { resolve } = require('path');
const pkg = require('../../package.json')
const start = require("..")
const cwd = process.cwd()
const config = require(cwd+'/transform.config.js')
const srcRoot = resolve(cwd, 'src')
const defaultProps = {
  entry: 'src',
  syncOptions: {
    ignore: `${srcRoot}/.umi/**`, // /.umi/**
    dot: true
  }
}
program
  .version(pkg.version)
  .command('build', { isDefault: true })
  .description('translate cn to intl function')
  .action(() => {
    let { entry, syncOptions } = config
    entry = entry || defaultProps.entry

    syncOptions = syncOptions.ignore ? {
      ...syncOptions,
      ignore: resolve(cwd, ignore)
    }: defaultProps.syncOptions

    start({entry, syncOptions})
  })
  .parse(process.argv)
  
program.on('--help', function(){  
  console.log('');  
  console.log('use translate !');  
});
