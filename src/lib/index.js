#! /usr/bin/env node

const { program } = require("commander")
const pkg = require('../../package.json')
const start = require("..")
program
  .version(pkg.version)
  .command('build', { isDefault: true })
  .description('translate cn to intl function')
  .option('-p, --path <path>', 'specified path')
  .option('-i, --ignore <regpex>', 'path regpex')
  .action((options) => {
    const { path, ignore } = options
    start({path, ignore})
  })
  .parse(process.argv)
  
program.on('--help', function(){  
  console.log('');  
  console.log('use translate !');  
});
