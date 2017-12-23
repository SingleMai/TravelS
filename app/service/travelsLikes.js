'use strict';

const Service = require('egg').Service;

class TravelsLikesService extends Service {
  // 某一travels圈得到的点赞列表
  async getLikesList(travel_id) {
    const list = await this.ctx.model.TravelsLikes.findAll({
      attributes: [],
      where: {
        travel_id,
      },
      include: [
        {
          model: this.ctx.model.Users,
          attributes: ['id', 'name'],
        },
      ],
    });
    const arr = [];
    for (const item of list) {
      arr.push(item.user);
    }
    return arr;
  }

  async getLikesNum(travel_id) {
    const num = await this.ctx.model.TravelsLikes.count({
      where: {
        travel_id,
      },
    });
    return num;
  }

  async isLikes(travel_id, user_id) {
    const isLikes = await this.ctx.model.TravelsLikes.findOne({
      where: {
        travel_id,
        user_id,
      },
    });
    if (isLikes === null) return false;
    return true;
  }
}

module.exports = TravelsLikesService;