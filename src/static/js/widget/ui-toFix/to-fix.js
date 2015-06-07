define(['lib/jquery-ui'], function() {
    $.widget('ui.toFix', {
        options: {
            defaultTop: 0,
            startTop: 0,
            fixTop: 0
        },
    });
    $.fn.topSuction = function(opt) {
        if ($(this).length < 1 || !opt.startTop) {
            return;
        }

        var callbacks = $.Callbacks(),
            isIE6 = !-[1, ] && !window.XMLHttpRequest,
            Timmer = null,
            $this = $(this),
            $win = $(window),
            defaultTop = opt.defaultTop ? opt.defaultTop : 0,
            startTop = opt.startTop,
            fixTop = opt.fixTop ? opt.fixTop : 0,
            first = true,
            resizeFunc = function() {
                if (Timmer) {
                    clearTimeout(Timmer);
                }
                Timmer = setTimeout(function() {
                    if ($win.scrollTop() >= startTop) { /*开始执行事件*/

                        if (first) {
                            if (isIE6) {
                                $this.css({
                                    'position': 'absolute',
                                    'top': $win.scrollTop() + fixTop
                                });
                            } else {
                                $this.css({
                                    'position': 'fixed',
                                    'top': fixTop
                                });
                            }
                            $this.hide().fadeIn('fast');
                            first = false;
                        }

                    } else {
                        $this.css({
                            'position': 'absolute',
                            'top': startTop
                        });
                        first = true;
                    }
                    callbacks.fire();
                }, 40);
            };

        /*初始化top位置*/
        if (defaultTop) {
            $this.css('top', defaultTop);
        }

        /*开始滚动和回复原样的位置*/
        $win.bind('scroll', function() {
            resizeFunc();
        });

        return callbacks;

    };
});