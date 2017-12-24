'use strict';

const sequelizeConfig = require('./config.sequelize');

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1513178907746_5673';

  // 修改请求表单的大小
  config.bodyParser = {
    formLimit: '10mb',
  };

  config.sequelize = sequelizeConfig;

  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];
  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
