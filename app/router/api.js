'use strict';
module.exports = app => {
  const { router } = app;
  const controller = app.controller;
  // 轮播图相关
  router.get('/api/carousel', controller.carousel.getBySite);
  // travels 相关
  router.get('/api/travels', controller.travels.getList);
  router.get('/api/travel', controller.travels.getOne);
  router.post('/api/travels', controller.travels.create);
  router.delete('/api/travel', controller.travels.del);
  router.get('/api/travels/comment', controller.travelsComment.getList);
};
