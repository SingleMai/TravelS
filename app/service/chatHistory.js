'use strict';

const Service = require('egg').Service;

class ChatHistoryService extends Service {
  // 创建聊天记录
  async create({ friendId, message }) {
    const { ctx } = this;
    const data = await ctx.model.ChatHistory.create({
      from_user_id: ctx.user.id,
      to_user_id: friendId,
      message,
      status: 0,
      time: new Date(),
    });
    // 检查两者是否有好友关联，如果没有则添加
    await ctx.model.Friendship.findOrCreate({
      where: {
        friend_id: friendId,
        user_id: ctx.user.id,
      },
      defaults: {
        friend_id: friendId,
        user_id: ctx.user.id,
      },
    });
    await ctx.model.Friendship.findOrCreate({
      where: {
        friend_id: ctx.user.id,
        user_id: friendId,
      },
      defaults: {
        friend_id: ctx.user.id,
        user_id: friendId,
      },
    });
    return data;
  }
  // 查看一个人的所有聊天记录
  async getOneChat() {
    const { ctx } = this;
    const id = ctx.user.id;
    const friends = await ctx.model.Friendship.findAll({
      raw: true,
      where: {
        user_id: id,
      },
    });
    const result = []
    for (const friend of friends) {
      // 这里由于聊天记录是由双方的对话记录组合而成的，所以需要查询两次得到全体数据
      const data1 = await ctx.model.ChatHistory.findAll({
        raw: true,
        order: [['time', 'DESC']],
        where: {
          from_user_id: id,
          to_user_id: friend.friend_id,
        },
      });
      const data2 = await ctx.model.ChatHistory.findAll({
        raw: true,
        where: {
          from_user_id: friend.friend_id,
          to_user_id: id,
        },
      });
      // 将两个数据集组合起来进行排序
      result.push([...data1, ...data2].sort((a, b) => a.time - b.time));
    }
    return result;
  }

  async getOneChatByOne({ friendId }) {
    const { ctx } = this;
    const id = ctx.user.id;
    const data1 = await ctx.model.ChatHistory.findAll({
      raw: true,
      order: [['time', 'DESC']],
      where: {
        from_user_id: id,
        to_user_id: friendId,
      },
    });
    const data2 = await ctx.model.ChatHistory.findAll({
      raw: true,
      where: {
        from_user_id: friendId,
        to_user_id: id,
      },
    });
    // 将两个数据集组合起来进行排序
    const result = [...data1, ...data2].sort((a, b) => new Date(a.time) - new Date(b.time));
    return result;
  }
}

module.exports = ChatHistoryService;
