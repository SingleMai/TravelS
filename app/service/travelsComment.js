'use strict';
const Service = require('egg').Service;

class TravelsCommentService extends Service {
  async getList(travelsId) {
    const { ctx, service } = this;
    const comments = await ctx.model.TravelsComment.findAll({
      raw: true,
      attributes: ['id', 'content', 'commenter', 'replyer', 'time'],
      order: [['time', 'DESC']],
      // limit,
      // offset,
      where: {
        travel_id: travelsId,
      },
    });
    const result = [];
    for (const comment of comments) {
      const commenter = await service.users._getIdName(comment.commenter);
      comment.commenter = commenter;
      if (comment.replyer) {
        const replyer = await service.users._getIdName(comment.replyer);
        comment.replyer = replyer;
      } else {
        comment.replyer = {};
      }
      result.push(comment);
    }
    return result;
  }

  async getOne(id) {
    const { ctx, service } = this;
    const result = await ctx.model.TravelsComment.findOne({
      raw: true,
      where: {
        id,
      },
    });
    if (result === null) return null;
    const commenter = await service.users._getIdName(result.commenter);
    result.commenter = commenter;
    if (result.replyer) {
      const replyer = await service.users._getIdName(result.replyer);
      result.replyer = replyer;
    } else {
      result.replyer = {};
    }
    return result;
  }

  // 创建travesl圈评论
  async create(values) {
    const comment = await this.ctx.model.TravelsComment.create(Object.assign({}, values, {
      time: new Date(),
    }));
    return comment;
  }

  // 删除travels圈评论
  async del(id) {
    const comment = await this.ctx.model.TravelsComment.findOne({
      where: {
        id,
      },
    });
    if (comment === null) return;
    comment.destroy();
    return;
  }
}

module.exports = TravelsCommentService;
