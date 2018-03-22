'use strict';

const Service = require('egg').Service;
const util = require('../core/utils');
const errCode = require('../core/errCode');
const jwt = require('../tools/jwt.js');

class UsersService extends Service {
  // 通过邮件的方式获取token
  * getToken($this, email) {
    let result = yield this.ctx.model.Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        head: 'default_avator.jpg',
        name: util.randomString(10),
        email,
        has_shop: 0,
        time: new Date()
      },
    });
    // if (result === null) $this.error(errCode.EMAIL_ERROR);
    result = result[0].toJSON()
    result = util.toPath('head', 'public/avator', result);
    const token = jwt.sign(this.app.config, result);
    console.log(token);
    // yield this.ctx.$email.sendEmail({
    //   to: email,
    //   subject: 'Travels 登录验证码',
    //   html: `<h4>您本次登录的验证码为:${token}</h4>`,
    // });
  }

  // 登录操作
  * login($this, email, token) {
    try {
      const origDate = yield jwt.verify(this.app.config, token);
      if (origDate.email !== email) {
        $this.error(errCode.LOGIN_ERROR);
      }
      return origDate;
    } catch (err) {
      $this.error(errCode.LOGIN_ERROR, err);
    }
  }

  * updateLogin($this) {
    const { ctx } = this;
    let user = yield ctx.model.Users.findOne({
      raw: true,
      attributes: ['id', 'name', 'email', 'head', 'sex'],
      where: {
        id: ctx.user.id,
      },
    });
    // 用户已经被删除，该用户不能再登录
    if (user === null) $this.error(errCode.LOGIN_ERROR);
    user = util.toPath('head', 'public/avator', user);
    const token = jwt.sign(this.app.config, user);
    return { token, user };
  }

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
    for (let user of users) {
      user = util.toPath('head', 'public/avator', user)
    }
    return users;
  }

  async getOneMsg({ travelsLimit, travelsOffset, id }) {
    const { ctx, service } = this;
    const user = await service.users.getOne(id);
    // user = util.toPath('head', 'public/avator', user);
    // 组装发布服务
    let shopId = await ctx.model.UserShop.findOne({
      where: {
        user_id: user.id,
      },
    });
    if (shopId !== null) {
      shopId = shopId.id;
      const servies = await service.servies.getServiesByUser(shopId);
      Object.assign(user, { servies });
    } else {
      Object.assign(user, { servies: [] });
    }
    // 组装旅途
    const travels = await service.travels.getList({
      offset: travelsOffset,
      limit: travelsLimit,
      where: {
        id: user.id,
      },
    });
    Object.assign(user, { travels });
    return user;
  }

  async getOne(id) {
    let user = await this.ctx.model.Users.findOne({
      raw: true,
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
    user = util.toPath('head', 'public/avator', user);
    return user;
  }

  async getInstroduction(id) {
    const user = await this.ctx.model.Users.findOne({
      attributes: ['instroduction'],
      where: { id },
    });
    return user.instroduction;
  }

  async _getList() {
    const users = await this.ctx.model.Users.findAll({
      attributes: ['id', 'head', 'name', 'sex',
        ['has_id_card', 'hasIdCard'],
        ['has_edu_card', 'hasEduCard'],
        ['has_guide_card', 'hasGuideCard'],
        ['has_drive_card', 'hasDriveCard'],
        ['has_shop', 'hasShop'],
        'time'],
    });
    for (let user of users) {
      user = util.toPath('head', 'public/avator', user)
    }
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

  async getCard(user_id) {
    const result = await this.ctx.model.UserCard.findAll({
      raw: true,
      order: [['time', 'DESC']],
      attributes: ['id', ['card_img', 'cardImg'], 'status', 'type'],
      where: {
        user_id,
      },
    });
    return result;
  }

  async getUserCard(id) {
    const result = await this.ctx.model.UserCard.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async checkCard(id, status) {
    const data = await this.ctx.model.UserCard.findOne({
      where: {
        id,
      },
    });
    if (data === null) {
      throw new Error('usercard not found');
    }
    data.status = status;
    data.save();
    return data;
  }

  async changeInvalidUsers(id, values) {
    const data = await this.ctx.model.Users.update(values, {
      where: {
        id,
      },
      fields: ['instroduction', 'job', 'city', 'school'],
    });
    return data;
  }
}

module.exports = UsersService;
