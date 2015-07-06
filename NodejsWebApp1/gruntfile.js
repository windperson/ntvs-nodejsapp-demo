module.exports = function (grunt) {
    /// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* build at <%= grunt.template.today("yyyy-mm-dd_HH:MM:ss") %> */',
            },
            my_target: {
                files: {
                    '../build/server.min.js': ['server.js']
                }
            }
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};