'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Users = app.model.define('users', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    head: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    sex: {
      type: INTEGER,
    },
    phone: {
      type: INTEGER,
    },
    wetchat: {
      type: STRING,
      unique: true,
    },
    blog: {
      type: STRING,
      unique: true,
    },
    email: {
      type: STRING,
      unique: true,
    },
    instroduction: {
      type: STRING,
    },
    has_id_card: {
      type: INTEGER,
    },
    has_edu_card: {
      type: INTEGER,
    },
    has_guide_card: {
      type: INTEGER,
    },
    has_drive_card: {
      type: INTEGER,
    },
    has_shop: {
      type: INTEGER,
    },
    born: {
      type: DATE,
    },
    city: {
      type: STRING,
    },
    school: {
      type: STRING,
    },
    recommend_id: {
      type: INTEGER,
    },
    time: {
      type: DATE,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  Users.associate = () => {
    app.model.Users.hasOne(app.model.Travels);
    app.model.Users.hasMany(app.model.TravelsLikes);
  };
  Users.sync();
  return Users;
};
