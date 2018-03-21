'use strict';

const path = require('path');
const fs = require('fs');
const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const { isPic, getDateTime } = require('../core/utils');

const filePath = path.join(__dirname, '../../app/public/travelImg');

class TravelsController extends Controller {
  // GET api/travels/
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
      let { limit, offset } = ctx.query;
      limit = parseInt(limit);
      offset = parseInt(offset);
      const result = await service.travels.getList({ limit, offset });
      this.success(result);
    } catch (err) {
      console.log(err);
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }

  async getOneList() {
    const { ctx, service } = this;
    const rule = {
      offset: 'string',
      limit: 'string',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    let { offset, limit } = ctx.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    const travels = await service.travels.getList({
      offset,
      limit,
      where: {
        id: ctx.user.id,
      },
    });
    this.success(travels);
  }
  // GET api/travels/:id
  async getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.request.query);
      const { id } = ctx.request.query;
      const result = await service.travels.getOne(parseInt(id));
      this.success(result);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }
  // POST /api/travels
  async create() {
    const { ctx, service } = this;
    const streams = ctx.multipart();
    // 先将所有字段内容提取出来，并对文件进行处理
    // 避免文件流导致浏览器卡死
    // streams() return a promise
    let stream;
    const filed = {};
    const files = [];
    // TODO 考虑封装进中间件或函数进行文件统一处理
    while ((stream = await streams()) != null) {
      if (stream.length) {
        // 如果是数组的话是 filed文本内容
        Object.assign(filed, {
          [stream[0]]: stream[1],
        });
      } else {
        if (!stream.filename) {
          // 这时是用户没有选择文件就点击了上传(stream 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(stream);
          this.error(errCode.HAVENT_CHOOSE_FILES);
          return;
        }
        // stream 是上传的文件流
        if (!isPic(stream)) { // 判断是否图片类型
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(stream);
          this.error(errCode.FILES_TYPE_INVALID);
        }
        if (stream.fieldname !== 'travelImg') {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(stream);
          this.error(errCode.PARAMS_INVALID_EMPTY);
        }
        try {
          const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
          const writeStream = fs.createWriteStream(`${filePath}${path.sep}${name}`);
          await awaitWriteStream(stream.pipe(writeStream));
          await sendToWormhole(stream);
          files.push(name);
        } catch (err) {
          // 写入文件未知错误
          await sendToWormhole(stream);
          this.error(errCode.SAVE_FILES_ERROR);
        }
      }
    }
    const rule = {
      content: { type: 'string', required: false },
    };
    // 先验证content字符串是否正确
    try {
      ctx.validate(rule, filed);
    } catch (err) {
      // 如果有上传文件，需将文件删除
      for (const item of files) {
        fs.unlink(`${filePath}${path.sep}${item}`);
      }
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    // 再验证travelImg或content至少有一个
    const content = filed.content ? filed.content : '';
    // 这里的错误不会被没有上传文件的请求触发，所以不需要对文件进行处理
    if (!(content || files.length)) this.error(errCode.PARAMS_INVALID_EMPTY);
    // 先创建一条记录,获取id
    const travel = await service.travels.create(content);
    const travelId = travel.id;
    if (files.length) {
      // 如果有文件上传， 还需进行文件数据库的操作
      for (let i = 0; i < files.length; i++) {
        await service.travelsImg.create(files[i], i, travelId);
      }
    }
    this.success(travelId);
  }

  // DELETE /api/travel
  async del() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
    };
    try {
      ctx.validate(rule);
      const { id } = ctx.request.body;
      await service.travels.del(id);
      this.success();
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }
}
module.exports = TravelsController;
