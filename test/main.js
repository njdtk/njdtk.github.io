'use strict';

require.config({
    baseUrl: 'src/static/js'
});

require([
    'lib',
    'widget/ui-progressBar/progress-bar',
    'widget/ui-validateTip/validate-tip',
    'widget/ui-imgScroll/img-scroll',
    'widget/ui-toFix/to-fix',
    'widget/ui-tab/tab'
], function() {

    $('#progressBar').progressBar({
        steps: [{
            title: '提交',
            time: ''
        }, {
            title: '审核中',
            time: ''
        }, {
            title: '完成',
            time: ''
        }]
    });
    $('#progressBar').progressBar('setProgress', 2);

    $('#validateTip').validateTip({
        preEl: 'input',
        tipMsg: '亲，只能输入数字',
        regExp: /^\d+$/,
        require: true,
        hasArrow: true
    });

    $('#imgScroll').imgScroll({
        imgs: [
        {
            img: 'http://img4q.duitang.com/uploads/item/201409/02/20140902092832_yXjHn.jpeg'
        }, {
            img: 'http://cdnq.duitang.com/uploads/item/201409/02/20140902092818_vK5am.jpeg'
        }, {
            img: 'http://img5q.duitang.com/uploads/item/201407/25/20140725112104_PKJuR.jpeg'
        }],
        isHref: false,
        imgWidth: 300,
        imgHeight: 300
    });

    $('#tab').tab({
        titles:['title1','title2']
    });

});