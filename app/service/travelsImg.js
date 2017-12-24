'use strict';

const Service = require('egg').Service;

class TravelsImgService extends Service {
  async getTravelsImg(travels_id) {
    const imgs = await this.ctx.model.TravelsImg.findAll({
      raw: true,
      attributes: ['id', ['travels_img', 'img']],
      order: [['order', 'DESC']],
      where: {
        travels_id,
      },
    });
    return imgs;
  }

  async create(travels_img, order, travels_id) {
    const img = await this.ctx.model.TravelsImg.create({
      travels_id,
      travels_img,
      order,
      time: new Date(),
    });
    return img;
  }
}

module.exports = TravelsImgService;
