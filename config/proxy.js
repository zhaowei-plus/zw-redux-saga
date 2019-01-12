module.exports = {
  useMockStatusCode: [404, 403, 500], // 需要使用mock数据的状态码
  rules: {
    cNode: {
      host: `https://cnodejs.org`,
      urls:[
        '/api/v1/*'
      ],
      useMock: [
        '/api/info',
        '/api/token',
      ],
    },
  },
  user: {
    account: 'admin',
    password: '123456',
  },
};
