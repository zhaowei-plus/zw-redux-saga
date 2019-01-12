// https://blog.csdn.net/zt15732625878/article/details/78941268
const _ = require('lodash');
const path = require('path');
const httpProxy = require('http-proxy');
const Promise = require('bluebird');
const request = require('request');
const chokidar = require('chokidar');
const proxyConfig = require('../config/proxy');

const proxyRespJson = require('node-http-proxy-json');

const proxy = httpProxy.createProxyServer();
Promise.promisifyAll(request);

var mockData = {};
const mockDataPath = path.resolve(__dirname, '../mockData');

chokidar.watch(mockDataPath).on('change', (filepath) => {
  console.info('mock数据变化，重新加载', filepath);
  loadMockData();
});

function loadMockData() {
  try {
    Object.keys(require.cache).forEach((cachePath) => {
      if (cachePath.startsWith(mockDataPath)) {
        delete require.cache[cachePath];
      }
    });
    mockData = require(mockDataPath);
  } catch (error) {
    console.error('加载mock数据异常', error);
  }
}

proxy.on('error', (err, req, res) => {
  console.error('代理失败:', err);
});

proxy.on('proxyReq', (proxyReq) => {
  // HTTP请求由三部分组成，分别是：请求行，消息报头，请求正文。
  console.info('发起请求！');
  // http auth是一种基础的用户验证，原理是将用户名:密码base64加密后放在http的请求头部Authorization 发给服务器
  // proxyReq.setHeader('Authorization', authorizationValue);
  // restful api 的一个特点即无状态，每次对敏感资源的访问都需要进行登陆验证，可以用http auth来很好的开发restful api。
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  console.log(`请求代理状态: ${proxyRes.statusCode}  <==>  path: ${req.path}`);
  const useMockStatusCode = [404, 403, 500];

  if (useMockStatusCode.indexOf(proxyRes.statusCode) !== -1) {
    // 获取 writHead 方法，发送一个响应头给请求，这里获取此方法，改变响应头状态嘛
    /* 参数列表：
    *  .writeHead(200, {
              'Content-Length': Buffer.byteLength(body),
              'Content-Type': 'text/plain'
              })
        状态码：如 404
        headers 是响应头
    * */
    const _writeHead = res.writeHead
    // writHead() 在消息中只能被调用一次，且必须在res.end()之前调用
    // response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先

    Object.assign(res, {
      writeHead: () => {
        // 函数 apply() 方法，执行this为res，传递参数 200，
        _writeHead.apply(res, [200, proxyRes.headers])
      }
    })

    proxyRespJson(res, proxyRes.headers['content-encoding'], (body) => {
      console.info('请求远端服务异常，采用本地mock数据', req.path)
      const callback = mockData[req.path]
      // 传入req，用于部分mock获取request的数据
      return callback ? callback(req) : {}
    })
  }
});

module.exports = (app) => {
  /*
  * app.all()函数可以匹配所有的HTTP动词，也就是说它可以过滤所有路径的请求
  * app.all(path,function(request, response))
  * */
  _.forIn(proxyConfig.rules, (rule) => {
    rule.urls.forEach(url => {
      url && app.all(url, (req, res) => {
        proxy.web(req, res,
          {
            target: rule.host,
            changeOrigin: true, // 是否更改原始的host头字段为target url，默认为 false, 表示用于更改目标地址头信息
            proxyTimeout: 10 * 60 * 1000
          });
      });
    })
  })
}





