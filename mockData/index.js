const Mock = require('mockjs');

module.exports = {
  '/mock/test1111': function () {
    const data = Mock.mock({
      'list|1-10': [{
        name: Mock.Random.cname(),
        'age|18-60': 1,
        email: Mock.mock('@EMAIL()'),
      }]
    });
    return data.list;
  }
};
