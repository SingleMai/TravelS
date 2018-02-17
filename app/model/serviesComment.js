'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ServiesComment = app.model.define('servies_comment', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    servies_id: {
      type: INTEGER,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    order_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    starts: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'servies_comment',
    timestamps: false,
  });
  ServiesComment.sync();
  return ServiesComment;
};
