import fs from 'fs';

function getExternals() {
  const nodeModules = {};

  fs
    .readdirSync('node_modules')
    .filter(pkg => ['.bin'].indexOf(pkg) === -1)
    .filter(pkg => !/-es6/.test(pkg))
    .forEach(pkg => nodeModules[`${pkg}`] = `commonjs ${pkg}`); /* eslint-disable-line */

  return nodeModules;
}

export default getExternals;
