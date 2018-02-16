'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');

class TravelsLikesController extends Controller {
  //  POST /api/travels/likes
  async create() {
    const { ctx, service } = this;
    const rule = {
      travelId: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { travelId } = ctx.request.body;
    const result = await service.travelsLikes.create({
      travel_id: travelId,
    });
    this.success(result);
  }

  // DELETE /api/travels/likes
  async del() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
    };
    try {
      ctx.validate(rule);
      const { id } = ctx.request.body;
      const result = await service.travelsLikes.del(id);
      this.success(result);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }
}

module.exports = TravelsLikesController;

