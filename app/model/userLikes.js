'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserLikes = app.model.define('user_likes', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    servies_id: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'user_likes',
    timestamps: false,
  });
  UserLikes.sync();
  return UserLikes;
};
