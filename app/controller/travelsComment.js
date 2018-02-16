'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');

class TravelsCommentController extends Controller {
  // GET /api/travels/comments
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
      travelsId: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
      const { limit, offset, travelsId } = ctx.query;
      const result = await service.travelsComment.getList(parseInt(limit), parseInt(offset), parseInt(travelsId));
      this.success(result);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }

  // GET /api/travels/comment
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
    const { id } = ctx.query;
    const result = await service.travelsComment.getOne(parseInt(id));
    if (result === null) {
      this.error(errCode.NOT_FOUND);
    }
    this.success(result);
  }

  //  POST /api/travels/comment
  async create() {
    const { ctx, service } = this;
    const rule = {
      travelId: 'number',
      content: 'string',
      replayId: { type: 'number', required: false },
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { content, replyId, travelId } = ctx.request.body;
    const data = {
      travel_id: travelId,
      commenter: 1, // TODO获取当前用户的id
      content,
    }
    if (replyId) Object.assign(data, { replyer: replyId })
    const result = await service.travelsComment.create(data);
    this.success(result);
  }

  // DELETE /api/travels/comment
  async del() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
    };
    try {
      ctx.validate(rule);
      const { id } = ctx.request.body;
      const result = await service.travelsComment.del(id);
      this.success(result);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
  }
}

module.exports = TravelsCommentController;

