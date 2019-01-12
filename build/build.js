const webpack = require('webpack');

const webpackConfig = require('./webpack.dev.conf');

webpack(webpackConfig, (err, stats) => {
 console.log('配置完毕！');
});