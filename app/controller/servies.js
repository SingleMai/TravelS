'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const { isPic, getDateTime, toPath } = require('../core/utils');
const path = require('path');
const fs = require('fs');

class ServiesController extends Controller {
  // GET /api/servies
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
      query: { type: 'string', required: false }
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    let { limit, offset, query } = ctx.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    const result = await service.servies.getList({
      limit,
      offset,
      query
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
      type: 'string',
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
      type: data.type,
      shop_id: ctx.user.id,
      views: 0,
      likes: 0,
      time: new Date(),
    };
    const result = await service.servies.create(values);
    const filePath = path.join(__dirname, '../../app/public/servies');
    const writeStream = fs.createWriteStream(`${filePath}${path.sep}${name}`);
    await awaitWriteStream(stream.pipe(writeStream));
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
      type: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id, title, content, price, type } = ctx.request.body;
    try {
      const result = await service.servies.update(id, {
        title,
        content,
        price,
        type,
      });
      this.success(result);
    } catch (err) {
      this.error(errCode.NOT_FOUND);
    }
  }
  // PUT /api/servies/headImg
  async updateHeadImg() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
    if (!isPic(stream)) { // 判断是否图片类型
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      this.error(errCode.FILES_TYPE_INVALID);
    }
    const rule = {
      id: 'string',
    };
    try {
      ctx.validate(rule, stream.fields);
    } catch (err) {
      await sendToWormhole(stream);
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = stream.fields;
    const result = await service.servies.getOne(parseInt(id));
    if (result === null) {
      await sendToWormhole(stream);
      this.error(errCode.NOT_FOUND);
    }
    const filePath = path.join(__dirname, '../../app/public/servies');
    const writeStream = fs.createWriteStream(`${filePath}${path.sep}${name}`);
    await awaitWriteStream(stream.pipe(writeStream));
    const oldFile = result.get('headImg');
    try {
      fs.unlinkSync(`${filePath}${path.sep}${oldFile}`);
    } catch (err) {
      // 删除文件失败仅记录，不停止当前进程
      console.log(err);
    }
    result.set('head_img', name);
    // TODO返回url
    await result.save();
    this.success(name);
  }
  // DELETE /api/servie
  async del() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.request.body;
    await service.servies.del(id);
    this.success();
  }
  // POST /api/servies/img
  async addContentImg() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
    if (!isPic(stream)) { // 判断是否图片类型
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      this.error(errCode.FILES_TYPE_INVALID);
    }
    const filePath = path.join(__dirname, '../../app/public/servies');
    let file = await service.servies.addContentImg(name);
    const writeStream = fs.createWriteStream(`${filePath}${path.sep}${name}`);
    await awaitWriteStream(stream.pipe(writeStream));
    file = toPath('servies_img', 'public/servies', file);
    this.success(file);
  }
}
module.exports = ServiesController;
