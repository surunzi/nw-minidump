exports.getBinaryInfo = function (sym) {
  const firstLine = sym.split('\n')[0];

  const splitInfos = firstLine.split(' ');

  return {
    platform: splitInfos[1],
    arch: splitInfos[2],
    hash: splitInfos[3],
    name: splitInfos.slice(4).join(' '),
  };
};
