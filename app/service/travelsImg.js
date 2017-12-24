'use strict';

const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;

const filePath = path.join(__dirname, '../../app/public/travelImg');

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

  async del(travels_id) {
    const imgs = await this.ctx.model.TravelsImg.findAll({
      where: {
        travels_id,
      },
    });
    for (const img of imgs) {
      const fileName = img.travels_img;
      fs.unlink(`${filePath}${path.sep}${fileName}`);
      img.destroy();
    }
    return;
  }
}

module.exports = TravelsImgService;
