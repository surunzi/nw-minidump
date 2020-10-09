const path = require('path');
const execa = require('execa');
const fs = require('licia/fs');
const dump = require('./dump');

module.exports = async function (dmp, options) {
  const { output, binary } = options;

  if (binary) {
    await dump(binary, {
      output: binary + '.sym',
    });
  }

  const result = await execa(
    path.resolve(__dirname, '../bin/minidump_stackwalk'),
    [dmp]
  );

  await fs.writeFile(output, result.stdout, 'utf8');
};
