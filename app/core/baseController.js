'use strict';
const APIError = require('./apiError');
const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 1,
      message: 'success',
      data,
    };
  }

  error(code, message) {
    // 将错误抛出
    throw new APIError(code, message);
  }
}
module.exports = BaseController;
