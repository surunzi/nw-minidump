const path = require('path');
const execa = require('execa');
const fs = require('licia/fs');
const promisify = require('licia/promisify');
const mkdir = promisify(require('licia/mkdir'));
const isWindows = require('licia/isWindows');
const dump = require('./dump');
const util = require('./util');

module.exports = async function (dmp, options) {
  const { output, binary } = options;
  const args = [dmp];

  if (binary) {
    const sym = await dump(binary, {});

    const { name, hash } = util.getBinaryInfo(sym);
    const symPath = path.resolve(process.cwd(), 'symbols', name, hash);
    await mkdir(symPath);
    await fs.writeFile(symPath + `/${name}.sym`, sym, 'utf8');
    args.push(path.resolve(process.cwd(), 'symbols'));
  }

  const result = await execa(
    path.resolve(
      __dirname,
      '../bin/minidump_stackwalk' + (isWindows ? '.exe' : '')
    ),
    args
  );

  await fs.writeFile(output, result.stdout, 'utf8');
};
