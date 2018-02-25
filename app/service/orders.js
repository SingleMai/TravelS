'use strict';

const Service = require('egg').Service;

class OrdersService extends Service {
  async getUserBookOrders() {
    const { ctx, service } = this;
    const result = [];
    const orders = await ctx.model.Orders.findAll({
      raw: true,
      where: {
        buyer_id: ctx.user.id,
        status: 0,
      },
    });
    for (const order of orders) {
      const servies = await service.servies.getOne(order.servies_id);
      Object.assign(servies, {
        orderId: order.id,
        count: order.count,
        num: order.num,
        status: order.status,
        TravelTime: order.travel_time,
      });
      result.push(servies);
    }
    return result;
  }
  // 创建订单
  async create(data) {
    return await this.ctx.model.Orders.create(data);
  }
  async cancel(id) {
    const order = await this.ctx.model.Orders.findOne({ where: { id } });
    console.log(order)
    order.status = -1;
    order.save();
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
  async successed(id) {
    const order = await this.ctx.model.Orders.findOne({ where: { id } });
    order.status = 3;
    order.save();
  }
}

module.exports = OrdersService;
