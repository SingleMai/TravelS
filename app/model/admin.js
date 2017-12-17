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
      type: STRING(16),
      allowNull: false,
    },
    account: {
      type: STRING(16),
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING(16),
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
  return Admin;
};
