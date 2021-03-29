const { createTransport } = require('nodemailer');
const config = require('../config');
const template = require('./ejs');
const cwd = process.cwd();


module.exports = async (data, app_info, log) => {
  const { email_host, email_user, email_port, email_password, email_to, email_cc } = config('all');
  const { name, env } = require(`${cwd}/package.json`);
  const title = `${name} ${env} has new test packs are available for testing.`
  const opts = {
    host: email_host,
    secureConnection: true, // use SSL
    port: email_port, // port
    auth: {
      user: email_user,
      pass: email_password,
    },
  }
  const email_template = await template({ data, app_info, log });
  const payload = {
    from: email_user,
    to: email_to,
    cc: email_cc,
    subject: title,
    html: email_template,
  };
  return new Promise((resolve, reject) => {
    createTransport(opts).sendMail(payload, (error, info) => {
      if (error) {
        reject(error)
      }
      resolve(info);
    });
  })
}
