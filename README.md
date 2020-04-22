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

## webpack详细配置
### entry
- string --> './src/index.js'
    单入口
    打包形成一个chunk。 输出一个bundle文件。
    此时chunk的名称默认是 main
- array  --> ['./src/index.js', './src/add.js']
    多入口
    所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
    --> 只有在HMR功能中让html热更新生效~
- object
    多入口
    有几个入口文件就形成几个chunk，输出几个bundle文件
    此时chunk的名称是 key

    --> 特殊用法
    ```
    {
        // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
        index: ['./src/index.js', './src/count.js'], 
        // 形成一个chunk，输出一个bundle文件。
        add: './src/add.js'
    }
    ```
### output
```
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
    // library: '[name]', // 整个库向外暴露的变量名
    // libraryTarget: 'window' // 变量名添加到哪个上 browser
    // libraryTarget: 'global' // 变量名添加到哪个上 node
    // libraryTarget: 'commonjs'
```
### module
```
module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只检查 src 下的js文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行
        // enforce: 'post',
        // 单个loader用loader
        loader: 'eslint-loader',
        options: {}
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
```
### resolve
```
    // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
```
### devServer
```
devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
```
### optimization
```
optimization: {
    splitChunks: {
      chunks: 'all'
      // 默认值，可以不写~
      /* minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }*/
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
```

## package.json文件的启动命令
- development: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=development
- production: webpack ./src/index_dev.js -o ./dist/bundle.js --mode=production

webpack常见问题
1.lees和css文件的加载先后顺序
2.全局变量的使用