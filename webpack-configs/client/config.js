/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const getGlobals = require('../plugins/globals');
const getEnvs = require('../utils/dotenv');

getEnvs();

module.exports = function configClientWebpack(props) {
  const { production = true } = props;

  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? 'cheap-source-map' : 'source-map',
    entry: {
      client: ['@babel/polyfill', './client/index.js'],
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, '../..', 'build'),
    },
    resolve: {
      alias: {
        vue$: production ?
          'vue/dist/vue.min.js' :
          'vue/dist/vue.js',
      },
      extensions: ['.js', '.jsx'],
    },    
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]-[local]-[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader',
          },
        },      
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
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'client/index.html',
      }),
    ],
    optimization: production ?
      { minimizer: [new UglifyJsPlugin() ] } :
      {},
  };
};
