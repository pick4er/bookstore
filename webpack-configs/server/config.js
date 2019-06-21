const path = require('path');

const getExternals = require('../utils/externals');

module.exports = function configServerWebpack(props) {
  const { production = true } = props;

  return {
    target: 'node',
    mode: production ? 'production' : 'development',
    entry: {
      server: ['@babel/polyfill', './server/index.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../..', 'build'),
      libraryTarget: 'commonjs',
    },
    externals: getExternals(),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
