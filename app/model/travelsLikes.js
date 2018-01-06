'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const TravelsLikes = app.model.define('travels_likes', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    tableName: 'travels_likes',
    timestamps: false,
  });

  TravelsLikes.associate = () => {
    app.model.TravelsLikes.belongsTo(app.model.Users);
    app.model.TravelsLikes.belongsTo(app.model.Travels);
  };
  TravelsLikes.sync();
  return TravelsLikes;
};
