'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const TravelsImg = app.model.define('travels_img', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order: {
      type: INTEGER,
    },
    travels_id: {
      type: INTEGER,
      allowNull: false,
    },
    travels_img: {
      type: STRING,
      allowNull: false,
    },
    time: {
      type: DATE,
    },
  }, {
    tableName: 'travels_img',
    timestamps: false,
  });
  TravelsImg.sync();
  return TravelsImg;
};
