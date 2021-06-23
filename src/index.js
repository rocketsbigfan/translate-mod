const { resolve } = require('path');
const { sync } = require('globby');
const { readFileSync, writeFileSync } = require('fs');
const { transformer, mkDir } = require('./transform');


function start() {
  const root = resolve(process.cwd(), 'src');
  const files = sync([`${root}/**/!(*.d).{ts,tsx,js,jsx}`], {
    dot: true,
    ignore: `${root}/.umi/**`,
  }).map((x) => resolve(x));
  const filesLen = files.length;
  console.log('filesLen: ', filesLen);
  for (let i = 0; i < filesLen; i += 1) {
    const file = files[i];
    console.log('file: ', file);
    const index = file.lastIndexOf('.');
    const parser = file.substr(index + 1);
    const content = readFileSync(file, 'utf-8');
    const resContent = transformer(content, parser);
    writeFileSync(file, resContent, 'utf8');
  }
  filesLen && mkDir();
}

module.exports = start