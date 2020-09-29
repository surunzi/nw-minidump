const path = require('path');
const minidump = require('minidump');
const promisify = require('licia/promisify');

const dumpSymbol = promisify(minidump.dumpSymbol);

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

  const symbol = await minidump.dumpSymbol(binary);
  console.log(symbol);
};
