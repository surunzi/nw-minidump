const path = require('path');
const execa = require('execa');
const fs = require('licia/fs');
const isWindows = require('licia/isWindows');

module.exports = async function (binary, options) {
  const { output } = options;

  const result = await execa(
    path.resolve(__dirname, '../bin/dump_syms' + (isWindows ? '.exe' : '')),
    [binary]
  );

  if (output) {
    await fs.writeFile(output, result.stdout, 'utf8');
  }

  return result.stdout;
};
