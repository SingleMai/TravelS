'use strict';

const Service = require('egg').Service;
const { arrObj2Arr } = require('../core/utils');
const util = require('../core/utils');

class TravelsService extends Service {
  async create(content) {
    const { ctx } = this;
    const result = await ctx.model.Travels.create({
      user_id: ctx.user.id,
      content,
      views: 0,
      time: new Date(),
    });
    return result;
  }

  async getList({ limit, offset, where }) {
    const { ctx } = this;
    const sqlData = {
      limit,
      offset,
      include: [{
        model: ctx.model.Users,
        attributes: ['id', 'name', 'head'],
      }],
    };
    if (where) Object.assign(sqlData, { where });
    const travels = await ctx.model.Travels.findAll(sqlData);
    const result = [];
    for (let travel of travels) {
      travel = travel.toJSON();
      const travelsId = travel.id;
      let oriImgs = await ctx.service.travelsImg.getTravelsImg(travelsId);
      const likes = await ctx.service.travelsLikes.getLikesList(travelsId);
      const comments = await ctx.service.travelsComment.getList(travelsId);
      // const isLike = await ctx.service.travelsLikes.isLikes(travelsId, ctx.user.id);
      oriImgs = util.toPath('img', 'public/travelImg', oriImgs);
      const Imgs = arrObj2Arr(oriImgs, 'img');
      const user = util.toPath('head', 'public/avator', travel.user);
      Object.assign(travel, { user });
      Object.assign(travel, { imgs: Imgs });
      Object.assign(travel, { likes });
      // Object.assign(travel, { isLike });
      Object.assign(travel, { comments });
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
    let oriImgs = await this.ctx.service.travelsImg.getTravelsImg(id);
    const comments = await this.ctx.service.travelsComment.getList(id);
    const isLike = await this.ctx.service.travelsLikes.isLikes(id, 1);// TODO: 接入用户的id
    const likes = await this.ctx.service.travelsLikes.getLikesList(id);
    oriImgs = util.toPath('img', 'public/travelImg', oriImgs);
    const Imgs = arrObj2Arr(oriImgs, 'img');
    Object.assign(travel, { imgs: Imgs });
    Object.assign(travel, { likes });
    Object.assign(travel, { isLike });
    Object.assign(travel, { comments });
    return travel;
  }

  async del(id) {
    const { ctx, service } = this;
    const result = await ctx.model.Travels.findOne({
      where: {
        id,
      },
    });
    if (result === null) return;
    // 删除图片
    await service.travelsImg.del(id);
    // TODO:删除评论
    // TODO:删除点赞
    result.destroy();
    return;
  }
}

module.exports = TravelsService;
