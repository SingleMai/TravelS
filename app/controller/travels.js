'use strict';

const Controller = require('../core/baseController');

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
      this.error(-1, 'params invalid/empty');
    }
  }
  // GET api/travels/:id
  async getOne() {
    
  }

}
module.exports = TravelsController;
