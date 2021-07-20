# translate-mod

将代码中的中文改成intl.get的形式
使用jscodeshift作为转化插件

## 用法

```javascript
script: {
  ...,
  "translate": "translate build",
  ...
}
```

## 参数

可在自己项目下配置translate.config.js，示例如下

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
