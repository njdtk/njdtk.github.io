/**
 * @fileOverview module package config file
 * @author <a href="mailto:njdtk_915@163.com">Zhongzhi</a>
 * @version 0.0.1
 *
 */
 'use strict';

 module.exports = {

    /**
     * Module names are relative to baseUrl
     * Use this syntax: require(['app/controller/Base'], function(Controller) {}
     */
    'lib': [
          // List common dependencies here. Only need to list
          // top level dependencies, "include" will find
          // nested dependencies.
        'jquery',
        'underscore',
        'backbone'
    ]

};
