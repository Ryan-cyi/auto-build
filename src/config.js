

const fs = require('fs');
const { encode, decode } = require('ini');
const { configFile } = require('./util/constants');
const project_ignore_path = `${process.cwd()}/.gitignore`

module.exports = (action, k, v) => {
    const flag = fs.existsSync(configFile);
    const obj = {};
    if (flag) {
        const content = fs.readFileSync(configFile, 'utf-8');
        const project_ignore = fs.readFileSync(project_ignore_path, 'utf-8');
        if (!project_ignore.includes('.autobuildrc')) {
            fs.appendFile(project_ignore_path, '\n' + '.autobuildrc' + '\n', () => { })
        }
        Object.assign(obj, decode(content))
    }
    if (action === 'get') {
        return obj[k]
    } else if (action === 'getVal') {
        console.log(obj[k])
    } else if (action === 'set') {
        obj[k] = v;
        fs.writeFileSync(configFile, encode(obj));
    } else if (action === 'delete') {
        delete obj[k]
        fs.writeFileSync(configFile, encode(obj));
    } else if (action === 'all') {
        return obj
    }
}