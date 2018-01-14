'use strict';

const Service = require('egg').Service;

class OrdersService extends Service {
  // 创建订单
  async create(data) {
    return await this.ctx.model.Orders.create(data);
  }
  async pay(id) {
    const order = await this.ctx.model.Orders.findOne({ where: { id } });
    order.status = 1;
    order.save();
  }
  async confirm(id) {
    const order = await this.ctx.model.Orders.findOne({ where: { id } });
    order.status = 2;
    order.save();
  }
  async reject(id) {
    const order = await this.ctx.model.Orders.findOne({ where: { id } });
    order.status = -2;
    order.save();
  }
  async success(id) {
    const order = await this.ctx.model.Orders.findOne({ where: { id } });
    order.status = 3;
    order.save();
  }
}

module.exports = OrdersService;
