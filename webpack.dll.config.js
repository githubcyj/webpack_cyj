const { resolve } = require('path');
const webpack = require('webpack');
/**
 * 使用dll技术，对某些库（第三方库：jQuery，react，vue...）进行单独打包
 *  当运行webpack时，默认查找webpack.config.js 配置文件
 *  需要运行下webpack.dll.js 文件
 *  --> webpack webpack.dll.config.js
 */

 moudule.exports = {
     entry: {
        // 最终打包生成的[name] --> jquery
        // ['jqeury'] --> 要打包的库是jquery
         jquery: ['jqeury']
     },
     output: {
         filename: '[name].js',
         path: resolve(__dirname, 'dll'),
         library: '[name]_[hash]',//打包的库里面向外暴露出去的内容叫什么名字
     },
     plugin: [
         //打包生成一个 manifest.json --> 提供和jquery映射
         new webpack.DllPlugin({
            name: '[name]_[hash]',// 映射库暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json')//输出文件路径
         })
     ],
     mode: 'production'
 }