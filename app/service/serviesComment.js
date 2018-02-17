'use strict';

const Service = require('egg').Service;
const util = require('../core/utils');

class ServiesCommentService extends Service {

  async getList(servies_id) {
    const { ctx, service } = this;
    const comments = await ctx.model.ServiesComment.findAll({
      raw: true,
      where: {
        servies_id,
      },
      attributes: ['id', 'content', ['user_id', 'userId'], 'starts', 'time'],
    });
    for (const comment of comments) {
      const comment_id = comment.id;
      // TODO 获取评论的图片
      const replay = await ctx.model.ServiesReply.findAll({
        raw: true,
        order: [['time', 'DESC']],
        attributes: ['content', 'time'],
        where: {
          comment_id,
        },
      });
      let commenter = await service.users.getOne(comment.userId);
      commenter = util.toPath('head', 'public/avator', commenter);

      Object.assign(comment, { commenter });
      Object.assign(comment, { replay });
    }
    return comments;
  }
  async create(content) {

  }
}

module.exports = ServiesCommentService;
