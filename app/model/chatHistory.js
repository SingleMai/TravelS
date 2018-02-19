'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ChatHistory = app.model.define('chatHistory', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
      comment: '发送时间',
    },
    from_user_id: {
      type: INTEGER,
      allowNull: false,
    },
    to_user_id: {
      type: INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'chatHistory',
    timestamps: false,
  });
  ChatHistory.sync();
  return ChatHistory;
};
