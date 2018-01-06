'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ServiesReply = app.model.define('servies_reply', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comments_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'servies_reply',
    timestamps: false,
  });
  ServiesReply.sync();
  return ServiesReply;
};
