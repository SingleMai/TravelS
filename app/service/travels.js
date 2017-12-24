'use strict';

const Service = require('egg').Service;
const { arrObj2Arr } = require('../core/utils');

class TravelsService extends Service {
  async create(content) {
    const result = await this.ctx.model.Travels.create({
      user_id: 1, // TODO 接入用户id
      content,
      views: 0,
      time: new Date()
    });
    return result;
  }

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
      const isLike = await this.ctx.service.travelsLikes.isLikes(travelsId, 1);// TODO: 接入用户的id
      if (!oriImgs) continue;
      const Imgs = arrObj2Arr(oriImgs, 'img');
      Object.assign(travel, { imgs: Imgs });
      Object.assign(travel, { likes });
      Object.assign(travel, { isLike });
      result.push(travel);
    }
    return result;
  }

  async getOne(id) {
    let travel = await this.ctx.model.Travels.findOne({
      attributes: ['id', 'content', 'views', 'time'],
      where: {
        id,
      },
      include: [{
        model: this.ctx.model.Users,
        attributes: ['id', 'name', 'head'],
      }],
    });
    travel = travel.toJSON();
    const oriImgs = await this.ctx.service.travelsImg.getTravelsImg(id);
    const isLike = await this.ctx.service.travelsLikes.isLikes(id, 1);// TODO: 接入用户的id
    const likes = await this.ctx.service.travelsLikes.getLikesList(id);
    const Imgs = arrObj2Arr(oriImgs, 'img');
    Object.assign(travel, { imgs: Imgs });
    Object.assign(travel, { likes });
    Object.assign(travel, { isLike });
    return travel;
  }
}

module.exports = TravelsService;
