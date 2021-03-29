const ejs = require('ejs');
const path = require('path');

const email_template_one_path = path.resolve(__dirname, './email-template-1.html');

module.exports = (result) => {
    console.log('result', result)
    const { app_info, data, log } = result
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
}
