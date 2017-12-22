'use strict';

const Service = require('egg').Service;

class TravelsLikesService extends Service {
  async getLikesNum(travels_id) {
    const num = await this.ctx.model.TravelsLikes.count({
      where: {
        travels_id,
      },
    });
    return num;
  }

  async isLikes(travels_id, user_id) {
    const isLikes = await this.ctx.model.TravelsLikes.findOne({
      where: {
        travels_id,
        user_id,
      },
    });
    if (isLikes === null) return false;
    return true;
  }
}

module.exports = TravelsLikesService;