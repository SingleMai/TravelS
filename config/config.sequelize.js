'use strict';

const sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'travels',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '123456',
  timezone: '+08:00', // 东八时区
  logging: false,
};
module.exports = sequelize;
