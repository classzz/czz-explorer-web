'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: './favicon.ico'      //增加这条
    }),
  ]
})
