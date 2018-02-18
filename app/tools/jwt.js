const jwt = require('jsonwebtoken');

module.exports = {
  sign(config, data) {
    const { secret, expiresIn } = config.jwt;
    return jwt.sign(data, secret, {
      expiresIn,
    })
  },
  verify(config, token) {
    const { secret } = config.jwt;
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      })
    })
  }
}
