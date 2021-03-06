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
      if (item === null || item.user === null) continue;
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

  // 点赞操作
  async create(value) {
    const { ctx } = this;
    const result = await ctx.model.TravelsLikes.findOrCreate({
      where: {
        travel_id: value.travel_id,
        user_id: ctx.user.id,
      },
      defaults: {
        travel_id: value.travel_id,
        user_id: ctx.user.id,
      },
    });
    return result[0];
  }
  // 取消点赞
  async del(id) {
    const like = await this.ctx.model.TravelsLikes.findOne({
      where: {
        id,
      },
    });
    if (like === null) return;
    like.destroy();
    return;
  }
}

module.exports = TravelsLikesService;
