'use strict';

const Service = require('egg').Service;

class ServiesService extends Service {
  async getTypes() {
    const types = await this.ctx.model.ServiesTypes.findAll({
    });
    return types;
  }
}

module.exports = ServiesService;
