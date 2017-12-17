'use strict';

module.exports = app => {
  require('./router/api')(app);
  require('./router/backen')(app);
};
