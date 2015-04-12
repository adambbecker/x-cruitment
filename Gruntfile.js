'use strict';
var path = require('path');

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var pkgConfig = grunt.file.readJSON('package.json');

  // webpack
  var webpack = require('webpack');
	var webpackConfig = require('./webpack.config.js');

  // init
  grunt.initConfig({

    pkg: pkgConfig,

    webpack: {
			options: webpackConfig,
			build: {
        output: {
          path: path.join(__dirname, pkgConfig.dist),
          publicPath: '',
          filename: '[name].js',
          chunkFilename: '[chunkhash].js'
        },
				plugins: [
					new webpack.DefinePlugin({
						'process.env': {
							// This has effect on the react lib size
							'NODE_ENV': JSON.stringify('production')
						}
					}),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin()
				]
			}
		},

		'webpack-dev-server': {
			options: {
        port: 8000,
				webpack: webpackConfig,
				publicPath: '/<%= pkg.dist %>/',
        contentBase: './<%= pkg.src %>/'
			},
			start: {
				keepAlive: true,
				webpack: {
					devtool: 'eval',
					debug: true,
          output: {
            path: path.join(__dirname, pkgConfig.dist),
            publicPath: '<%= pkg.dist %>/',
            filename: '[name].js',
            chunkFilename: '[chunkhash].js'
          }
				}
			}
		},

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    },

    copy: {
      dist: {
        src: '<%= pkg.src %>/index.html',
        dest: '<%= pkg.dist %>/index.html',
        options: {
          process: function (content, srcpath) {
            return content.replace('dist/main.js', 'main.js');
          }
        }
      }
    }

  });

	// Production build
	grunt.registerTask('prod', [
    'clean:dist',
    'copy:dist',
    'webpack:build'
  ]);

  // The development server (the recommended option for development)
	grunt.registerTask('default', [
    'webpack-dev-server:start'
  ]);

  // Heroku
  // hook for https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt
	grunt.registerTask('heroku', [
    'prod'
  ]);

};
