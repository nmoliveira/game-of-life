module.exports = function(grunt) {
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['lib/js/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jasmine: {
    pivotal: {
      src : 'lib/js/*.js',
      options: {
        specs : 'spec/GameSpec.js',
        vendor: [
          "lib/js/vendor/*.js"
        ]
      }
    }
  }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Test task
  grunt.registerTask('test', ["jasmine"]);
  // Default task
  grunt.registerTask('default', ["concat", "uglify"]);
};