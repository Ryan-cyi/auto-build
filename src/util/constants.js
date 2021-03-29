const { name, version } = require('../../package.json');

// const configFile = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.autobuildrc`;
const configFile = `${process.cwd()}/.autobuildrc`

const publish_platform = ["pgy", "fir"];

module.exports = {
    name,
    version,
    configFile,
    publish_platform
}