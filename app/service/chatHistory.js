'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const util = require('../core/utils');

class ChatHistoryService extends Service {
  // 创建聊天记录
  async create(values) {
    const { ctx } = this;
    const data = await ctx.model.ChatHistory.create(values);
    return data;
  }
  // 删除聊天记录
  async del(id) {
    const { ctx } = this;
    const result = await ctx.model.ChatHistory.findOne({
      where: {
        id,
      },
    });
    if (result === null) return;
    result.destroy();
    return;
  }
  // 查看聊天记录
  async getOneChat(id) {
    const { ctx } = this;
    const friends = await ctx.model.Friendship.findAll({
      raw: true,
      where: {
        user_id: id,
      },
    });
    const result = []
    for (const friend of friends) {
      // 这里由于聊天记录是由双方的对话记录组合而成的，所以需要查询两次得到全体数据
      const data1 = await ctx.model.FhatHistory.findAll({
        raw: true,
        where: {
          from_user_id: ,
          to_user_id: ,
        }
      })
      const data2 = await ctx.model.FhatHistory.findAll({
        raw: true,
        where: {
          from_user_id: ,
          to_user_id: ,
        }
      })
      // 将两个数据集组合起来进行排序
    }
  }

  async getBySite(site) {
    let carousels = await this.ctx.model.Carousel.findAll({
      raw: true,
      attributes: ['id', 'title', 'content', 'carousel', 'link'],
      order: [['weight', 'DESC']],
      where: {
        site,
      },
    });
    carousels = util.toPath('carousel', 'public/carousel', carousels);
    return carousels;
  }
}

module.exports = ChatHistoryService;
