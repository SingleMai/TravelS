'use strict';


module.exports = app => {
  const Users = require('./users');
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Travels = app.model.define('travels', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    views: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'travels',
    timestamps: false,
  });
  Travels.belongsTo(app.model.Users);
  return Travels;
};
