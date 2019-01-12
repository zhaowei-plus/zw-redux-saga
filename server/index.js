const Koa = require('koa')
const path = require('path')
// let c2 = require('koa2-connect');
// 将请求代理转发搭配其他服务的中间件
const proxy = require('http-proxy-middleware')
// const httpProxy = require('koa2-http-proxy-middleware')
const static = require('koa-static')
const fs = require('fs')

const app = new Koa()

app.use(async (ctx, next) => {
  if(ctx.url.startsWith('/api')) {
    return proxy({
      target: 'https://cnodejs.org/',
      pathRewrite: { '^/api': 'api/' },
    })(ctx.req, ctx.res, next)
  }
  return next()
})

app.use(static(path.join(__dirname, '../dist')))

app.use(async (ctx) => {
  ctx.body = fs.readFileSync('./dist/index.html')
})

app.listen(3000, () => {
  console.log('Listening 3000...')
});
