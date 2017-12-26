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
  // GET /api/users
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { limit, offset } = ctx.query;
    const result = await service.users.getList(parseInt(limit), parseInt(offset));
    this.success(result);
  }
  // GET /api/user
  async getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.query;
    const result = await service.users.getOne(parseInt(id));
    this.success(result);
  }

  // GET /backen/users
  async _getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { limit, offset } = ctx.query;
    const result = await service.users._getList(parseInt(limit), parseInt(offset));
    this.success(result);
  }

  // GET /backen/user
  async _getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.query;
    const result = await service.users._getOne(id);
    this.success(result);
  }
  // GET /api/users/instroduction
  async getInstroduction() {
    const { ctx, service } = this;
    const rule = {
      userId: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { userId } = ctx.query;
    const result = await service.users.getInstroduction(userId);
    this.success(result);
  }
}

module.exports = UsersController;
