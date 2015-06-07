/**
 * @fileOverview requirejs paths and shim config
 *
 * It's required by Gruntfile.js
 */
'use strict';

var baseURL = 'src/static/js';

var require = {

    baseUrl: baseURL,

    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text:'lib/text'
    },

    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'lib/underscore',
                'lib/jquery'
            ],
            exports: 'Backbone'
        }
    }
};

if ( typeof module === 'object' && typeof module.exports === 'object' ) {
    module.exports = {
        paths: require.paths,
        shim: require.shim
    };
}
