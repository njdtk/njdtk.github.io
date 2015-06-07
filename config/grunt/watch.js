'use strict';

module.exports = {
    less: {
        files: [
            // match all files ending with .less in the yo.src subdirectory
            // and all of its subdirectories.
            '<%=path.src%>/static/less/**/*.less'
        ],
        tasks: ['newer:less:dev', 'newer:autoprefixer:dev']
    },
    icon: {
        files: [
            '<%=path.src%>/static/images/**/{icons,repeat-x,repeat-y}/*.png',
            '!<%=path.src%>/static/images/**/sprite.png'
        ],
        tasks: ['sprite']
    },
    livereload: {
        options: {
            livereload: '<%=livereloadPort%>'
        },
        files: [
            '<%=path.src%>/static/less/**/*.less',
            '!<%=path.src%>/node_modules/**',
            '<%=path.src%>/**/*.{js,png,jpg,jpeg,gif,ttf,webp,svg}'
        ]
    }
};
