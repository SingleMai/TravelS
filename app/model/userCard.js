'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

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
      type: STRING(30),
      unique: true,
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
  return UserCard;
};
