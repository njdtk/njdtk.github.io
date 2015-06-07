'use strict';

module.exports = {
    // 指定检查或者排除检查的文件/目录列表
    all: [
        'Gruntfile.js',
        '<%=path.src%>/static/js/**/*.js',
        '!<%=path.src%>/static/js/lib/**/*.js'
    ],
    options: {
        // 错误提示美化插件
        reporter: require('jshint-stylish'),
        // 校验规则
        jshintrc: '.jshintrc'
    },
};
