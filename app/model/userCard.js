'use strict';

module.exports = app => {
  const { INTEGER, DATE, TEXT } = app.Sequelize;

  const UserCard = app.model.define('user_card', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    card_img: {
      type: TEXT('medium'),
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'user_card',
    timestamps: false,
  });
  UserCard.sync();
  return UserCard;
};
