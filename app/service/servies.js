'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../app/public/servies');

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
