/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const getGlobals = require('../plugins/globals');
const getEnvs = require('../utils/dotenv');

getEnvs();

const context = {
  DIR: path.resolve('./'),
};

module.exports = function configClientWebpack(props) {
  const { production = true } = props;
  const { DIR } = context;

  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? 'cheap-source-map' : 'source-map',
    context: DIR,
    entry: {
      client: [
        '@babel/polyfill', 
        path.join(DIR, 'client', 'index.js'),
      ],
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
      mainFiles: ['index.js'],
      extensions: ['.js', '.jsx', '.styl'],
      modules: [DIR, 'node_modules'],
    },    
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader',
          },
        },
        {
          test: /\.styl$/,
          use: [
            production ?
              MiniCssPlugin.loader :
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
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins() { return [autoprefixer]; },
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                import: [path.resolve(__dirname, '../..', 'client', 'styles', 'import.styl')],
              },
            },
          ],
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
      new MiniCssPlugin({
        filename: '[name]@[hash:12].css',
      }),      
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
