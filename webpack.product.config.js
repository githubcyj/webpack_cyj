/**
 * 生产环境
 */
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置 nodejs 环境变量 
// process.env.NODE_ENV = 'development';


module.exports = { 
    entry: './src/js/index.js', 
    output: { 
        filename: 'js/built.js', 
        path: resolve(__dirname, 'build') 
    }, 
    module: { 
        rules: [ { 
            test: /\.css$/, 
            use: [ 
                // 创建 style 标签，将样式放入 
                // 'style-loader', 
                // 这个 loader 取代 style-loader。作用：提取 js 中的 css 成单独文件 
                MiniCssExtractPlugin.loader, 
                // 将 css 文件整合到 js 文件中 
                'css-loader',
                //css的兼容性处理
                //帮助postcss找到package.json中browserlist里面的配置，通过配置加载指定的样式
                {
                    loader: 'postcss-loader',
                    option: {
                        ident: 'postcss',
                        plugins: ()=>{
                            // postcss 的插件
                            require('postcss-preset-env')
                        }
                    }
                }
            ] 
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
               use: [{
                        loader: 'eslint-loader',
                        options: {
                                //自动修复eslint的错误
                            fix: true
                        }
                    },
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
                            ]
                        }
                    }
                ]
            },
        ] 
    }, 
    plugins: [ 
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        }), 
        new MiniCssExtractPlugin({ 
            // 对输出的 css 文件进行重命名 
            filename: 'css/built.css' 
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ], 
    mode: 'development' 
}; 


// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base.config.js');

// module.exports = merge(baseConfig, {
// 	// 设置为生产模式
//     mode: 'production'
// });