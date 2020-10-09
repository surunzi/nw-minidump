const path = require('path');
const execa = require('execa');
const fs = require('licia/fs');

module.exports = async function (dmp, options) {
  let { binary, output } = options;

  if (!output) {
    output = dmp + '.txt';
  }
  dmp = path.resolve(process.cwd(), dmp);
  output = path.resolve(process.cwd(), output);
  if (binary) {
    binary = path.resolve(process.cwd(), binary || '');
  }

  const result = await execa(
    path.resolve(__dirname, '../bin/minidump_stackwalk'),
    [dmp]
  );

  await fs.writeFile(output, result.stdout, 'utf8');
};
