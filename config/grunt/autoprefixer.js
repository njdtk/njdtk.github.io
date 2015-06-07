'use strict';

module.exports = {
    options: {
        browsers: ['last 4 version']
    },
    dev: {
        files: [{
            src: '<%=path.dest%>/static/css/**/*.css'
        }]
    },
    dist: {
        src: '<%=path.dest%>/static/css/**/*.css'
    }
};
