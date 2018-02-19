'use strict';

const Service = require('egg').Service;
const errCode = require('../core/errCode');

class FriendshipService extends Service {
  // 添加好友
  async create($this, { friendId }) {
    const { ctx } = this;
    const orig = await ctx.model.Friendship.findOne({
      where: {
        friend_id: friendId,
      },
    });
    if (orig !== null) $this.error(errCode.OBJECT_EXITS);
    const data = await ctx.model.Friendship.create({
      friend_id: friendId,
      user_id: ctx.user.id,
    });
    return data;
  }
  // 好友列表
  async getList() {
    const { ctx } = this;
    const id = ctx.user.id;
    const friends = await ctx.model.Friendship.findAll({
      raw: true,
      where: {
        user_id: id,
      },
    });
    return friends;
  }

  async del($this, { friendId }) {
    const { ctx } = this;
    const id = ctx.user.id;
    const friend = await ctx.model.Friendship.findOne({
      where: {
        user_id: id,
        friend_id: friendId,
      },
    });
    if (friend !== null) {
      friend.destroy();
    }
  }
}

module.exports = FriendshipService;
