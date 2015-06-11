"use strict";

module.exports = {

    options: {

    	//output the log 
    	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        //sourceMap: true,
        compress: {
            // Remove console function
            'drop_console': true,
            // Set global JavaScript varible value when uglify compressing
            'global_defs': {
                DEBUG: false
            }
        }
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%=path.src%>/static/js/',
            src: '**/*.js',
            dest: '<%=path.dest%>/static/js/',
        }]
    },

    test:{
        files:{
            'test/njdtk.ui.min.js':[
            '<%=path.dest%>/static/js/lib.js',
            '<%=path.dest%>/static/js/widget/main.js',
            'test/main.js']
        }
    }
};