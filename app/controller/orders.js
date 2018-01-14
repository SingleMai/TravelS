'use strict';

const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
class OrdersController extends Controller {
  // POST /api/orders // TODO 待接入支付状态
  async create() {
    const { ctx, service } = this;
    const rule = {
      serviesId: 'number',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { serviesId } = ctx.request.body;
    const result = service.orders.create({
      servies_id: serviesId,
      buyer_id: 2, // TODO 待接入登录状态，更换为用户id
      time: new Date(),
      status: 0,
    });
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
    const result = service.orders.pay(id);
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
    const result = service.orders.confirm(id);
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
    const result = service.orders.reject(id);
    this.success(result);
  }
  // PUT /api/orders/success
  async success() {
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
    const result = service.orders.success(id);
    this.success(result);
  }
}
module.exports = OrdersController;
