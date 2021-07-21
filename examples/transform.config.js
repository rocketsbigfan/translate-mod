/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-multi-assign */
const fs = require('fs')
const { existsSync, unlinkSync, writeFileSync } = fs;

let i = 0;
const intlJson = {};
const reflectJson = {};

function mkDir() {
  const root = `intl.json`;
  if (existsSync(root)) {
    unlinkSync(root);
  }
  writeFileSync(root, JSON.stringify(intlJson));
}


function coreFn (j, root) {
  const Literal = root.find(j.Literal, (p) => /[\u4e00-\u9fa5]/.test(p.value));
  const TemplateLiteral = root.find(j.TemplateLiteral);
  try {
    if (Literal.length || TemplateLiteral.length) {
      j(root.find(j.Declaration).at(0).get()).insertBefore("import intl from 'intl'").toSource();
      // 处理模版字符串
      root.find(j.TemplateLiteral).forEach((path) => {
        let value = '';
        let hash = i;
        path.node.quasis.forEach((item, index) => {
          if (index >= path.node.expressions.length) {
            value += item.value.raw;
          } else {
            value = `${value + item.value.raw}{${path.node.expressions[index].name}}`;
          }
        });
        if (value in reflectJson) {
          hash = reflectJson[value];
        } else {
          hash = i++;
          intlJson[hash] = value;
          reflectJson[value] = hash;
        }

        intlJson[hash] = value;

        const obj = path.node.expressions.map((item) => item.name);
        j(path).replaceWith((p) => {
          p.node.raw = `intl.get(${hash}, {${obj}})`;
          return p.node.raw;
        });

        const comments = (path.node.comments = path.node.comments || []);
        const comment = j.commentBlock(` ${hash}: ${value} `, true, false); // 生成行注释
        comments.push(comment);
      });
      // 处理字面量
      Literal.forEach((path) => {
        const value = path.node.raw || path.node.value;
        let hash = i;

        if (value in reflectJson) {
          hash = reflectJson[value];
        } else {
          hash = i++;
          intlJson[hash] = value;
          reflectJson[value] = hash;
        }

        j(path).replaceWith((p) => {
          if (p.node.type === 'JSXText') {
            p.node.raw = `{intl.get(${hash})}`;
          } else if (p.parentPath.node.type === 'JSXAttribute') {
            p.node.raw = `{intl.get(${hash})}`;
          } else {
            p.node.raw = `intl.get(${hash})`;
          }
          return p.node.raw;
        });
        const comments = (path.node.comments = path.node.comments || []);
        const comment = j.commentBlock(` ${hash}: ${value} `, true, false); // 生成行注释
        comments.push(comment);
      });
    }
  } catch (e) {
    console.log(e);
  }

  return root.toSource();

}
const config ={
  coreFn,
  successCallBack: mkDir
}
module.exports = config
