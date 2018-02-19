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
