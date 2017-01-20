const webpack = require("webpack"),
    execSync = require('child_process').execSync

const pkg = require('./package.json')
const isProd = process.env.NODE_ENV == 'production' ? true : false

let plugins = [
  new webpack.DefinePlugin({
    REVISION: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
    BUILT_AT: JSON.stringify(new Date().getTime()),
    BUILT_ON: JSON.stringify(execSync('hostname').toString().trim()),
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
  }),
]

if (isProd) {
  plugins = plugins.concat([
    new webpack.optimize.AggressiveMergingPlugin({}),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            screw_ie8: true,
            sequences: true,
            properties: true,
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            if_return: true,
            join_vars: true,
            cascade: true,
            negate_iife: true,
            hoist_funs: true,
            warnings: false,
        },
        mangle: {
            screw_ie8: true,
        },
        output: {
            screw_ie8: true,
            preamble: '/* Uber5 Validator South Africa - ' + new Date() + ' */',
        },
    }),
  ])
}

module.exports = [
  // client (browser)
  {
    entry: {
  	  app: './src/index.js',
    },
    output: {
      path: './',
      filename: 'index.js',
    },
    plugins: plugins,
    devtool: '#source-map',
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [ 'es2015', 'react', 'stage-2' ]
          }
        },
      ]
    },
  },
]
