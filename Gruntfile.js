module.exports = function ( grunt ) {

	// Tasks
	// -------------------------
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.loadNpmTasks('grunt-open');

	// Config
	// -------------------------
	grunt.initConfig({
		pkg: grunt.file.readYAML('_config.yml'),

		sass: {
			dev: {
				options: {
					lineNumbers: true
				},
				files: {
					'css/main.css': [ 'css/_scss/main.scss' ]
				}
			},
			release: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/main.css': [ 'css/_scss/main.scss' ]
				}
			}
		},


		// Server
		// -------------------------
		shell: {
			options: {
				stdout: true
			},
			npm_install: {
				command: 'npm install'
			},
			server: {
				options: {
					async: true
				},
				command: 'jekyll serve -w --config _config.yml,_config-dev.yml'
			}
		},
		open: {
			server: {
				path: 'http://localhost:4000/'
			}
		},


		// Watchers
		// -------------------------
		watch: {
			options: {
				livereload: 1234
			},
			scss: {
				files: ['css/_scss/**/*.scss'],
				tasks: ['sass:dev']
			}
		}
	});


	// Tasks
	// -------------------------
	grunt.registerTask('default', ['sass:dev', 'shell:server', 'open:server', 'watch']);
};
