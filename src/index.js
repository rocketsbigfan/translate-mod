const { resolve } = require('path');
const { sync } = require('globby');
const { readFileSync, writeFileSync } = require('fs');
const ProgressBar = require('progress');
const cwd = process.cwd()
const { transformer, mkDir } = require('./transform');


function start({entry, syncOptions}) {
  const root = resolve(cwd, entry);

  const files = sync([`${root}/**/!(*.d).{ts,tsx,js,jsx}`], syncOptions).map((x) => resolve(x));
  const filesLen = files.length;
  
  // 进度条功能
  const bar = new ProgressBar('  building [:bar] :percent :etas', {
    complete: '='
    , incomplete: ' '
    , width: 20
    , total: filesLen
  });

  for (let i = 0; i < filesLen; i += 1) {
    // 进度条显示
    bar.tick(i)
    // 单文件处理
    const file = files[i];
    const index = file.lastIndexOf('.');
    const fileType = file.substr(index + 1);
    const content = readFileSync(file, 'utf-8');
    const resContent = transformer(content, fileType);
    writeFileSync(file, resContent, 'utf8');
  }
  filesLen && mkDir(entry);
}

module.exports = start