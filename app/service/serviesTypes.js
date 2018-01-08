'use strict';

const Service = require('egg').Service;

class ServiesTypesService extends Service {

  async getRealtions() {
    const result = {};
    const data = await this.ctx.model.ServiesTypes.findAll({
      raw: true,
    });
    for (const item of data) {
      Object.assign(result, { [item.id]: item.name });
    }
    return result;
  }

  async create(type) {
    const data = await this.ctx.model.ServiesTypes.findOrCreate({
      where: {
        name: type,
      },
      defaults: {
        name: type,
      },
    });
    return data[0];
  }

  async del(id) {
    const data = await this.ctx.model.ServiesTypes.findOne({ where: { id } });
    if (data === null) return;
    data.destroy();
    return;
  }
}

module.exports = ServiesTypesService;
