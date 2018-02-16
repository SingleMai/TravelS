'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const ServiesTypes = app.model.define('servies_type', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
  }, {
    tableName: 'servies_type',
    timestamps: false,
  });
  ServiesTypes.sync();
  return ServiesTypes;
};
