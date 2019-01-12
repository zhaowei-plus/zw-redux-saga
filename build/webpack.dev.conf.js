var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 将热重载的相关配置放入entry的每一项中，达到每一个文件都可以实现热重载的目的
// 这样webpack.base.conf.js中entry选项就变成了如下：
// entry: {
//    app: ['./src/main.js', './build/dev-client']
//  }
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});
// 调用webpack-merge方法，将基础设置与开发设置进行合并
// webpack-merge的作用类似于extend：少则添加，同则覆盖
module.exports = merge(baseWebpackConfig, {
  module: {
    // 在开发环境下生成cssSourceMap，便于调试（但是官方说cssSourceMap的相对路径有一个bug，所以暂时将其关闭了）
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // 配置Source Maps 在开发中使用cheap-module-eval-source-map更快
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // DefinePlugin可以为webpack提供一个在编译时可以配置的全局常量
    // 在这里我们可以通过"process.env"这个全局变量的值来判定所处的环境
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 页面中的报错不会阻塞编译，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      chunks: ['app', 'vendor', 'manifest'],
    })
  ]
})