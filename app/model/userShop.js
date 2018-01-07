'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserShop = app.model.define('user_shop', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      default: 1,
      comment: '商店的状态，1. 营业， 2.打烊'
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'user_shop',
    timestamps: false,
  });
  UserShop.sync();
  return UserShop;
};
