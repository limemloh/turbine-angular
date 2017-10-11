'use strict';

// Modules
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    entry: {
      app: './src/app/app.js'
    },

    output: {
      path: __dirname + '/dist',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    module: {
      rules: [
        {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}, 
        {test: /\.html$/, loader: 'raw-loader'}
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      })
    ],
    devServer: {
      contentBase: './src/public',
      stats: 'minimal'
    }
  };
};
