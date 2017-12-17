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
      type: STRING(20),
      allowNull: false,
    },
    content: {
      type: STRING(50),
      allowNull: false,
    },
    carousel: {
      type: STRING(50),
      allowNull: false,
    },
    link: {
      type: STRING(50),
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
  return Carousel;
};
