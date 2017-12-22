'use strict';

const Service = require('egg').Service;
const { arrObjToArr } = require('../core/utils');

class TravelsService extends Service {
  async getList(limit, offset) {
    const travels = await this.ctx.model.Travels.findAll({
      limit,
      offset,
      include: [{
        model: this.ctx.model.Users,
        attributes: ['id', 'name', 'head'],
      }],
    });
    const result = [];
    for (let travel of travels) {
      travel = travel.toJSON();
      const travelsId = travel.id;
      const oriImgs = await this.ctx.service.travelsImg.getTravelsImg(travelsId);
      const likes = await this.ctx.service.travelsLikes.getLikesNum(travelsId);
      const isLike = await this.ctx.service.travelsLikes.isLikes(travelsId, 1);
      if (!oriImgs) continue;
      const Imgs = arrObjToArr(oriImgs, 'img');
      travel.img = Imgs;
      travel.likes = likes;
      travel.isLike = isLike;
      result.push(travel);
    }
    return result;
  }
}

module.exports = TravelsService;
