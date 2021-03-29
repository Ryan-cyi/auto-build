
const program = require('commander');
const path = require('path');
const { version } = require('./util/constants');

const actions = {
  init: {
    description: 'init project',
    alias: 'i',
    examples: [
      'auto-cli init '
    ],
  },
  build: {
    description: 'build project',
    alias: 'b',
    examples: [
      'auto-cli build '
    ],
    option: [
      `--log <log>,please enter upload description`,
      `-a, --noandroid, ignore android`,
      `--noios <no>, ignore ios`,
      `--noemail, ignore send email`
    ]
  },
  config: {
    description: 'config info',
    alias: 'c',
    examples: [
      'auto-cli config get <K>',
      'auto-cli config set <K> <V>'
    ],
  }
};

Object.keys(actions).forEach((item) => {
  const cmd = program
    .command(item)
    .alias(actions[item].alias)
    .description(actions[item].description)
    .action((value) => {
      require(path.resolve(__dirname, item))(value)
    })
  if (actions[item].option) {
    actions[item].option.forEach((i) => {
      cmd.option(i)
    })
  }
})


program.on('--help', () => {
  console.log('Examples');
  Object.keys(actions).forEach((action) => {
    (actions[action].examples || []).forEach(example => {
      console.log(`  ${example}`)
    })
  })
})


program.version(version)
  .parse(process.argv);
