'use strict';

const Service = require('egg').Service;


class TravelsComment extends Service {
  async getList(limit, offset, travelsId) {
    const comments = await this.ctx.model.TravelsComment.findAll({
    });
    return comments;
  }
}

module.exports = TravelsComment;
