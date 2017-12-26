'use strict';

// 后台接口与api接口重名的部分，统一前缀加_
module.exports = app => {
  const admin = app.controller.admin;
  const carousel = app.controller.carousel;
  const users = app.controller.users;
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
};
