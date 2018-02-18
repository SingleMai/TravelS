/*
* 填充/转换  不完善的biz数据模型
*/

'use strict';

const lodash = require('lodash');

const requiredField = ['adaptor', 'rbu', 'qrw', 'smu', 'indexd', 'pmu'];

function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}

function bizPolyfill(rawBiz) {
  const currentField = [];
  const out = { modules: [] };
  out.bid = rawBiz.bid || '';
  out.pid = rawBiz.pid || '';

  rawBiz.config.forEach((o) => {
    currentField.push(o.module);
    out.modules.push({
      name: o.module,
      servers: o.server_list || [{ ip: '', port: '', status: Number }],
      conf: safeJSONParse(o.module_conf)
    });
  });

  const filtered = lodash.difference(requiredField, currentField);

  filtered.forEach((name) => {
    out.modules.push({ name, servers: [{ ip: '', port: '', status: Number }], conf: {} });
  });

  out.modules.forEach((module) => {
    module.$pid = out.pid;
    module.$bid = out.bid;
  });

  return out;
}

module.exports = bizPolyfill;

