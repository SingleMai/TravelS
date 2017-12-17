'use strict';

const Controller = require('../core/baseController');
class AdminController extends Controller {
  // GET /backen/admin
  async token() {
    const { ctx } = this;
    ctx.body = 1;
    ctx.status = 201;
  }
  // GET /backen/admin
  async getList() {
    const { service } = this;
    const data = await service.admin.getList();
    this.success(data);
  }
  // GET /backen/admin/:id
  async getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.params);
    } catch (err) {
      this.error(-1, 'params invalid/empty');
    }
    const { id } = ctx.params;
    const data = await service.admin.getOne(id);
    if (data === null) {
      this.error(2, 'not found');
    } else {
      this.success(data);
    }
  }
  // POST /backen/admin
  async create() {
    const { ctx, service } = this;
    const rule = {
      name: 'string',
      account: 'string',
      password: 'string',
      permission: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(-1, 'params invalid/empty');
    }
    const { name, account, password, permission } = ctx.request.body;
    const admin = await service.admin.getOneByAccount(account);
    if (admin) {
      this.error('-2', 'object exits: account exites');
    }
    const result = await service.admin.create({
      name,
      account,
      password,
      permission,
    });
    this.success(result.id);
  }
  // DELETE /backen/admin/:id
  async del() {
    const { ctx, service } = this;
    const paramsRule = {
      id: 'id',
    };
    try {
      ctx.validate(paramsRule, ctx.params);
    } catch (err) {
      this.error(-1, 'params invalid/empty');
    }
    const { id } = ctx.params;
    await service.admin.del(id);
    this.success();
  }
}
module.exports = AdminController;
