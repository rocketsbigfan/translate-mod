#! /usr/bin/env node

const { program } = require("commander")
const pkg = require('../package.json')
const start = require("./start")

program
  .version(pkg.version)
  .option('-b, --build', 'build file')
  .parse(process.argv)

const options = program.opts();
if (options.build) {
  start()
};
program.on('--help', function(){  
  console.log('');  
  console.log('use translate !');  
});
