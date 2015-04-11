'use strict';
var path = require('path');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

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
        stats: {
          colors: false,
          reasons: false
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
			},
			'build-dev': {
				devtool: 'sourcemap',
        debug: true,
        stats: {
          colors: true,
          reasons: true
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
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
          },
          stats: {
            colors: true,
            reasons: true
          }
				}
			}
		},

    connect: {
      options: {
        port: process.env.PORT || 80
      },
      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    watch: {
			app: {
				files: ['<%= pkg.src %>/**/*'],
				tasks: ['webpack:build-dev'],
				options: {
					spawn: false,
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

  // Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask('dev', [
    'webpack:build-dev',
    'watch:app'
  ]);

	// Production build
	grunt.registerTask('prod', [
    'clean:dist',
    'copy:dist',
    'webpack:build',
    'connect:dist'
  ]);

  // The development server (the recommended option for development)
	grunt.registerTask('default', [
    'webpack-dev-server:start'
  ]);

  // The production server
	grunt.registerTask('heroku:production', [
    'prod'
  ]);

};
