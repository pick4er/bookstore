/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getGlobals = require('../plugins/globals');
const getEnvs = require('../utils/dotenv');

getEnvs();

module.exports = function configClientWebpack(props) {
  const { production = true } = props;

  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    entry: {
      client: ['@babel/polyfill', './client/index.js'],
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, '../..', 'build'),
    },
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
    plugins: [
      getGlobals(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'client/index.html',
      }),
    ],
  };
};
