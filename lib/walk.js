const path = require('path');
const execa = require('execa');
const fs = require('licia/fs');
const promisify = require('licia/promisify');
const mkdir = promisify(require('licia/mkdir'));
const isWindows = require('licia/isWindows');
const dump = require('./dump');
const util = require('./util');

module.exports = async function (dmp, options) {
  const { output, binary, symbol } = options;
  const args = [dmp];

  const syms = [];
  if (symbol) {
    for (let i = 0, len = symbol.length; i < len; i++) {
      syms.push(await fs.readFile(symbol[i], 'utf8'));
    }
  }
  if (binary) {
    for (let i = 0, len = binary.length; i < len; i++) {
      syms.push(await dump(binary[i], {}));
    }
  }
  if (syms.length > 0) {
    for (let i = 0, len = syms.length; i < len; i++) {
      await prepareSymbols(syms[i]);
    }
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

async function prepareSymbols(sym) {
  const { name, hash } = util.getBinaryInfo(sym);
  const symPath = path.resolve(process.cwd(), 'symbols', name, hash);
  await mkdir(symPath);
  await fs.writeFile(symPath + `/${name}.sym`, sym, 'utf8');
}
