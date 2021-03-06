'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Servies = app.model.define('servies', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shop_id: {
      type: INTEGER,
      allowNull: false,
    },
    head_img: {
      type: STRING,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    content: {
      type: TEXT('long'),
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
      type: STRING('1020')
    },
    views: {
      type: STRING,
      allowNull: false,
    },
    likes: {
      type: STRING,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'servies',
    timestamps: false,
  });
  Servies.sync();
  return Servies;
};
