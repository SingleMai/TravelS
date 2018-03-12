'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const util = require('../core/utils');
const filePath = path.join(__dirname, '../../app/public/servies');

class ServiesService extends Service {
  async create(values) {
    const result = await this.ctx.model.Servies.create(values);
    return result;
  }

  async getList({ limit, offset }) {
    const { ctx, service } = this;
    const result = await ctx.model.Servies.findAll({
      raw: true,
      limit,
      offset,
      order: [['time', 'DESC']],
      attributes: ['id', 'title', 'price', 'views', 'likes', 'time', ['shop_id', 'shopId'],
        ['head_img', 'headImg'],
        ['type_id', 'typeId']],
    });
    for (let item of result) {
      item = util.toPath('headImg', 'public/servies', item);
      const userId = await ctx.model.UserShop.findOne({ where: { id: item.shopId } });
      const user = await service.users.getOne(userId.user_id);
      Object.assign(item, { user });
    }
    return result;
  }

  async getOne(id) {
    const { ctx, service } = this;
    let result = await ctx.model.Servies.findOne({
      raw: true,
      where: {
        id,
      },
      attributes: ['id', ['shop_id', 'shopId'], ['head_img', 'headImg'],
        'title', 'content', 'price', ['type_id', 'type'],
        'views', 'likes', 'time'],
    });
    const shopId = await service.userShop._getOne(result.shopId);
    const comments = await service.serviesComment.getList(result.id);
    let user = await service.users.getOne(shopId.id);
    user = util.toPath('head', 'public/avator', user);
    Object.assign(result, { user });
    Object.assign(result, { comments });
    result = util.toPath('headImg', 'public/servies', result);
    return result;
  }

  async getServiesByUser(shopId) {
    const result = this.ctx.model.Servies.findAll({
      raw: true,
      where: {
        shop_id: shopId,
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

  async del(id) {
    const servies = await this.service.servies.getOne(id);
    if (servies === null) return;
    const headImg = servies.get('headImg');
    const content = servies.get('content');
    try {
      fs.unlinkSync(`${filePath}${path.sep}${headImg}`);// 还需要处理富文本中的图片
      console.log(content);
    } catch (err) {
      console.log('删除服务时，文件删除失败');
      console.log(err);
    }
    servies.destroy();
  }

  async addContentImg(name) {
    return this.ctx.model.ServiesImg.create({
      servies_img: name,
      time: new Date(),
    });
  }
}

module.exports = ServiesService;
