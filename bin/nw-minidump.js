#!/usr/bin/env node

const program = require('commander');
const walk = require('../lib/walk');
const version = require('../package.json').version;

program.version(version);

program
  .command('walk')
  .description('walk minidump file')
  .option('-b, --binary <path>', 'path of the binary')
  .option('-o, --output <path>', 'path of the output')
  .action(({ binary, output }, cmdObj) => {
    try {
      if (!cmdObj && !cmdObj[0]) {
        throw Error('dmp file path missing');
      }
      walk(cmdObj[0], {
        binary,
        output,
      });
    } catch (e) {
      console.log('error: ' + e.message);
    }
  });

program
  .command('help [command]')
  .description('display help information for a command')
  .action((command) => {
    let cmd = program.commands.find((c) => c.name() === command) || program;
    cmd.help();
  });

const args = process.argv;
if (args[2] === '--help' || args[2] === '-h') {
  args[2] = 'help';
}

program.parse(args);
