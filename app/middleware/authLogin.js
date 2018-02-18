/*
  从请求头里获得用户登录信息,并且写入上下文环境
*/
'use strict';
const jwt = require('../tools/jwt.js');
const errCode = require('../core/errCode');
const APIError = require('../core/apiError');

module.exports = options => {
  return function* authLogin(next) {
    let token = decodeURIComponent(this.request.header.authorization);
    token = token.split('token ')[1];
    try {
      const origDate = yield jwt.verify(this.app.config, token);
      this.user = origDate;
    } catch (error) {
      throw new APIError(errCode.AUTH_ERROR.code, errCode.AUTH_ERROR.msg);
    }
    yield next;
  };
};
