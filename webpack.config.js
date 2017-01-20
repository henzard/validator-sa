const webpack = require("webpack"),
    execSync = require('child_process').execSync

const pkg = require('./package.json')

let plugins = [
  new webpack.DefinePlugin({
    REVISION: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
    BUILT_AT: JSON.stringify(new Date().getTime()),
    BUILT_ON: JSON.stringify(execSync('hostname').toString().trim()),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
]

module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: './lib',
      filename: pkg.name + '.js',
      library: pkg.name,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: plugins,
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: [ 'es2015', 'stage-2' ]
          }
        },
        {
          test: /.js?$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ]
    },
  },
]
