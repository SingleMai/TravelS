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

  error(err) {
    // 将错误抛出
    throw new APIError(err.code, err.msg);
  }
}

module.exports = BaseController;
