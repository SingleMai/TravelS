'use strict';

const Service = require('egg').Service;

class TravelsService extends Service {
  async getList(limit, offset) {
    const types = await this.ctx.model.Travels.findAll({
      limit,
      offset,
    });
    return types;
  }
}

module.exports = TravelsService;
