'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Admin = app.model.define('admin', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    account: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    permission: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'admin',
    timestamps: false,
  });
  Admin.sync();
  return Admin;
};
