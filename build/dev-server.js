const opn = require('opn'); // 返回生成的子进程的promise
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');

const express = require('express');

console.info('设置server启动配置');
const port = 8000;

const app = express();

console.info('编译webpack配置');
const compiler = webpack(webpackConfig);
console.info('webpack编译完成');

console.info('将编译流通过webpack-dev-middleware');
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  lazy: false,
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});
console.info('将编译流通过webpack-hot-middleware');
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000,
});

console.info('监听HTML文件改变事件')
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
});

console.info('设置静态文件托管目录');
app.use('/dist', express.static('public'));

console.info('设置代理信息');
require('./dev-proxy')(app);

// console.info('添加history-fallback中间件');
// app.use(require('connect-history-api-fallback')());

console.info('添加webpack-dev-middleware中间件');
app.use(devMiddleware);

console.info('添加webpack-hot-middleware中间件');
app.use(hotMiddleware);

const uri = `http://localhost:${port}`;

console.info('> Starting dev server...');
console.info('设置webpack-dev-middleware中间件编译后的回调');

devMiddleware.waitUntilValid(() => {
  console.info(`> Listening at ${uri}\n`);
  opn(uri);
});

console.info(`server开始监听端口${port}`);
const server = app.listen(port);
