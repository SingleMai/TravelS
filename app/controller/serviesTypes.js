'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class serviesTypesController extends Controller {
  // GET /api/servies/type
  async getRealtions() {
    const { service } = this;
    const result = await service.serviesTypes.getRealtions();
    this.success(result);
  }
  // POST /api/servies/type
  async create() {
    const { ctx, service } = this;
    const rule = {
      type: 'string',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { type } = ctx.request.body;
    const result = await service.serviesTypes.create(type);
    this.success(result);
  }
  // DELETE /api/servies/type
  async del() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.request.body;
    await service.serviesTypes.del(id);
    this.success();
  }
}
module.exports = serviesTypesController;
