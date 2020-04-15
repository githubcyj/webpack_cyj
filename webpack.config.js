let path = require("path");
// let HtmlWebpackplugin = require('html-webpack-plugin')
// let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// let {CleanWebpackPlugin} = require('clean-webpack-plugin')
// // let OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// // let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {

//   // optimization: {
//   //       minimizer : [
//   //           new UglifyJsPlugin({//优化js文件，主要是压缩js文件
//   //               cache : true,   //使用缓存
//   //               sourceMap : true    //增加源码，便于调试
//   //           }),
//   //           new OptimizeCssAssetWebpackPlugin()//压缩css文件
//   //       ]
//   //   },

//   mode : 'development',//模式 production  development
//   entry: {
//     app: "./src/index.js"//入口文件
//   },
//   output: {
//     filename:'bundle.js',//打包后的文件名
//     path:path.resolve(__dirname,'dist')//这里是绝对路径
//   },


// //解析第三方包
//   // resolve : {
//   //   // modules: [
//   //   //   "node_modules",
//   //   //   path.resolve(__dirname, "app")
//   //   // ],
//   //     modules : [path.resolve('node_modules')],   //会在该目录下找第三方包
//   //     extensions : ['.json'],    //文件引入后隐式加入扩展名，一次解析
//   // },

// //实时监控代码变化并实时打包
//   watch : true,
//   watchOptions : {//监控选项
//       poll : 1000,//每秒访问1000次
//       aggregateTimeout : 500,//防抖 一直输入代码，停止500毫秒打包一次
//       ignored : /node_modules/,//不需要监控的内容
//   },
// //如果手动引入，如import $ from 'jquery' 则不打包该模块
//   // externals : {
//   //   jquery : 'jQuery'
//   // },

  module: { //模块
      rules: [ 
// //注入$的方式和plugins中的配置只能二选一
//         // {//将jQuery暴露给全局文件使用，用$
//         //     test : require.resolve('jquery'),
//         //     use : 'expose-loader?$'
//         // },

// //解析图片
//         // {
//         //     test : /\.(png|jpg|gif|ico)$/,
//         //     use : 'file-loader'
//         // },
        
// //解析html文件，并编译图片
//         // {
//         //   test : /\.html$/,
//         //   use : {
//         //     loader:'html-withimg-loader',
//         //     options:{
//         //         minimize: false,
//         //         //开启link的替换
//         //         attrs: ['img:src', 'link:href'],
//         //     }
//         //   }
//         // },
// //解析图片，做一个限制，当图片小于多少K的时候，用base64来转化，当图片大于200K用file-loader来处理
//         {
//           test : /\.(png|jpg|gif)$/,
//           use : {
//             loader : 'url-loader',
//             options : {
//               limit : 200 * 1024 
//             }
//           }
//         },
        
//规则：css-loader 负责解析@import 这种语法
          //style-loader 他把css插入到head标签中
          //loader的特点：希望单一
          //loader的用法：字符串只用一个loader
          //多个loader需要[]
          //loader的顺序，默认是从右向左执行 从下到上执行
          //loader还可以写成对象方式
          //可以处理less文件
          // {
          //   test: /\.css$/,
          //   loader: 'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
          //   exclude: /node_modules/,
          // },
          // {
          //   test: /\.css$/,
          //   // 以<link>标签形式引用css
          //   use: [
          //     { loader: 'style-loader/url', options: { attrs: { id: 'id' } } },
          //     {loader: "file-loader"}
          //   ]
    
          // },
          {
            test: /\.css$/,
            //use数组中loader执行顺序，从右到左，从下到上，依次执行
            //style-loader：创建style标签，将js中的样式资源插入
            //css-loader：将css文件变成commonjs模块加载js，里面的内容是样式字符串
            // use: ['style-loader', 'css-loader']
            use: [
              {loader: MiniCssExtractPlugin.loader},
              {loader: 'css-loader',
              options: {
                importLoaders: 1,
              }}
            ]
        }, 
        

        {
            test: /\.less$/,
            use: [
              {loader: MiniCssExtractPlugin.loader},
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'less-loader']
        },
      //    {
      //     // test: /\.js[x]?$/,
      //     test:/(\.jsx|\.js)$/,
      //     use: {
      //       loader: 'babel-loader',
      //       // options:{
      //       //   plugins: [
      //       //     ["@babel/plugin-proposal-decorators", { "legacy": true }],
      //       //     // "@babel/plugin-syntax-dynamic-import",
      //       //     ["@babel/plugin-proposal-class-properties",{"loose":true}],
      //       //   ]
      //       // }
      //     }
      // }
      ]
    },

// //插件
//   plugins:[

//       new HtmlWebpackplugin({
//           template:'./public/index.html',//以该文件为模板生成打包后的html文件
//           filename:'index.html',//打包后生成的文件名
//           minify:{//压缩打包后的html文件
//               removeAttributeQuotes:true, //删除html文件中的双引号
//               collapseWhitespace:true //html文件压缩成一行
//           },
//           hash:true // html文件中引入的js文件加上hash戳
//       }),
//       // new webpack.ProvidePlugin({//在每个模块中注入$
//       //   $ : 'jquery'
//       // })
//       new MiniCssExtractPlugin({
//         filename : 'css/[name].css'//抽离出来的文件名
//       }),
//       new CleanWebpackPlugin(),    //先删除该目录再打包

//       // new copyWebpackPlugin([
//       //     // {from : './compileFile', to : './build'}
//       // ]),

//   ],

//   //服务器
// //   devServer:{
// //     port: 6666,  //端口
// //     progress: true,  //打包过程中显示进度条
// //     contentBase: './src/compileFile',   //该文件夹作为静态目录，即直接找到该文件夹，以当前目录作为指定目录
// //     open: true   //自动打开浏览器
// // }
};