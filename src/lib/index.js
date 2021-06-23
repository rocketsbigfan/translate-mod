#! /usr/bin/env node

const { program } = require("commander")
const pkg = require('../../package.json')
const start = require("..")
program
  .version(pkg.version)
  .option('-s --start', 'start translate', start)

program.on('--help', function(){  
  console.log('');  
  console.log('use translate !');  
});

program.parse(process.argv)