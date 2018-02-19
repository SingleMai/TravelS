'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class ChatHistoryController extends Controller {
  // GET /api/chat
  async getOneChat() {
    const { service } = this;
    const data = await service.chatHistory.getOneChat();
    if (data === null) {
      this.error(errCode.NOT_FOUND);
    } else {
      this.success(data);
    }
  }

  async getOneChatByOne() {
    const { ctx, service } = this;
    const rule = {
      friendId: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    let { friendId } = ctx.query;
    friendId = parseInt(friendId);
    const result = await service.chatHistory.getOneChatByOne({
      friendId,
    });
    this.success(result);
  }
  // POST /api/chat
  async create() {
    const { ctx, service } = this;
    const rule = {
      friendId: 'number',
      message: 'string',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { friendId, message } = ctx.request.body;
    const result = await service.chatHistory.create({
      friendId,
      message,
    });
    this.success(result);
  }
}
module.exports = ChatHistoryController;
