'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const TravelsLikes = app.model.define('travels_likes', {
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
    tableName: 'travels_likes',
    timestamps: false,
  });
  return TravelsLikes;
};
