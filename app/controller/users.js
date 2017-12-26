'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');

class UsersController extends Controller {
  // GET /api/token
  async token() {
    const { ctx } = this;
    ctx.body = 1;
    ctx.status = 201;
  }
}

module.exports = UsersController;
