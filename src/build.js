const config = require('./config');
const path = require('path');
const { archive, get_file_path, execute_bash } = require('./util/tool');
const request = require('superagent');
// const get_app_info = require('./util/app_info')
const send_enmail = require('./util/email');
const check = require('./util/check');

const build_android_bash_file = `${path.resolve(__dirname, './bash/build-android.sh')}`
const build_ios_bash_file = `${path.resolve(__dirname, './bash/archive.sh')}`
const andoid_save_path = path.resolve('./android/app/build/outputs/apk/release/*.apk');
const ios_save_path = path.resolve('./ios/build/react-native-upload');
const export_ios_bash_file = `${path.resolve(__dirname, './bash/export-ios.sh')}`

module.exports = async (opts = {}) => {
    check();
    try {
        await build(opts);
    } catch (e) {
        console.log(e)
    }
}

async function build(options) {
    const { build_platform, email_send_email } = config('all');
    const result = []
    const { noandroid, noios, log, noemail } = options
    switch (build_platform) {
        case 'ios': {
            if (noios) break;
            const ios = await build_ios(log);
            result.push(ios);
            break;
        }
        case 'android': {
            if (noandroid) break;
            const android = await build_android(log);
            result.push(android);
            break;
        }
        case 'all': {
            if (!noios) {
                const ios = await build_ios(log);
                result.push(ios);
            }
            if (!noandroid) {
                const android = await build_android(log);
                result.push(android);
            }
            break;
        }
        default:
            break;
    }
    if (email_send_email && !noemail) {
        // const app_info = get_app_info({ noandroid, noios });
        await send_enmail(result, {}, log);
    }
    return result;
}

async function build_android(log) {
    await archive(build_android_bash_file)
    const file = await get_file_path(andoid_save_path);
    const result = await upload(file.trim(), log)
    result.type = "android"
    return result;
}

async function build_ios(log) {
    const { ios_plist_record } = config('all')
    const ios_export_plist = path.resolve(ios_plist_record);
    await archive(build_ios_bash_file);
    await execute_bash([export_ios_bash_file, path.resolve(ios_export_plist), ios_save_path]);
    const file = await get_file_path(`${ios_save_path}/*.ipa`);
    const result = await upload(file.trim(), log)
    result.type = "ios"
    return result;
}

async function upload(file, log) {
    const { url, api_key, install_type, install_password } = config('all');
    return request.post(url)
        .field('_api_key', api_key)
        .field('buildInstallType', install_type ? 2 : 1)
        .field('buildPassword', install_password)
        .field('buildUpdateDescription', log)
        .attach('file', file)
        .on('progress', (event) => {
            // 
            const present = ` ${(event.loaded / event.total * 100).toFixed(2)}%`;
            process.stderr.cursorTo(0);
            process.stderr.write(present);
            process.stderr.clearLine(1);
        })
        .then((res) => res.body.data);
}