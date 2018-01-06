'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ServiesCommentImg = app.model.define('Servies_comment_img', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comments_id: {
      type: INTEGER,
      allowNull: false,
    },
    servies_comment_img: {
      type: STRING(50),
      allowNull: false,
    },
    order: {
      type: INTEGER,
      unique: true,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'Servies_comment_img',
    timestamps: false,
  });
  ServiesCommentImg.sync();
  return ServiesCommentImg;
};
