'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class FriendshipController extends Controller {
  // GET /api/friendship
  async getList() {
    const { service } = this;
    const data = await service.friendship.getList();
    if (data === null) {
      this.error(errCode.NOT_FOUND);
    } else {
      this.success(data);
    }
  }
  // POST /api/friendship
  async create() {
    const { ctx, service } = this;
    const rule = {
      friendId: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { friendId } = ctx.request.body;
    const result = await service.friendship.create(this, {
      friendId,
    });
    this.success(result);
  }

  async del () {
    const { ctx, service } = this;
    const rule = {
      friendId: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { friendId } = ctx.request.body;
    await service.friendship.del(this, {
      friendId,
    });
    this.success();
  }
}
module.exports = FriendshipController;
