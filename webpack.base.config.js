/**
 * 开发环境
 */
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// 入口文件
    entry: './src/index_base.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
    	// 配置相应的规则
        rules: [
            {
                //use数组中loader执行顺序，从右到左，从下到上，依次执行
                //style-loader：创建style标签，将js中的样式资源插入
                //css-loader：将css文件变成commonjs模块加载js，里面的内容是样式字符串
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, 
            {
                test: /\.less$/,
                use: ['style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'],
            },
            {
                test: /\.js[x]?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                //处理图片资源，但是无法处理html中的img图片
                test: /\.(jpg|png|gif)$/,
                //url-loader依赖于file-loader
                loader: 'url-loader',
                options: {
                    //图片小于8kb，就会被base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    //缺点：图片体积会更大，（文件请求速度更慢）
                    limit: 8 * 1024,
                    //问题：因为url-loader默认使用es6模块化解析，而html-loader引入的图片是commonjs
                    //解析时会出现问题：[object Module]
                    //解决：关闭url-loader的es6模块化，使用commonjs解析
                    esMoudle: false,
                    outputPath: 'imgs',
                    //给图片进行重命名
                    //[hash:10]去图片的hash的前十位
                    //[ext]取文件原来的扩展名
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs'
                }
            },
            {
                test: /\.html$/,
                //处理html文件的img图片，（复制引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            },
            {
                //打包其他资源
                exclude: /\.(css|less|js|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    // 配置相应的插件
    plugins: [
        //默认会创建一个空的html,自动引入打包输出的所有资源（js/css）
        new HtmlWebpackPlugin({
            //复制 './src/index_base.html' 文件，自动引入打包输出所有的资源（js/css）
            template: './src/index_base.html'
        }),
        // new CleanWebpackPlugin()
    ],
    mode: 'development',
    //自会在内存中进行打包
    devServer: {//用来自动化，自动编译，自动打开浏览器，自动刷新浏览器
        //项目构建后路径
        contentBase: resolve(__dirname, 'dist'),
        //启动gzip压缩
        compress: true,
        port: 3000,
        //自动打开浏览器
        open: true,
        //开启HRM功能
        hot: true
    },
    devtool: 'source-map'
};