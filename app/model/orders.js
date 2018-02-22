'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Orders = app.model.define('orders', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    num: {
      type: INTEGER,
      allowNull: false,
    },
    servies_id: {
      type: INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
      comment: '订单状态：-2. 向导拒绝订单 -1. 已失效 0: 待付款 1: 待接收 2: 已确认 3: 售后',
    },
    count: {
      type: INTEGER,
      comment: '订单价格',
    },
    time: {
      type: DATE,
      allowNull: false,
    },
    travel_time: {
      type: DATE,
      comment: '出行时间',
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });
  Orders.sync();
  return Orders;
};
