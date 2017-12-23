'use strict';
module.exports = app => {
  const { router } = app;
  const controller = app.controller;
  router.get('/api/carousel', controller.carousel.getBySite);
  router.get('/api/travels', controller.travels.getList);
  router.get('/api/travels/:id', controller.travels.getOne);
};
