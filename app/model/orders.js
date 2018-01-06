'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Orders = app.model.define('orders', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    servies_id: {
      type: INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: INTEGER,
      allowNull: false,
    },
    servies_comment_id: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });
  Orders.sync();
  return Orders;
};
