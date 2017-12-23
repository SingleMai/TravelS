'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');

class TravelsController extends Controller {
  // POST /backen/carousel
  async create() {
  }
  // GET api/travels/
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
      const { limit, offset } = ctx.query;
      const result = await service.travels.getList(parseInt(limit), parseInt(offset));
      this.success(result);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }
  // GET api/travels/:id
  async getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.params);
      const { id } = ctx.params;
      const result = await service.travels.getOne(id);
      this.success(result);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }

}
module.exports = TravelsController;
