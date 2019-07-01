import path from 'path';

import getGlobals from '../plugins/globals';
import getExternals from '../utils/externals';
import getEnvs from '../utils/dotenv';

getEnvs();

const context = {
  DIR: path.resolve('./'),
};

export default function configServerWebpack(props) {
  const { production = true } = props;
  const { DIR } = context;

  return {
    target: 'node',
    mode: production ? 'production' : 'development',
    context: path.resolve('./'),    
    entry: {
      server: [
        '@babel/polyfill', 
        path.join(DIR, 'server'),
      ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../..', 'build'),
      libraryTarget: 'commonjs',
      publicPath: process.env.PUBLIC_PATH,
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
    ],
  };
};
