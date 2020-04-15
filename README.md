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

## package.json文件的启动命令
- development: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=development
- production: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=production

webpack常见问题
1.lees和css文件的加载先后顺序
2.全局变量的使用