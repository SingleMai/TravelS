'use strict';

const path = require('path');
const fs = require('fs');
const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
const sendToWormhole = require('stream-wormhole');
const { isPic, getDateTime } = require('../core/utils');

class CarouselController extends Controller {
  // POST /backen/carousel
  async create() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
    if (!isPic(stream)) { // 判断是否图片类型
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      this.error(errCode.FILES_TYPE_INVALID);
    }
    const rule = {
      title: { type: 'string', required: false },
      content: { type: 'string', required: false },
      link: 'string',
      weight: 'id',
      site: { type: 'id', required: false },
    };
    try {
      ctx.validate(rule, stream.fields);
    } catch (err) {
      await sendToWormhole(stream);
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const data = stream.fields;
    data.carousel = name;
    data.title = data.title ? data.title : '';
    data.content = data.content ? data.content : '';
    data.site = data.site ? data.site : 1;
    const hadExits = await service.carousel.getCarouselByWeight(data.weight, data.site);
    if (hadExits !== null) {
      await sendToWormhole(stream);
      this.error(errCode.OBJECT_EXITS);
    }
    await service.carousel.create(data);
    const filePath = path.join(__dirname, '../../app/public/carousel');
    fs.writeFileSync(`${filePath}${path.sep}${name}`, stream);
    this.success();
  }
  // DELETE /backen/carousel/:id
  async del() {
    const { ctx, service } = this;
    const paramsRule = {
      id: 'id',
    };
    try {
      ctx.validate(paramsRule, ctx.params);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.params;
    await service.carousel.del(id);
    this.success();
  }

  // GET /api/carousel
  async getBySite() {
    const { ctx, service } = this;
    const rule = {
      site: { type: 'id', required: false },
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const site = ctx.request.body.id ? ctx.request.body.id : 1;
    const data = await service.carousel.getBySite(site);
    this.success(data);
  }
}
module.exports = CarouselController;
