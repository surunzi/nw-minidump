#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const map = require('licia/map');
const walk = require('../lib/walk');
const dump = require('../lib/dump');
const version = require('../package.json').version;

program.version(version);

program
  .command('walk')
  .description('walk minidump file')
  .option('-b, --binary <path...>', 'path of the binary')
  .option('-s, --symbol <symbol...>', 'path of the symbol')
  .option('-o, --output <path>', 'path of the output')
  .action(({ binary, symbol, output }, cmdObj) => {
    try {
      if (!cmdObj && !cmdObj[0]) {
        throw Error('dmp file path missing');
      }
      let dmp = cmdObj[0];
      if (!output) {
        output = dmp + '.txt';
      }
      dmp = path.resolve(process.cwd(), dmp);
      output = path.resolve(process.cwd(), output);
      if (binary) {
        binary = map(binary, (binary) =>
          path.resolve(process.cwd(), binary || '')
        );
      }
      if (symbol) {
        symbol = map(symbol, (symbol) =>
          path.resolve(process.cwd(), symbol || '')
        );
      }

      walk(dmp, {
        binary,
        output,
        symbol,
      });
    } catch (e) {
      console.log('error: ' + e.message);
    }
  });

program
  .command('dump')
  .description('dump binary symbol')
  .option('-o, --output <path>', 'path of the output')
  .action(({ output }, cmdObj) => {
    try {
      if (!cmdObj && !cmdObj[0]) {
        throw Error('binary file path missing');
      }
      let binary = cmdObj[0];
      if (!output) {
        output = binary + '.sym';
      }
      binary = path.resolve(process.cwd(), binary);
      output = path.resolve(process.cwd(), output);
      dump(binary, {
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
