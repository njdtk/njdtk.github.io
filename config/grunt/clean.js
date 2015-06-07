'use strict';

module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '<%=path.dest%>',
                '<%=path.dest%>/*',
                '!<%=path.dest%>/.git*'
            ]
        }]
    },
    server: '<%=path.dest%>'
};
