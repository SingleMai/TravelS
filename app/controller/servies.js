'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
const sendToWormhole = require('stream-wormhole');
const { isPic, getDateTime } = require('../core/utils');
const path = require('path');
const fs = require('fs');

class ServiesController extends Controller {
  // GET /api/servies
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    let { limit, offset } = ctx.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    const result = await service.servies.getList({
      limit,
      offset,
    });
    this.success(result);
  }
  // GET /api/servie
  async getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    let { id } = ctx.query;
    id = parseInt(id);
    const result = await service.servies.getOne(id);
    if (result === null) {
      this.error(errCode.NOT_FOUND);
    }
    this.success(result);
  }
  // POST /api/servie
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
      title: 'string',
      content: 'string',
      price: 'string',
      typeId: 'string',
    };
    try {
      ctx.validate(rule, stream.fields);
    } catch (err) {
      await sendToWormhole(stream);
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const data = stream.fields;
    const values = {
      head_img: name,
      title: data.title,
      content: data.content,
      price: parseFloat(data.price),
      type_id: parseInt(data.typeId),
      shop_id: 1, // TODO 待登录态写入真实数据
      views: 0,
      likes: 0,
      time: new Date(),
    };
    const result = await service.servies.create(values);
    const filePath = path.join(__dirname, '../../app/public/servies');
    fs.writeFileSync(`${filePath}${path.sep}${name}`, stream);
    this.success(result);
  }
  // PUT /api/servie
  async update() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
      title: 'string',
      content: 'string',
      price: 'number',
      typeId: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id, title, content, price, typeId } = ctx.request.body;
    try {
      const result = await service.servies.update(id, {
        title,
        content,
        price,
        type_id: typeId,
      });
      this.success(result);
    } catch (err) {
      this.error(errCode.NOT_FOUND);
    }
  }
}
module.exports = ServiesController;
