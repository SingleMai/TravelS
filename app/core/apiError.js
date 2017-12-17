'use strict';

class APIError extends Error {
  constructor(code, message) {
    super(code, message);
    this.code = code;
    this.message = message;
  }
}
module.exports = APIError;
