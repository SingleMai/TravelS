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

  async getList(limit, offset) {
    const users = await this.ctx.model.Users.findAll({
      attributes: ['id', 'head', 'name', 'sex',
        ['has_id_card', 'hasIdCard'],
        ['has_edu_card', 'hasEduCard'],
        ['has_guide_card', 'hasGuideCard'],
        ['has_drive_card', 'hasDriveCard'],
        'time'],
      limit,
      offset,
      where: {
        has_shop: 1, // 首页推荐的都是有服务提供的人
      },
    });
    return users;
  }

  async getOne(id) {
    const user = await this.ctx.model.Users.findOne({
      attributes: ['id', 'head', 'name', 'sex', 'instroduction',
        'job', 'city',
        ['has_id_card', 'hasIdCard'],
        ['has_edu_card', 'hasEduCard'],
        ['has_guide_card', 'hasGuideCard'],
        ['has_drive_card', 'hasDriveCard'],
        ['has_shop', 'hasShop'],
        'time'],
      where: { id },
    });
    return user;
  }

  async getInstroduction(id) {
    const user = await this.ctx.model.Users.findOne({
      attributes: ['instroduction'],
      where: { id },
    });
    return user.instroduction;
  }

  async _getList(limit, offset) {
    const users = await this.ctx.model.Users.findAll({
      attributes: ['id', 'head', 'name', 'sex',
        ['has_id_card', 'hasIdCard'],
        ['has_edu_card', 'hasEduCard'],
        ['has_guide_card', 'hasGuideCard'],
        ['has_drive_card', 'hasDriveCard'],
        ['has_shop', 'hasShop'],
        'time'],
      limit,
      offset,
    });
    return users;
  }

  async _getOne(id) { // TODO
    const user = await this.ctx.model.Users.findOne({
      where: { id },
    });
    return user;
  }
}

module.exports = UsersService;
