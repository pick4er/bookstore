/* eslint-disable-next-line import/no-extraneous-dependencies */
const webpack = require('webpack');

const envs = ['BACKEND_URL', 'PUBLIC_PATH'];

function stringifyEnv(envValue) {
  if (
    typeof envValue === 'boolean' ||
    typeof envValue === 'number'
  ) {
    return envValue;
  }

  return JSON.stringify(envValue);
}

module.exports = function getGlobals() {
  const globals = {};

  envs.forEach(env => {
    globals[env] = stringifyEnv(process.env[env]);
  });

  return new webpack.DefinePlugin(globals);
};
