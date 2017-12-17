'use strict';

module.exports = {
  schedule: {
    interval: '10m', // 10 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {
    const data = await ctx.service.servies.getTypes();
    ctx.app.serviesTypes = data;
  },
};
