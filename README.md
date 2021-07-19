# translate-mod

将代码中的中文改成intl.get的形式

## 用法

```javascript
script: {
  ...,
  "translate": "translate build -p src",
  ...
}
```

## 参数

-p --path 需要处理的目录 例如
-i --ignore 需要忽略的目标路径
参数可参考globby.sync
