'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const wallet = app.model.define('wallet', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    balance: {
      type: INTEGER,
      allowNull: false,
    },
    password: {
      type: INTEGER,
      allowNull: false,
    },
    bank: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'wallet',
    timestamps: false,
  });
  return wallet;
};
