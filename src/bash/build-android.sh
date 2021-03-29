#!/bin/sh

set -e

# Build for android
# The apk file will be at
# android/app/build/outputs/apk/app-release.apk
cd android
sleep 1

rm -rf build/ app/build/
sleep 1

eval "./gradlew assembleRelease"
sleep 1

cd -
