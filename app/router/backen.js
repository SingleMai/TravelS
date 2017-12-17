'use strict';


module.exports = app => {
  const admin = app.controller.admin;
  const carousel = app.controller.carousel;
  app.router.get('/backen/token', admin.token);
  app.router.get('/backen/admin', admin.getList);
  app.router.get('/backen/admin/:id', admin.getOne);
  app.router.post('/backen/admin', admin.create);
  app.router.delete('/backen/admin/:id', admin.del);
  app.router.post('/backen/carousel', carousel.create);
  app.router.delete('/backen/carousel/:id', carousel.del);
};
