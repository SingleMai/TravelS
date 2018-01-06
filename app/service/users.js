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

  async updateUser(id, values) {
    const keys = [];
    for (const value in values) {
      if (values[value]) {
        keys.push(value);
      }
    }
    const user = await this.ctx.model.Users.update(values, {
      where: {
        id,
      },
      fields: keys,
    });
    return user;
  }

  async getServiesLikes(user_id, { offset, limit }) {
    const orign = await this.ctx.model.UserLikes.findAll({
      raw: true,
      limit,
      offset,
      order: [['time', 'DESC']],
      attributes: ['id', ['user_id', 'userId'], ['servies_id', 'serviesId']],
      where: {
        user_id,
      },
    });
    const result = [];
    for (const item of orign) {
      if (item === null) return;
      const servies = await this.ctx.model.Servies.findOne({
        raw: true,
        attributes: [['head_img', 'headImg'], 'title', 'price', 'type_id', 'views', 'likes', 'time'],
        where: {
          id: item.serviesId,
        },
      });
      result.push(Object.assign({ id: item.id }, servies));
    }
    return result;
  }

  async createServiesLikes(userId, serviesId) {
    const result = await this.ctx.model.UserLikes.findOrCreate({
      where: {
        user_id: userId,
        servies_id: serviesId,
      },
      defaults: {
        user_id: userId,
        servies_id: serviesId,
        time: new Date(),
      },
    });
    return result[0];
  }

  async delServiesLikes(id) {
    const data = await this.ctx.model.UserLikes.findOne({
      where: {
        id,
      },
    });
    if (data === null) {
      return;
    }
    data.destroy();
  }
}

module.exports = UsersService;
