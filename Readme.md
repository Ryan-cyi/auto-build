## auto-cli 

### Useage

```sh
npm install react-native-auto-build-cli -g
```

## config project

Execute auto-cli init in the project directory.

```sh
auto-cli init 
or
auto-cli i
```

1. please select build platform.(required)
  - all
  - ios
  - android


2. Select the platform you want to distribute(required)

  - pgy
  - fir

3. Set upload api path.(required)

4. Set upload api key.(required)

5. Sets whether password download is required
  - Yes
  - No

  If you select the download password, you need to set the download password.

  6. Do you need to send an email reminder after uploading successfully?
   - Yes
   - No

## build

```sh
auto-cli build --log "log" 
auto-cli build --noandroid // ignore android build
auto-cli build --noios // ignore ios build
auto-cli build --noemail // not send email
```

--log: update description 
--noemail: ignore send email.
--noandroid: ignore android build
--ios: ignore ios build