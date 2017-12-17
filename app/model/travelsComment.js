'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const TravelsComment = app.model.define('travels_comment', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    travels_id: {
      type: INTEGER,
      allowNull: false,
    },
    commenter: {
      type: INTEGER,
      allowNull: false,
    },
    replyer: {
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
    tableName: 'travels_comment',
    timestamps: false,
  });
  return TravelsComment;
};
