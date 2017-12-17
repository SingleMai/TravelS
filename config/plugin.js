'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// 参数验证插件
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
