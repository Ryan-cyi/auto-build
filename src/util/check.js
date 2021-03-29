const config = require('../config');
const constant = require('./constants');

module.exports = () => {
  const configuration = config('all');
  const {
    publish_platform,
    api_key,
    url,
    email_send_email,
    install_type,
    email_host,
    email_user,
    email_port,
    email_password,
    email_to,
    install_password } = configuration;
  if (!constant.publish_platform.includes(publish_platform)) {
    console.log('publish platform is empty. please use "auto-cli i"');
    process.exit(0);
  }
  if (!api_key) {
    console.log('api_key is empty. please use "auto-cli i"');
    process.exit(0);
  }
  if (!url) {
    console.log('url is empty. please use "auto-cli i"');
    process.exit(0);
  }
  if (install_type) {
    if (!install_password) {
      console.log('set use password install. but not set the password, please use "auto-cli i"');
      process.exit(0);
    }
  }

  if (email_send_email) {
    if (!email_host) {
      console.log('need set email host. please use "auto-cli i"');
      process.exit(0);
    }
    if (!email_user) {
      console.log('need set email user. please use "auto-cli i"');
      process.exit(0);
    }
    if (!email_port) {
      console.log('need set email port. please use "auto-cli i"');
      process.exit(0);
    }
    if (!email_password) {
      console.log('need set email password. please use "auto-cli i"');
      process.exit(0);
    }
    if (!email_to) {
      console.log('need set send to who. please use "auto-cli i"');
      process.exit(0);
    }
  }
}