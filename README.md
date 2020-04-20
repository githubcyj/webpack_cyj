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
- css、less
- js
- html
- jpg、png、gif
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
先执行eslint，再执行Babel。原因是：兼容性处理之后，有些会转成es5语法，var变量就会报错
### js语法检查
- eslint-loader eslint

### js兼容性处理
- 基本的js兼容性处理，只能转换基本语法，而promise不能转换：@babel/preset-env
- 全部的js兼容性处理，会将所有的兼容性代码引入，但是实际上只需要解决部分兼容性问题：@babel/polyfill(不需要单独配置，只要在使用的文件中引入即可)
- 按需加载：core-js

## webpack优化配置
### 开发环境性能优化
- 代码构建速度
HRM 热模块替换
一个模块发生变化，只会重新打包这个模块（不会打包所有模块）
    样式文件    可以使用hrm功能，因为style-loader内部实现了
    js文件      默认没有hrm功能,-->需要修改js代码，添加支持HRM功能的代码
            注意：HRM功能对js的处理，只能处理非入口js文件的其他文件
    html文件    默认没有hrm功能，同时会导致问题，html文件不会热更新了。
                解决方案：修改entry入口，引入html文件
                只有一个html文件，不需要做hrm功能
- 代码调试
source-map提供源代码到构建代码之后映射，技术，（如果构建代码错了，可以通过映射追踪到源代码错误）

### 生成环境性能优化
- 代码构建速度
- 代码运行性能

## package.json文件的启动命令
- development: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=development
- production: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=production

webpack常见问题
1.lees和css文件的加载先后顺序
2.全局变量的使用