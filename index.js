#! /usr/bin/env node

const { program } = require("commander")
const pkg = require(__dirname+'/package.json')
program
  .version(pkg.version)
  .description('test command', {
    username: 'user to login',
    password: 'password for user, if required'
  })
  .action((username, password) => {
    console.log('username:', username);
    console.log('environment:', password || 'no password given');
  });
program.parse(process.argv)