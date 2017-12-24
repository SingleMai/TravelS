'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');

class TravelsCommentController extends Controller {
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
      travelsId: 'id',
    };
    // try {
      // ctx.validate(rule, ctx.query);
      const { limit, offset, travelsId } = ctx.query;
      console.log(ctx.query);
      const result = await service.travels.getList(parseInt(limit), parseInt(offset), parseInt(travelsId));
      this.success(result);
    // } catch (err) {
      // this.error(errCode.PARAMS_INVALID_EMPTY);
    // }
  }
}

module.exports = TravelsCommentController;

