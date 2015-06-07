'use strict';

require.config({
    baseUrl: 'src/static/js'
});

require([
    'lib',
    'widget/ui-progressBar/progress-bar',
    'widget/ui-validateTip/validate-tip',
    'widget/ui-imgScroll/img-scroll',
    'widget/ui-toFix/to-fix'
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
        tipMsg: 'number',
        regExp: /^\d+$/,
        require: true,
        hasArrow: true
    });

    $('#imgScroll').imgScroll({
        imgs: [
        // {
        //     img: 'img/daniel.jpg'
        // }, {
        //     img: 'img/stevie.jpg'
        // }, {
        //     img: 'img/veronika.jpg'
        // },
        {
        	img: 'http://source.qunarzz.com/site/images/wap/touch/images/v2/hms/wechat_store/v2/scorll-img-1.png'
        },{
        	img: 'http://source.qunarzz.com/site/images/wap/touch/images/v2/hms/wechat_store/v2/scorll-img-1.png'
        }],
        isHref: false,
        imgWidth: 300,
        imgHeight: 300
    });

});