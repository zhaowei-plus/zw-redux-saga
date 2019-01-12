const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:prod');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const MergeRouterPlugin = require('./merge-router-plugin');
const zcyHtmlBaseData = require('./html-base-data');

debug(`合并webpack ${config.build.env.NODE_ENV} 环境配置`);
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
  },
  plugins: [
    // new MergeRouterPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.build.env,
      __DEV__: false,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    // 提取css
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:8].css')),

    // CSS 切分
    new CSSSplitWebpackPlugin({
      size: 3400,
      filename: utils.assetsPath('css/[name]-[part].css'),
    }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: './src/index.hbs',
      inject: true,
      data: zcyHtmlBaseData,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),

    new webpack.HashedModuleIdsPlugin(),

    /**
     * 三方依赖库抽取
     */

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

debug(`合并webpack ${config.build.env.NODE_ENV} 环境配置成功`);
module.exports = webpackConfig;
