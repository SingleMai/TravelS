'use strict';

const Service = require('egg').Service;

class UserShopService extends Service {
  // 开启商店操作
  // TODO未接入支付操作
  async create(user_id) {
    const result = await this.ctx.model.UserShop.findOrCreate({
      where: {
        user_id,
      },
      defaults: {
        user_id,
        status: 1,
        time: new Date(),
      },
    });
    return result[0];
  }

  async _getOne(id) {
    const result = await this.ctx.model.UserShop.findOne({
      raw: true,
      where: {
        id,
      },
    });
    return result;
  }
}

module.exports = UserShopService;
