'use strict';

const errCode = {
  SUCCESS: { code: 1, msg: 'success' },
  NOT_FOUND: { code: 2, msg: 'not found' },
  PARAMS_INVALID_EMPTY: { code: -1, msg: 'params invalid/empty' },
  OBJECT_EXITS: { code: -2, msg: 'object exits' },
  FILES_TYPE_INVALID: { code: -3, msg: 'files type invalid' },
  UPLOAD_FILE_ERROR: { code: -4, msg: 'upload file error' },
  HAVENT_CHOOSE_FILES: { code: -5, msg: 'havent choose files' },
  SAVE_FILES_ERROR: { code: -6, msg: 'save files error' },
  EMAIL_ERROR: { code: -7, msg: 'emial error/not exit' },
  LOGIN_ERROR: { code: -8, msg: 'login error/not exit' },
  AUTH_ERROR: { code: -9, msg: 'auto error' },
  INTERNAL_SERVER_ERROR: { code: -5000, msg: 'Internal Server Error' },
};

exports = module.exports = errCode;
