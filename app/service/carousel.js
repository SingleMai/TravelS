'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const util = require('../core/utils');

class CarouselService extends Service {
  // 创建轮播图
  async create(data) {
    return await this.ctx.model.Carousel.create(data);
  }
  // 删除轮播图
  async del(id) {
    const result = await this.ctx.model.Carousel.findOne({
      where: {
        id,
      },
    });
    if (result === null) return;
    const fileName = result.carousel;
    const filePath = path.resolve(__dirname, '../public/carousel');
    fs.unlink(`${filePath}${path.sep}${fileName}`);
    result.destroy();
    return;
  }
  // 查看是否存在weight
  async getCarouselByWeight(weight, site) {
    return await this.ctx.model.Carousel.findOne({
      where: {
        weight,
        site,
      },
    });
  }

  async getBySite(site) {
    let carousels = await this.ctx.model.Carousel.findAll({
      raw: true,
      attributes: ['id', 'title', 'content', 'carousel', 'link', 'weight'],
      order: [['weight', 'DESC']],
      where: {
        site,
      },
    });
    carousels = util.toPath('carousel', 'public/carousel', carousels);
    return carousels;
  }
}

module.exports = CarouselService;
