const nodemailer = require('nodemailer')

const $email = {
  config: {
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: 'chenchengrongccr@163.com',
      pass: 'aa3668481'
    }
  },
  sendEmail ({ to, cc, subject, html }) {
    return new Promise((resolve, reject) => {
      if (!to || !subject) {
        reject(new Error('params invalid/missed'))
      }
      transporter.sendMail({
        from: 'chenchengrongccr@163.com',
        to,
        // cc,
        subject,
        html
      }, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }
}

const transporter = nodemailer.createTransport($email.config)

module.exports = {
  get $email () {
    return $email
  }
}
