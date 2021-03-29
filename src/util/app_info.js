const fs = require('fs');
const { decode } = require('ini');
const config = require('../config');
const cwd = process.cwd();
const ios_pbxproj_file_path = `${cwd}/ios/VendorPortal.xcodeproj/project.pbxproj`;
const android_gradle_file_path = `${cwd}/android/build.gradle`;



module.exports = (opts) => {
  const { noandroid, noios } = opts;
  const list = [];
  const configuration = config('all');
  if (configuration.build_platform === 'all') {
    if (!noandroid) {
      let android = get_android_config();
      list.push(android)
    }
    if (!noios) {
      let ios = get_ios_config();
      list.push(ios)
    }
  }
  if (configuration.build_platform === 'ios') {
    if (!noios) {
      let ios = get_ios_config();
      list.push(ios)
    }
  }

  if (configuration.build_platform === 'android') {
    if (!noandroid) {
      let android = get_android_config();
      list.push(android)
    }
  }

  return list;
}

function get_ios_config() {
  const content = fs.readFileSync(ios_pbxproj_file_path, 'utf-8').split("\n");
  let info = {}
  content.forEach(i => {
    i = i.replace(/\s+/g, "").toLocaleLowerCase();
    if (i.includes("current_project_version")) {
      Object.assign(info, decode(i))
    }
    if (i.includes('marketing_version')) {
      Object.assign(info, decode(i))
    }
  })
  const ios = {
    build_number: info.current_project_version,
    version: info.marketing_version,
    platform: 'ios'
  }
  return ios;
}

function get_android_config() {
  const content = fs.readFileSync(android_gradle_file_path, 'utf-8').split("\n");
  let info = {}
  content.forEach(i => {
    i = i.replace(/\s+/g, "");
    if (i.includes("versionName")) {
      Object.assign(info, decode(i))
    }
    if (i.includes('versionCode')) {
      Object.assign(info, decode(i))
    }
  })
  const android = {
    build_number: info.versionCode,
    version: info.versionName,
    platform: 'android'
  }
  return android;
}