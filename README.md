# translate-mod

基于jscodeshift插件开发的，可以批量重构文件的脚手架

## 用法

先将项目clone到本地，然后通过**yarn link**来关联项目

```bash
git clone https://github.com/rocketsbigfan/translate-mod.git

cd ./translate-mod

yarn link
```

在你本地的项目下，在使用**yarn link translate-mod**

```javascript
script: {
  ...,
  "translate": "translate build",
  ...
}
```

可在自己项目下配置transform.config.js，示例如下

```javascript
{
  entry: 'src',
  // globby.sync options
  syncOptions: {
    ignore: `/.umi/**`, // /.umi/**
    dot: true,
    ...
  },
  successCallBack: Function,
  coreFn: (j: core.JSCodeshift, root: Collection<any>) => string,
}
```
