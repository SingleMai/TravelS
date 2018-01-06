'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const serviesImg = app.model.define('servies_img', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    servies_id: {
      type: INTEGER,
      allowNull: false,
    },
    servies_img: {
      type: STRING(50),
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'servies_img',
    timestamps: false,
  });
  serviesImg.sync();
  return serviesImg;
};
