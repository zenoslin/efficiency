const soup = require('./soup.json');
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  return soup[getRandomInt(0, soup.length)];
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
