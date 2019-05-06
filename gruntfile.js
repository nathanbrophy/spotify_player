//usage: put this file in the root directory for the relative paths to load correctly. 
//on the command line run grunt [cmd] to run any of the registered grunt tasks, or run grunt to default.
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		clean: ['.tmp'],
				
		concat: {
		  js: {
			src: ['src/public/javascript/*.js', '!src/public/javascript/*.min.js', '!src/public/javascript/index.js', '!src/public/javascript/layout.js'],
			dest: '.tmp/concat/js/application.js'
		  }
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			basic: {
				files: {
					'lib/public/javascript/application.min.js' : ['.tmp/concat/js/application.js'],
					'lib/public/javascript/index.js' : ['src/public/javascript/index.js'],
					'lib/public/javascript/layout.js' : ['src/public/javascript/layout.js']
			}
		  }
		}
	});		
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-banner');
	
	grunt.registerTask('default', ['concat', 'uglify', 'clean']);
	grunt.registerTask('min', ['concat', 'uglify']);
	grunt.registerTask('cleanup', ['clean']);
};