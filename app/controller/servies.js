'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class ServiesController extends Controller {
  // GET /api/servies
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
    let { limit, offset } = ctx.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    const result = await service.servies.getList({
      limit,
      offset,
    });
    this.success(result);
  }
  // GET /api/servie
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
    let { id } = ctx.query;
    id = parseInt(id);
    const result = await service.servies.getOne(id);
    if (result === null) {
      this.error(errCode.NOT_FOUND);
    }
    this.success(result);
  }
}
module.exports = ServiesController;
