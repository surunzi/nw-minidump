const path = require('path');

module.exports = function (dmp, options) {
  let { binary, output } = options;

  if (!output) {
    output = dmp + '.txt';
  }
  dmp = path.resolve(process.cwd(), dmp);
  output = path.resolve(process.cwd(), output);
  if (binary) {
    binary = path.resolve(process.cwd(), binary || '');
  }
};
