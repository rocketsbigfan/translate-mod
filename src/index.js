const { resolve } = require('path');
const { sync } = require('globby');
const { readFileSync, writeFileSync } = require('fs');
const ProgressBar = require('progress');
const { transformer, mkDir } = require('./transform');


function start({path, ignore}) {
  const root = resolve(process.cwd(), path || 'src');
  const options = ignore ? {
    ignore: `${root}${ignore}`, // /.umi/**
  }: {}
  const files = sync([`${root}/**/!(*.d).{ts,tsx,js,jsx}`], options).map((x) => resolve(x));
  const filesLen = files.length;
  
  // 进度条功能
  const bar = new ProgressBar('  building [:bar] :percent :etas', {
    complete: '='
    , incomplete: ' '
    , width: 20
    , total: filesLen
  });

  for (let i = 0; i < filesLen; i += 1) {
    bar.tick(i)
    const file = files[i];
    const index = file.lastIndexOf('.');
    const parser = file.substr(index + 1);
    const content = readFileSync(file, 'utf-8');
    const resContent = transformer(content, parser);
    writeFileSync(file, resContent, 'utf8');
  }
  filesLen && mkDir();
}

module.exports = start