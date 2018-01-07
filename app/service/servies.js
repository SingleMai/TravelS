'use strict';

const Service = require('egg').Service;

class ServiesService extends Service {
  async getList({ limit, offset }) {
    const result = this.ctx.model.Servies.findAll({
      limit,
      offset,
      order: [['time', 'DESC']],
      attributes: ['id', 'title', 'price', 'views', 'likes', 'time',
        ['head_img', 'headImg'],
        ['type_id', 'typeId']],
    });
    return result;
  }

  async getTypes() {
    const types = await this.ctx.model.ServiesTypes.findAll({
    });
    return types;
  }
}

module.exports = ServiesService;
