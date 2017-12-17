'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

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
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'travels_img',
    timestamps: false,
  });
  return TravelsImg;
};
