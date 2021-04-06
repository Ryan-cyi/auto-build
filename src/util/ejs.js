const ejs = require('ejs');
const path = require('path');
const config = require('../config');

const email_template_one_path = path.resolve(__dirname, './email-template-1.html');

module.exports = (result) => {
    const configuration = config('all');
    const { publish_platform } = configuration;
    const { app_info, data, log } = result

    if (publish_platform === 'pgy') {
        const params = {
            app_info: app_info,
            update_description: log,
            list: data
        }
        return new Promise((resolve, reject) => {
            ejs.renderFile(email_template_one_path, { ...params }, {}, function (err, str) {
                if (err) {
                    reject(err)
                }
                resolve(str)
            });
        })
    } else if (publish_platform === 'fir') {
        const params = {
            app_info: app_info,
            update_description: log,
            list: data
        }
        return new Promise((resolve) => {
            resolve(JSON.stringify(params))
        }) 
    }
   
}
