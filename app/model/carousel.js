'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Carousel = app.model.define('carousel', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    carousel: {
      type: STRING,
      allowNull: false,
    },
    link: {
      type: STRING,
      allowNull: false,
    },
    weight: {
      type: INTEGER,
      allowNull: false,
    },
    site: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'carousel',
    timestamps: false,
  });
  Carousel.sync();
  return Carousel;
};
