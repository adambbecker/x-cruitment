/*
 * Webpack development server configuration
 */
'use strict';
var path = require('path');
var gruntFile = require('grunt/lib/grunt/file');
var pkgConfig = gruntFile.readJSON('package.json');

module.exports = {

  entry: {
    main: './' + pkgConfig.src + '/main.js'
  },

  // output: {
  //   path: path.join(__dirname, pkgConfig.dist),
  //   publicPath: pkgConfig.dist + '/',
  //   filename: '[name].js',
  //   chunkFilename: '[chunkhash].js'
  // },

  cache: true,

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsx-loader?harmony'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!autoprefixer-loader'
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }

};
