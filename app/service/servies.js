'use strict';

const Service = require('egg').Service;

class ServiesService extends Service {
  async create(values) {
    const result = await this.ctx.model.Servies.create(values);
    return result;
  }

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

  async getOne(id) {
    const result = this.ctx.model.Servies.findOne({
      raw: true,
      where: {
        id,
      },
      attributes: ['id', ['head_img', 'headImg'],
        'title', 'content', 'price', ['type_id', 'type'],
        'views', 'likes', 'time'],
    });
    return result;
  }

  async getTypes() {
    const types = await this.ctx.model.ServiesTypes.findAll({});
    return types;
  }

  async update(id, values) {
    const data = await this.ctx.model.Servies.update(values, {
      where: { id },
      fileds: ['title', 'content', 'price', 'typeId'],
    });
    return data;
  }
}

module.exports = ServiesService;
