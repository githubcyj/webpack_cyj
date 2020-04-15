# webpack
## 原理
- 以index.js为入口文件，加载相关的js,less等依赖文件
- 加载形成的树形依赖文件结构为chunk，在其中进行转换和打包
- 输出文件为bundle

## 核心概念
- entry
- output
- loader
webpack只能处理JavaScript的文件，需要借助loader将less，es6的import语法等转换成JavaScript文件
- plugin
打包优化，压缩文件
- mode
    - development
    - production

## 打包的文件类型
- css
- less
- html
- jpg,png
- 其他资源

## css处理
### css抽取为单独的文件
- MiniCssExtractPlugin

### css兼容性处理
- loader：postcss-loader
- plugin：postcss-preset-env

### 压缩css
- plugin: OptimizeCssAssetsWebpackPlugin

## js处理
### js语法检查
- eslint-loader eslint

### js兼容性处理
- 基本的js兼容性处理，只能转换基本语法，而promise不能转换：@babel/preset-env
- 全部的js兼容性处理，会将所有的兼容性代码引入，但是实际上只需要解决部分兼容性问题：@babel/polyfill(不需要单独配置，只要在使用的文件中引入即可)
- 按需加载：core-js

## package.json文件的启动命令
- development: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=development
- production: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=production

webpack常见问题
1.lees和css文件的加载先后顺序
2.全局变量的使用