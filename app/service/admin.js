'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  // TODO 登录接口
  async token() {
    const admin = await this.ctx.model.Admin.findAll({
    });
    return admin;
  }
  // 获取管理员列表
  async getList() {
    const admins = await this.ctx.model.Admin.findAll({
      attributes: ['id', 'account', 'name', 'permission'],
    });
    return admins;
  }
  // id获取管理员信息
  async getOne(id) {
    const admin = await this.ctx.model.Admin.findOne({
      attributes: ['id', 'account', 'name', 'permission'],
      where: {
        id,
      },
    });
    return admin;
  }
  // 账号获取管理员信息
  async getOneByAccount(account) {
    const admin = await this.ctx.model.Admin.findOne({
      attributes: ['id', 'account'],
      where: {
        account,
      },
    });
    return admin;
  }
  // 创建管理员
  async create(data) {
    return await this.ctx.model.Admin.create(data);
  }
  // 删除管理员信息
  async del(id) {
    return await this.ctx.model.Admin.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = AdminService;
