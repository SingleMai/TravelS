'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const TravelsImg = app.model.define('travels_img', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    travels_id: {
      type: INTEGER,
      allowNull: false,
    },
    travels_img: {
      type: STRING,
      allowNull: false,
    },
  }, {
    tableName: 'travels_img',
    timestamps: false,
  });
  TravelsImg.sync();
  return TravelsImg;
};
