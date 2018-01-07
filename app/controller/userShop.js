'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class UserShopController extends Controller {
  // POST /api/shop
  // TODO 临时接口，接入支付之类的协议
  async create() {
    const { ctx, service } = this;
    const rule = {
      userId: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    try {
      const { userId } = ctx.request.body;
      const result = await service.userShop.create(userId);
      this.success(result);
    } catch (err) {
      this.error(errCode.OBJECT_EXITS, err);// TODO 这里抛出的错误设置等待接入支付接口再进行具体判断
    }
  }
}
module.exports = UserShopController;
