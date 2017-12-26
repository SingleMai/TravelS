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
  router.get('/api/travels/comments', controller.travelsComment.getList);
  router.get('/api/travels/comment', controller.travelsComment.getOne);
  router.post('/api/travels/comment', controller.travelsComment.create);
  router.delete('/api/travels/comment', controller.travelsComment.del);
  router.post('/api/travels/likes', controller.travelsLikes.create);
  router.delete('/api/travels/likes', controller.travelsLikes.del);

  // 用户相关
  router.get('/api/token', controller.users.token);
};
