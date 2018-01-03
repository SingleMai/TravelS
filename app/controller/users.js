'use strict';

const path = require('path');
const fs = require('fs');
const Controller = require('../core/baseController');
const errCode = require('../core/errCode');
const sendToWormhole = require('stream-wormhole');
const { isPic, getDateTime } = require('../core/utils');

class UsersController extends Controller {
  // GET /api/token
  async token() {
    const { ctx } = this;
    ctx.body = 1;
    ctx.status = 201;
  }
  // GET /api/users
  async getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { limit, offset } = ctx.query;
    const result = await service.users.getList(parseInt(limit), parseInt(offset));
    this.success(result);
  }
  // GET /api/user
  async getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.query;
    const result = await service.users.getOne(parseInt(id));
    this.success(result);
  }

  // GET /backen/users
  async _getList() {
    const { ctx, service } = this;
    const rule = {
      limit: 'id',
      offset: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { limit, offset } = ctx.query;
    const result = await service.users._getList(parseInt(limit), parseInt(offset));
    this.success(result);
  }

  // GET /backen/user
  async _getOne() {
    const { ctx, service } = this;
    const rule = {
      id: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = ctx.query;
    const result = await service.users._getOne(id);
    this.success(result);
  }
  // GET /api/users/instroduction
  async getInstroduction() {
    const { ctx, service } = this;
    const rule = {
      userId: 'id',
    };
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { userId } = ctx.query;
    const result = await service.users.getInstroduction(userId);
    this.success(result);
  }
  // POST /api/users/avator
  async updateAvator() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const name = `${getDateTime()}@@${path.basename(stream.filename)}`;
    if (!isPic(stream)) { // 判断是否图片类型
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      this.error(errCode.FILES_TYPE_INVALID);
    }
    const rule = {
      id: { type: 'id', required: true },
    };
    try {
      ctx.validate(rule, stream.fields);
    } catch (err) {
      await sendToWormhole(stream);
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id } = stream.fields;
    const user = await service.users.getOne(id);
    if (user === null) {
      await sendToWormhole(stream);
      this.error(errCode.NOT_FOUND);
    }
    const filePath = path.join(__dirname, '../../app/public/avator');
    fs.writeFileSync(`${filePath}${path.sep}${name}`, stream);
    const oriName = user.head;
    try {
      if (oriName !== 'default_avator.jpg') {
        await sendToWormhole(stream);
        fs.unlinkSync(`${filePath}${path.sep}${oriName}`);
      }
    } catch (err) {
      // 即使出错也不终止。将错误记录即可
      console.error(err);
    }
    user.head = name;
    await user.save();
    this.success();
  }
  // POST /api/users
  async updateUser() {
    const { ctx, service } = this;
    const rule = {
      id: 'number',
      name: { type: 'string', required: false },
      sex: { type: 'number', required: false },
      born: { type: 'string', required: false },
      job: { type: 'string', required: false },
      city: { type: 'string', required: false },
      school: { type: 'string', required: false },
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      this.error(errCode.PARAMS_INVALID_EMPTY);
    }
    const { id, name, sex, born, job, city, school } = ctx.request.body;
    const result = await service.users.updateUser(id , {
      name,
      sex,
      born,
      job,
      city,
      school,
    });
    this.success(result);
  }
}

module.exports = UsersController;
