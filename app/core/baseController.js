'use strict';
const APIError = require('./apiError');
const errCode = require('./errCode');
const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: errCode.SUCCESS.code,
      message: errCode.SUCCESS.msg,
      data,
    };
  }

  error(err, msg = '') {
    // 将错误抛出
    // 将第二层的错误打印在控制台进行调控
    console.log(msg);
    throw new APIError(err.code, err.msg);
  }
}

module.exports = BaseController;
