/* eslint-disable import/no-extraneous-dependencies */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import MiniCssPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

import getGlobals from '../plugins/globals';
import getEnvs from '../utils/dotenv';

getEnvs();

const context = {
  DIR: path.resolve('./'),
};

export default function configClientWebpack(props) {
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
        path.join(DIR, 'client'),
      ],
    },
    output: {
      filename: production ? '[name].[hash].js' : 'client.js',
      path: path.join(DIR, 'build'),
      publicPath: process.env.PUBLIC_PATH,
    },
    resolve: {
      alias: {
        vue$: production ?
          'vue/dist/vue.min.js' :
          'vue/dist/vue.js',
      },
      mainFiles: ['index.js'],
      extensions: ['.js', '.jsx', '.styl', '.vue'],
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
          test: /\.(png|jpe?g|woff|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name]@[hash:base64:5].[ext]',
            },
          },
        },
        {
          test: /\.styl|(us)$/,
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
                import: [path.join(DIR, 'client', 'styles', 'import.styl')],
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
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
              ],
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
    ].filter(Boolean),
    optimization: production ?
      { minimizer: [new UglifyJsPlugin()] } :
      {},
  };
};
