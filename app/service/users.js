'use strict';

const Service = require('egg').Service;

class UsersService extends Service {

  async _getIdName(id) {
    const users = await this.ctx.model.Users.findOne({
      raw: true,
      attributes: ['id', 'name'],
      where: {
        id,
      },
    });
    return users;
  }
}

module.exports = UsersService;
