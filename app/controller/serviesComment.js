'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class serviesCommentController extends Controller {
  // GET /api/servie/comment/:serviesId
  async getList() {
    const { ctx, service } = this;
    const rule = {
      serviesId: 'id',
    };
    try {
      ctx.validate(rule, ctx.params);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    let { serviesId } = ctx.params;
    serviesId = parseInt(serviesId);
    const result = await service.serviesComment.getList(serviesId);
    this.success(result);
  }
}
module.exports = serviesCommentController;
