'use strict';

// 后台接口与api接口重名的部分，统一前缀加_
module.exports = app => {
  const admin = app.controller.admin;
  const carousel = app.controller.carousel;
  const users = app.controller.users;
  const serviesTypes = app.controller.serviesTypes;
  // 后台管理员相关
  app.router.get('/backen/token', admin.token);
  app.router.get('/backen/admin', admin.getList);
  app.router.get('/backen/admin/:id', admin.getOne);
  app.router.post('/backen/admin', admin.create);
  app.router.delete('/backen/admin/:id', admin.del);
  // 轮播图相关
  app.router.post('/backen/carousel', carousel.create);
  app.router.delete('/backen/carousel/:id', carousel.del);
  // 用户相关
  app.router.get('/backen/users', users._getList);
  app.router.get('/backen/user', users._getOne);
  app.router.put('/backen/users/card', users.checkCard);
  app.router.post('/backen/users', users._createUser);
  app.router.put('/backen/users', users.changeInvalidUsers);

  // 服务相关
  app.router.post('/backen/servies/type', serviesTypes.create);
  app.router.delete('/backen/servies/type', serviesTypes.del);
};
