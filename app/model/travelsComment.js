'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const TravelsComment = app.model.define('travels_comment', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    travel_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    commenter: {
      type: INTEGER,
      allowNull: false,
    },
    replyer: {
      type: INTEGER,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'travels_comment',
    timestamps: false,
  });
  TravelsComment.sync();
  return TravelsComment;
};
