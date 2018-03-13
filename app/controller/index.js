'use strict';

const Controller = require('../core/baseController');
const fs = require('fs');

class IndexController extends Controller {
  // GET /api/index
  async index() {
    const { ctx } = this;
    const res = fs.readFileSync('app/public/dist/index.html', 'utf-8');
    ctx.body = res;
  }
}
module.exports = IndexController;
