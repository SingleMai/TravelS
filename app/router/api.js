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
  router.get('/api/users', controller.users.getList);
  router.get('/api/user', controller.users.getOne);
  router.get('/api/users/instroduction', controller.users.getInstroduction);
  router.post('/api/users/avator', controller.users.updateAvator);
  router.put('/api/users', controller.users.updateUser);
  // 用户收藏相关
  router.get('/api/users/servies/likes/:userId', controller.users.getServiesLikes);
  router.post('/api/users/servies/likes', controller.users.createServiesLikes);
  router.delete('/api/users/servies/likes/:likesId', controller.users.delServiesLikes);
  router.get('/api/users/card', controller.users.getCard);
  router.put('/api/users/card', controller.users.updateCard);
  // 商店相关
  router.post('/api/shop', controller.userShop.create);

  // 服务相关
  router.get('/api/servies', controller.servies.getList);
  router.get('/api/servie', controller.servies.getOne);
  router.post('/api/servie', controller.servies.create);
  router.put('/api/servie', controller.servies.update);
  router.get('/api/servie/comment/:serviesId', controller.serviesComment.getList);
  // 服务类型相关
  router.get('/api/servies/type', controller.serviesTypes.getRealtions);

};
