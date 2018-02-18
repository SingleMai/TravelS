'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Friendship = app.model.define('friendship', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    friend_id: {
      type: INTEGER,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
      comment: '备注名',
    },
  }, {
    tableName: 'friendship',
  });
  Friendship.sync();
  return Friendship;
};
