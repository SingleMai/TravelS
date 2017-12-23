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
      type: STRING(50),
      allowNull: false,
    },
    name: {
      type: STRING(30),
      unique: true,
      allowNull: false,
    },
    sex: {
      type: INTEGER,
      allowNull: false,
    },
    phone: {
      type: INTEGER,
    },
    wetchat: {
      type: STRING(30),
      unique: true,
    },
    blog: {
      type: STRING(30),
      unique: true,
    },
    email: {
      type: STRING(30),
      unique: true,
    },
    instroduction: {
      type: STRING,
      allowNull: false,
    },
    has_id_card: {
      type: INTEGER,
      allowNull: false,
    },
    has_edu_card: {
      type: INTEGER,
      allowNull: false,
    },
    has_guide_card: {
      type: INTEGER,
      allowNull: false,
    },
    has_drive_card: {
      type: INTEGER,
      allowNull: false,
    },
    has_shop: {
      type: INTEGER,
      allowNull: false,
    },
    born: {
      type: DATE,
      allowNull: false,
    },
    city: {
      type: STRING(30),
      allowNull: false,
    },
    school: {
      type: STRING(30),
      allowNull: false,
    },
    recommend_id: {
      type: INTEGER,
      allowNull: false,
    },
    time: {
      type: DATE,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  Users.associate = () => {
    app.model.Users.hasOne(app.model.Travels);
    app.model.Users.hasMany(app.model.TravelsLikes);
  };

  return Users;
};
