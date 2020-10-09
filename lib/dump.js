const path = require('path');
const execa = require('execa');
const fs = require('licia/fs');

module.exports = async function (binary, options) {
  const { output } = options;

  const result = await execa(path.resolve(__dirname, '../bin/dump_syms'), [
    binary,
  ]);

  if (output) {
    await fs.writeFile(output, result.stdout, 'utf8');
  }

  return result.stdout;
};
