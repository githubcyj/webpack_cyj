/**
 * 生产环境
 */
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

// 设置 nodejs 环境变量，确定使用browselist的那个环境配置
// process.env.NODE_ENV = 'development';

/**
 * PWA: 渐进式网络开发应用程序（离线可访问）
 *      workbpx --> workbox-webpack-plugin
 * 
 * 1.eslint不认识window，navigator全局变量
 *      需要修改package.json中eslintConfig配置
 *      "env":{ "browser": true //支持浏览器全局变量}
 * 
 *      if('serviceWorker' in navigator){
 *          window.addEventListener('load', ()=>{
 *              navigator.serviceWorker
 *              .register('/service-worker.js')
 *              .then(()=>{
 *                  console.log("注册成功")
 *              })
 *              .catch(()=>{
 *                  console.log("注册失败")
 *              })
 *          })
 *      }
 * 
 * 2.sw 的代码必须运行在服务器上
 * --> nodejs
 * 
 * --> 
 *      npm i serve -g
 *      serve -s build 启动服务器，将build目录下的资源作为静态资源暴露出去
 * 
 */

/**
 * babel缓存
 *      cacheDirectory: true,
 * 
 * 文件资源缓存
 *      hash: 每次webpack构建时会生成一个唯一的hash值
 *          问题是：因为js和css使用同一个hash值，
 *              如果重新打包，会导致所有缓存失效（可能只是改了一个文件）
 * 
 *      chunkhash: 根据chunk生成hash值，如果打包来源于同一个chunk，那么hash值就一样
 *          问题是：js和css的hash值还是一样的
 *              因为css是js中被引入的，所以同属于一个chunk
 * 
 *      contenthash: 根据文件内容生成hash值，不同文件的hash值一定不一样
 *      -->让代码上线运行缓存更好使用
 * 
 */

 /**
  * tree shaking: 去除无用代码
  *     前提：1.必须使用es6模块化   2.开启production环境
  *     作用：减少代码体积
  * 
  *     在package.json中配置
  *         "sideEffects":false  表示所有代码都没有副作用（都可以进行tree shaking）
  *         问题是：可能会把css / @babel/ployfill（副作用）文件干掉
  *         "sideEffects": ["*.css", "*.less"]
  */

  /**
   * 正常加载可以认为是并行加载（同一时间加载多个文件）
   * 
   * 懒加载：当文件需要时才加载
   *    是将文件的导入放在回调函数中去执行，类似于通过js代码，把文件单独打包成一个文件的方式
   * 
   * 预加载：prefetch  会在使用之前，提前加载css文件。等其他资源加载完毕，浏览器空闲了，再加载资源   */
    //     import(/*webpackChunkName: 'test', webpackPrefetch: true*/'.test')
    //      .then(({mul, count})=>{
    //           //文件加载成功
    //          //eslint-disable-next-line
    //           consol.log("success"); 
    //        })
    //      .cathch(()=>{
    //          //eslint-disable-next-line
    //           consol.log("fail"); 
    //        })

//复用loader
const commonCssloader = [
    MiniCssExtractPlugin.loader, 
    // 将 css 文件整合到 js 文件中 
    'css-loader',
    //css的兼容性处理
    //帮助postcss找到package.json中browserlist里面的配置，通过配置加载指定的样式
    {
        loader: 'postcss-loader',
        option: {
            ident: 'postcss',
            plugins: ()=>[
                // postcss 的插件
                require('postcss-preset-env')()
            ]
        }
    }
]


module.exports = { 
    entry: ['./src/js/index.js', './src/index.html'], 
    output: { 
        filename: 'js/built.[hash:10].js', 
        path: resolve(__dirname, 'build') 
    }, 
    module: { 
        rules: [ 
            {
                oneOf: [//优化生成环境的打包速度
                    {
                        //以下loader只会匹配一个
                        //注意：不能两个配置处理同一种类型文件，可以将重复的处理提取到oneOf外面
                    }
                ]
            },
            { 
            test: /\.css$/, 
            use: [ 
                // 创建 style 标签，将样式放入 
                // 'style-loader', 
                // 这个 loader 取代 style-loader。作用：提取 js 中的 css 成单独文件 
                ...commonCssloader
            ] 
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssloader,
                    'less-loader'
                ]
            },
            {
                //先执行语法检查，再进行兼容性处理，
                //原因：兼容性处理之后，有些会转成es5语法，var变量就会报错
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行 
                enforce: 'pre', 
                loader: 'eslint-loader', 
                options: { 
                    //自动修复eslint的错误
                    fix: true 
                }
            },
            {
                /*
                    语法检查： eslint-loader eslint
                    注意：只检查自己写的源代码，第三方的库是不用检查的
                    设置检查规则： 
                        package.json 中 eslintConfig 中设置~ 
                            "eslintConfig": { 
                                "extends": "airbnb-base" 
                            } 
                            airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
                */ 
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    /**
                     * 开启多线程打包
                     * 进程启动大概为600毫秒，进程通信页需要时间
                     * 只有工作消耗时间比较长，才需要进行多进程打包
                     */
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            //指示Babel做怎么样兼容性处理
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        //按需加载
                                        useBuiltIns: 'usage', 
                                        // 指定 core-js 版本 
                                        corejs: { 
                                            version: 3 
                                        }, 
                                        // 指定兼容性做到哪个版本浏览器 
                                        targets: { 
                                            chrome: '60', 
                                            firefox: '60', 
                                            ie: '9', 
                                            safari: '10', 
                                            edge: '17' 
                                        }
                                    }
                                ]
                            ],
                            //开启Babel缓存
                            //第二次构建的时候，才会读取之前缓存
                            cacheDirectory: true,
                        }
                    }
                ]
                
            },
            {
                test: /\.(png|jpg|gif)/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(css|less|js|html|png|jpg|gif)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media'
                }
            }
        ] 
    }, 
    plugins: [ 
        new HtmlWebpackPlugin({ 
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }), 
        new MiniCssExtractPlugin({ 
            // 对输出的 css 文件进行重命名 
            filename: 'css/built.[hash:10].css' 
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            /**
             * 1.帮助serviceworker快速启动
             * 2.删除旧的serviceworker
             * 
             * 生成一个 serviceworker 配置文件
             */
            clientsClaim: true,
            skipWaiting: true
        }),
        //告诉webpack哪些库不参与打包，同时使用的名称也要变
        // new webpack.DllReferencePlugin({
        //     manifest: resolve(__dirname, 'dll/manifest.json')
        // }),
        //将某个文件打包输出去，并在html中自动引入该资源
        new addAssetHtmlWebpackPlugin({
            filePath: resolve(__dirname, 'dll/jquery.js')
        })
    ], 
    /**
     * 将文件单独打包的方式
     * 1.设置多入口文件
     * 2.通过optimization设置
     *      //1.可以将node_modules中代码单独打包一个chunk最终输出
     *      //2.自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独的一个chunk
     * 3.通过js代码，让某个文件被单独打包成一个chunk   */
    //     import(/*webpackChunkName: 'test'*/'.test')
    //      .then(({mul, count})=>{
    //           //文件加载成功
    //          //eslint-disable-next-line
    //           consol.log("success"); 
    //        })
    //      .cathch(()=>{
    //          //eslint-disable-next-line
    //           consol.log("fail"); 
    //        })

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production',
    externals: {
        //拒绝把jQuery打包进来，但是需要在html文件中手动引入进来  -- npm包名
        jQuery: 'jQuery'
    }
}; 


// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base.config.js');

// module.exports = merge(baseConfig, {
// 	// 设置为生产模式
//     mode: 'production'
// });