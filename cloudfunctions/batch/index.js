const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const MAX_LIMIT = 100;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // 先取出集合记录总数
  console.log('wxContext', wxContext);
  const countResult = await db
    .collection('todos')
    .where({
      _openid: wxContext.OPENID
    })
    .count();
  const total = countResult.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100);
  // 承载所有读操作的 promise 的数组
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) {
    const promise = db
      .collection('todos')
      .where({
        _openid: wxContext.OPENID
      })
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    tasks.push(promise);
  }
  // 如果没有数据
  if (tasks.length < 1) {
    return {
      data: [],
      errMsg: '数据为空'
    };
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg
    };
  });
};
