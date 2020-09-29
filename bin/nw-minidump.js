#!/usr/bin/env node

const program = require('commander');
const walk = require('../lib/walk');
const version = require('../package.json').version;

program.version(version);

program
  .command('walk')
  .description('walk minidump file')
  .action(() => {
    walk();
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
