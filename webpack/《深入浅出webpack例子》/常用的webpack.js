const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html解析导入
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// __dirname 是 node.js 中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {
        entry: __dirname + "/app/main.js", //唯一入口文件
        output: {
            path: __dirname + "/build", //打包后输出的文件路径
            filename: "bundle-[hash].js" //打包后输出的文件名
        },
        devtool: 'none',
        //在package.json中的scripts对象中添加webpack-dev-server命令可开启本地服务器
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            //在开发单页应用时，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html，也就是不跳转
            historyApiFallback: true,
            inline: true, //当源文件改变时会自动刷新页面
            hot: true //热加载
        },
        //配置loader
        //模块的解析规则
        module: {
            rules: [
              //js 匹配所有的js，用babel-loader转译  排除掉node_modules
              {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
              },
              //css  use时如果多个loader，要从右往左写
              {
                test:/\.css$/,
                use:[
                  {
                      loader: "style-loader"
                  },{
                      loader: "css-loader"
                  }
                ]
              },
              //less
              {
                test:/\.less$/,
                use:[
                  {
                      loader: "style-loader"
                  },{
                      loader: "css-loader"
                  },{
                      loader: "less-loader"
                  }
                ]
              },
               //配置图片  只在10000字节以下转化base64，其他情况下输出原图片
              {
                test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
              }
            ]
        },
        plugins: [
            //通过这个插件打包后会在js文件中增加一段注释：/*! 版权所有，翻版必究 */
            new webpack.BannerPlugin('版权所有，翻版必究'),
            //HtmlWebpackPlugin：依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
            //new 一个这个插件的实例，并传入相关的参数，自动插入到dist目录中
            new HtmlWebpackPlugin({
                //使用的模板
                template: __dirname + "/app/index.tmpl.html" 
            }),
            //Hot Module Replacement（HMR）热加载插件：允许你在修改组件代码后，自动刷新实时预览修改后的效果。
            //在webpack中实现HMR也很简单，只需要做两项配置
            //在webpack配置文件中添加HMR插件；
            //在Webpack 的 devServer中添加“hot”参数为true；
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin("style.css")
        ]
};