'use strict';

const Service = require('egg').Service;

class ServiesCommentService extends Service {

  async getList(servies_id) {
    const comments = await this.ctx.model.ServiesComment.findAll({
      raw: true,
      where: {
        servies_id,
      },
      attributes: ['id', 'content', 'starts', 'time'],
    });
    for (const comment of comments) {
      const comment_id = comment.id;
      // TODO 获取评论的图片
      const replay = await this.ctx.model.ServiesReply.findAll({
        raw: true,
        order: [['time', 'DESC']],
        attributes: ['content', 'time'],
        where: {
          comment_id,
        },
      });
      Object.assign(comment, { replay });
    }
    return comments;
  }
  async create(content) {

  }
}

module.exports = ServiesCommentService;
