'use strict';

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
const { isPic, getDateTime } = require('../core/utils');

const filePath = path.join(__dirname, '../../app/public/servies-comment');

class OrdersController extends Controller {
  // 获取用户预订未支付的订单
  async getUserBookOrders () {
    const { service } = this;
    const result = await service.orders.getUserBookOrders();
    this.success(result);
  }

  // POST /api/orders // TODO 待接入支付状态
  async create() {
    const { ctx, service } = this;
    const rule = {
      serviesId: 'number',
      num: 'number',
      travelTime: 'date',
      count: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { serviesId, num, travelTime, count } = ctx.request.body;
    try {
      const result = await service.orders.create({
        servies_id: serviesId,
        buyer_id: ctx.user.id,
        time: new Date(),
        status: 0,
        num,
        count,
        travel_time: travelTime,
      });
      this.success(result);
    } catch (err) {
      console.log(err);
      this.error(errCode.INTERNAL_SERVER_ERROR);
    }
  }
  // PUT /api/orders/cancel
  async cancel () {
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
    const result = await service.orders.cancel(id);
    this.success(result);
  }
  // PUT /api/orders/pay
  async pay() {
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
    const result = await service.orders.pay(id);
    this.success(result);
  }
  // PUT /api/orders/confirm
  async confirm() {
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
    const result = await service.orders.confirm(id);
    this.success(result);
  }
  // PUT /api/orders/reject
  async reject() {
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
    const result = await service.orders.reject(id);
    this.success(result);
  }
  // PUT /api/orders/success
  async successed() {
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
    const result = await service.orders.successed(id);
    this.success(result);
  }
  // POST /api/orders/comment //TODO 需要更多细节敲定
  async createComment() {
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
        if (stream.fieldname !== 'serviesCommentImg') {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(stream);
          this.error(errCode.PARAMS_INVALID_EMPTY);
        }
        try {
          const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
          fs.writeFileSync(`${filePath}${path.sep}${name}`, stream);
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
      serviesId: { type: 'number', required: true },
      content: { type: 'string', required: false },
      starts: { type: 'number', required: true },
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
    const serviesComment = await service.serviesComment.create(content);
    const serviesCommentId = serviesComment.id;
    if (files.length) {
      // 如果有文件上传， 还需进行文件数据库的操作
      for (let i = 0; i < files.length; i++) {
        await service.serviesCommentImg.create(files[i], i, serviesCommentId);
      }
    }
    this.success(serviesCommentId);
  }
}
module.exports = OrdersController;
