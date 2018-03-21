'use strict';
const fs = require('fs');

const utils = {};

utils.getTime = date => {
  if (!date) {
    date = new Date();
  }
  return `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
};

utils.getDate = date => {
  if (!date) {
    date = new Date();
  }
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
};

utils.getDateTime = () => {
  const date = new Date();
  return `${utils.getDate(date)}${utils.getTime(date)}`;
};
// 检测是否有为null的对象
utils.hasNull = (...list) => {
  return list.some(item => item === null || item === undefined || item === '');
};

// 判断是否为空对象
utils.isEmptyObj = (...list) => {
  return list.some(item => {
    for (const key in item) {
      return false;
    }
    return true;
  });
};

// 判断文件类型是否为图片
utils.isPic = (...list) => {
  return list.some(item => {
    if (item.mimeType.indexOf('image') === -1) {
      return false;
    }
    return true;
  });
};

// 将数据库获取到的数组对象中的特定键，转化为数组
utils.arrObj2Arr = (list, key) => {
  const arr = [];
  for (const item of list) {
    arr.push(item[key]);
  }
  return arr;
};

utils.toPath = (key, path, list) => {
  // const serverPath = `http://192.168.0.104:7001/${path}/`;
  const serverPath = `/${path}/`;
  if (list instanceof Array) {
    for (const i of list) {
      i[key] = `${serverPath}${i[key]}`;
    }
  } else {
    list[key] = `${serverPath}${list[key]}`;
  }
  return list;
};


exports = module.exports = utils;
