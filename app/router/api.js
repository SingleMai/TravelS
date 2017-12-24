'use strict';
module.exports = app => {
  const { router } = app;
  const controller = app.controller;
  // 轮播图相关
  router.get('/api/carousel', controller.carousel.getBySite);
  // travels 相关
  router.get('/api/travels', controller.travels.getList);
  router.get('/api/travels/:id', controller.travels.getOne);
  router.post('/api/travels', controller.travels.create);
  router.delete('/api/travels/:id', controller.travels.del);
  router.get('/api/travels/comment', controller.travelsComment.getList);
};
