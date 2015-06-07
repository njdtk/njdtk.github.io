'use strict';

var fs = require('fs'),
    path = require('path'),
    querystring = require('querystring'),

    // LiveReload的默认端口号
    LIVERELOAD_PORT = 35732,

    // 使用connect-livereload模块，生成一个LiveReload脚本
    // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
    lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });

module.exports = function(grunt) {

    var rewriteRulesSnippet = require('./node_modules/grunt-connect-route/lib/utils').rewriteRequest,

        path = require('./config/path'),

        getModulesConfig = function(dir) {
            var excludeModules = [];
            var moduleConfig = require('./config/bundle') || {};
            var returnConfig = [];

            for (var key in moduleConfig) {
                returnConfig.push({
                    name: key,
                    include: moduleConfig[key]
                });
                excludeModules.push(key);
            }

            grunt.file.recurse(dir, function(abspath, rootdir, subdir, filename) {
                if (filename === 'main.js') {
                    returnConfig.push({
                        name: 'widget/' + (subdir ? subdir + '/' : '') + filename.replace('.js', ''),
                        exclude: excludeModules
                    });
                }
            });
            
            return returnConfig;
        },

        // Grunt configuration
        config = {

            pkg: grunt.file.readJSON('package.json'),

            //config the project files path
            path: path,

            /**
             * Run predefined tasks whenever watched file patterns are added, changed or deleted.
             */
            watch: require('./config/grunt/watch'),

            /**
             * Open urls and files from a grunt task.
             */
            open: require('./config/grunt/open'),

            /**
             * Clean files and folders.
             */
            clean: require('./config/grunt/clean'),

            /**
             * Start a connect web server.
             */
            connect: {
                options: {
                    port: grunt.option('port') || 9001,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: '*',
                    //localhost: 'njdtk.com',
                    localhost: grunt.option('host') || 'njdtk.com'
                },
                livereload: {
                    options: {
                        middleware: function(connect, options) {
                            return [
                                lrSnippet,
                                // 静态文件服务器的路径
                                connect.static('.'),
                                // 启用目录浏览(相当于IIS中的目录浏览)
                                connect.directory('.')
                            ];
                        }
                    }
                },
                dist: {
                    livereload: false,
                    options: {
                        base: [path.dest]
                    }
                },
            },

            // Package JS files into bundles
            requirejs: {
                dist: {
                    // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                    options: {
                        appDir: '<%=path.src%>/static/js',
                        baseUrl: '.',
                        paths: require('./src/static/js/require-config').paths,
                        shim: require('./src/static/js/require-config').shim,
                        dir: '<%=path.dest%>/static/js', //build dir
                        optimize: 'none',
                        findNestedDependencies: true,
                        inlineText: true,
                        removeCombined: true,
                        modules: getModulesConfig('./src/static/js/widget')
                    }
                }
            },

            /**
             * Validate files with JSHint.
             */
            jshint: require('./config/grunt/jshint'),

            less: require('./config/grunt/less'),

            /**
             * Parse CSS and add prefixed properties and values by Can I Use database
             * for actual browsers. Based on Autoprefixer.
             */
            autoprefixer: require('./config/grunt/autoprefixer'),

            /**
             * Minify files  or beatutify with UglifyJS
             */
            uglify: require('./config/grunt/uglify')
        };


    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);



    grunt.initConfig(config);

    // Registration start a local web server tasks
    grunt.registerTask('server', function() {
        var args = Array.prototype.slice.call(arguments, 0);
        var tasks = [];

        // Compile and preview the compiled result
        if (grunt.option('dist')) {
            tasks = [
                'build',
                'configureRewriteRules',
                'connect:dist:keepalive'
            ];
        } else {
            tasks = [
                'clean:server',
                'less:dev',
                'autoprefixer:dev',
                'uglify'
            ];
            if (args.indexOf('norewrite') === -1) {
                tasks.push('configureRewriteRules');
            }
            tasks.push('connect:livereload');
            if (args.indexOf('noopen') === -1) {
                tasks.push('open');
            }
            tasks.push('watch');
        }

        grunt.task.run(tasks);
    });

    // 默认被执行的任务列表。
    grunt.registerTask('build', [
        'clean:dist',
        'uglify',
        'less',
        'autoprefixer:dist',
        'requirejs',
        'uglify:test',
        'jshint'
    ]);

    // 注册Grunt默认任务
    grunt.registerTask('default', [
        'less',
        'jshint'
    ]);

};