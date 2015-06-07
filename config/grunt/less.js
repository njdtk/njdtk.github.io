'use strict';

module.exports = {
    dev: {
        expand: true,
        ext: '.css',
        cwd: '<%=path.src%>/static/less/',
        src: '**/*.less',
        dest: '<%=path.dest%>/static/css/'
    },
    dist: {
        expand: true,
        ext: '.css',
        cwd: '<%=path.src%>/static/less/',
        src: '**/*.less',
        dest: '<%=path.dest%>/static/css/'
    }
};
