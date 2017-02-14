module.exports = function(grunt) {
	// grunt.initConfig({
	// 	pkg: grunt.file.readJSON('package.json'),
	// 	sass: {
	// 		dist: {
	// 			files: {
	// 				'assets/style/css/main.css' : 'assets/style/sass/main.scss'
	// 			}
	// 		}
	// 	},
	// 	watch: {
	// 		css: {
	// 			files: '**/*.scss',
	// 			tasks: ['sass']
	// 		}
	// 	}
	// });
	// 	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	//  grunt.registerTask('default',['watch']);



	grunt.loadNpmTasks('grunt-webpack');
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							// This has effect on the react lib size
							"NODE_ENV": JSON.stringify("production")
						}
					}),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			"build-dev": {
				devtool: "sourcemap",
				debug: true
			},
			watch: true
		},
		'webpack-dev-server': {
			options: {
				inline: true,
				watch: true,
				hot: true,
				webpack: webpackConfig,
				publicPath: "/" + webpackConfig.output.path
			},

			start: {
				keepAlive: true,
			}
    },

		// "webpack-dev-server": {

		// 		// options: {
		// 			webpack: webpackConfig,
		// 			publicPath: "/" + webpackConfig.output.path,
		// 			keepAlive: true,
		// 			hot: true,
		// 			inline: true,
		// 			watch: true,
		// 			watchOptions: {
		// 				aggregateTimeout: 300,
		// 				poll: 1000
		// 			},
		// 		// },
		// 			// hot: true,
		// 			// keepAlive: true,
		// 			// inline: true,
		// 		// start: {
		// 		// 	keepAlive: true,
		// 		// 	hot: true,
		// 		// 	inline: true,
		// 		// 	watchOptions: {
		// 		// 		aggregateTimeout: 300,
		// 		// 		poll: 1000
		// 		// 	},
		// 		// 	webpack: {
		// 		// 		devtool: "eval",
		// 		// 		debug: true
		// 		// 	}
		// 		// }
		// },
		watch: {
			// app: {
			// 	files: ["app/**/*", "node_modules/**/*"],
			// 	tasks: ["webpack:build-dev"],
			// 	// tasks: ["webpack"],
			// 	options: {
			// 		spawn: false,
			// 	}
			// },
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},

		sass: {
			dist: {
				files: {
					'assets/style/css/main.css' : 'assets/style/sass/main.scss'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt.registerTask('default',['watch']);

	// The development server (the recommended option for development)
	grunt.registerTask("default", ["webpack-dev-server"]);

	grunt.registerTask('watch',['watch:css']);

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask('dev', ["webpack-dev-server:start", "webpack:build-dev", "watch"]);

	// Production build
	grunt.registerTask('build', ["webpack:build"]);
}