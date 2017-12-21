'use strict';

const path = require('path');
const Controller = require('../core/baseController');
const sendToWormhole = require('stream-wormhole');

class TravelsController extends Controller {
  // POST /backen/carousel
  async create() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
    if (!isPic(stream)) { // 判断是否图片类型
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      this.error(-3, 'files type invalid');
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
      this.error(-1, 'params invalid/empty');
    }
    this.success();
  }
  // GET api/travels/
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'number',
      offset: 'number',
      useId: { type: 'number', require: false },
    };
    try {
      ctx.validate(rule);
      const { limit, offset, userId } = ctx.request.body;
      const result = await service.travels.getList(limit, offset);
      ctx.success(result);
    } catch (err) {
      this.error(-1, 'params invalid/empty');
    }
  }

}
module.exports = TravelsController;