module.exports = (grunt) ->
	
	
	
	grunt.loadNpmTasks 'grunt-contrib-connect'
	grunt.loadNpmTasks 'grunt-contrib-jshint'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-autoprefixer'
	grunt.loadNpmTasks 'grunt-open'
	grunt.loadNpmTasks 'grunt-static-inline'
	
	


	grunt.initConfig
		connect:
			all:
				options:
					port: 9000
					hostname: 'localhost'

		open:
			all:
				path: 'http://localhost:9000/'

		watch:
			options:
				livereload: true
			sass:
				files: './*.scss'
				tasks: ['sass', 'autoprefixer', 'staticinline']
			html:
				files: ['./*.html']
				tasks: ['jshint', 'sass', 'autoprefixer', 'staticinline']
			javascript:
				files: './*.js'
				tasks: ['jshint', 'staticinline']

		sass:
			dev:
				options:
					style: 'compressed'
				files: [{
					expand: true,
					cwd: './',
					src: ['*.scss'],
					dest: './',
					ext: '.css'
				}]

		jshint:
			options:
				debug: true
				globals:
				    jQuery: true
				    debugger: true
			dev: './*.js'

		autoprefixer:
			dev:
				options:
					map: true
				expand: true
				flatten: true
				src: './*.css'
				dest: './'

		# Add inline="true" to the asset call : <link rel="stylesheet" href="css/main.css" inline="true">
		staticinline:
			dist:
				options:
					basepath: './'
				files:
					'../polymer-speedread.html': './polymer-speedread.html'







	grunt.registerTask 'default', ['jshint']

	grunt.registerTask 'server', [
		'jshint',
		'sass', 'autoprefixer',
		'staticinline',
		'connect', 'open', 'watch'
	]











