// 引入eventsource-polyfill模块
// 通常polyfill来填平旧浏览器一些事件支持上的缺陷
require('eventsource-polyfill')

const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
// index: ['webpack-hot-middleware/client?noInfo=true&reload=true',path.resolve(__dirname, '../src/main.js')]
console.info('Creating Hot Hook');
// 监听dev-server.js中webpack-hot-middleware发布的事件，当event.action为reload的时候重新刷新页面
// 订阅事件，当 event.action === 'reload' 时执行页面刷新
// 还记得 dev-server.js中 派发的reload事件吧
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
