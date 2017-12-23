'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Travels = app.model.define('travels', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: STRING,
      allowNull: false,
    },
    views: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'travels',
    timestamps: false,
  });

  Travels.associate = () => {
    app.model.Travels.belongsTo(app.model.Users);
    app.model.Travels.hasMany(app.model.TravelsLikes);
  };

  return Travels;
};
