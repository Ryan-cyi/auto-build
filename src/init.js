const config = require('./config');
const inquirer = require('inquirer');
const constant = require('./util/constants')

const build_platform_prompt = {
    type: 'list',
    message: 'please select build platform',
    name: 'build_platform',
    choices: [
        'all',
        "ios",
        "android",
    ],
    default: 'all'
}

const publish_platform_prompt = {
    type: 'list',
    message: 'please select third platform',
    name: 'publish_platform',
    choices: constant.publish_platform,
}

const pgy = [
    {
        type: 'input',
        message: 'please set pgy upload api path',
        name: 'url',
        default: () => config('get', 'url') || 'https://www.pgyer.com/apiv2/app/upload',
        validate(v) {
            if (!v) {
                return "please entry the upload path."
            }
            return true
        }
    },
    {
        type: 'input',
        message: 'please set pgy api_key',
        name: 'api_key',
        default: () => config('get', 'api_key'),
        validate(v) {
            if (!v) {
                return "please entry the api key."
            }
            return true
        }
    },
    {
        type: 'confirm',
        message: 'need password to install?',
        name: 'install_type',
        default: () => config('get', 'install_type') === 2
    }
]


const install_password_prompt = {
    type: 'input',
    message: 'please enter install password',
    name: 'install_password',
}

const fir = [
    {
        type: 'input',
        message: 'please set pgy upload api path',
        name: 'url',
        default: () => config('get', 'url') || 'https://www.pgyer.com/apiv2/app/upload',
        validate(v) {
            if (!v) {
                return "please entry the api host."
            }
            return true
        }
    },
    {
        type: 'input',
        message: 'please set pgy api_key',
        name: 'api_key',
        default: () => config('get', 'api_key'),
        validate(v) {
            if (!v) {
                return "please entry the api key."
            }
            return true
        }
    },
    {
        type: 'confirm',
        message: 'need password to install?',
        name: 'install_type',
        default: () => config('get', 'install_type') === 2
    }
]

const send_email_propmt = {
    type: 'confirm',
    message: 'when uploaded to platform  need send email?',
    name: 'send_email',
    default: () => config('get', 'send_email') || false
}

const email_prompt = [
    {
        type: 'input',
        message: 'please set email host',
        name: 'host',
        default: () => get_email_config('host'),
        validate(v) {
            if (!v) {
                return "please entry the email host."
            }
            return true
        }
    },
    {
        type: 'input',
        message: 'please set email port.',
        name: 'port',
        default: () => get_email_config('port'),
        validate(v) {
            if (!v) {
                return "please entry the email port."
            }
            return true
        }
    },
    {
        type: 'input',
        message: 'please set email user',
        name: 'user',
        default: () => get_email_config('user'),
        validate(v) {
            if (!v) {
                return "please entry the email user."
            }
            return true
        }
    },
    {
        type: 'password',
        message: 'please set email password',
        name: 'password',
        default: () => get_email_config('password'),
        validate(v) {
            if (!v) {
                return "please entry the email password."
            }
            return true
        }
    },
    {
        type: 'input',
        message: 'please set email to',
        name: 'to',
        default: () => get_email_config('to'),
        validate(v) {
            if (!v) {
                return "please entry the email to."
            }
            return true
        }
    },
    {
        type: 'input',
        message: 'please set email cc',
        name: 'cc',
        default: () => get_email_config('cc'),
    },
]

const third_config = { pgy, fir }

module.exports = async () => {
    const { build_platform } = await inquirer.prompt(build_platform_prompt);
    config('set', 'build_platform', build_platform)
    const { publish_platform } = await inquirer.prompt(publish_platform_prompt)
    config('set', 'publish_platform', publish_platform)
    const { url, api_key, install_type } = await inquirer.prompt(third_config[publish_platform])
    config('set', 'url', url)
    config('set', 'api_key', api_key)
    config('set', 'install_type', install_type)

    if (install_type) {
        const { install_password } = await inquirer.prompt(install_password_prompt);
        config('set', 'install_password', install_password)
    }
    const { send_email } = await inquirer.prompt(send_email_propmt);
    set_email_config('send_email', send_email)
    if (send_email) {
        const { cc, to, user, host, port, password } = await inquirer.prompt(email_prompt);
        set_email_config('host', host)
        set_email_config('user', user)
        set_email_config('port', port)
        set_email_config('password', password)
        set_email_config('to', to)
        set_email_config('cc', cc)
    }
}

function get_email_config(key) {
    return config('get', `email_${key}`)
}

function set_email_config(key, v) {
    return config('set', `email_${key}`, v)
}
