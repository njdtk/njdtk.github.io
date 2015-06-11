'use strict';

define(['lib/jquery-ui'], function() {

    $.widget('ui.toFix', {
        options: {
            defaultTop: 0,
            startTop: 0,
            fixTop: 0
        },

        _create: function() {
            this.element.css({
                top: this.options.defaultTop
            });
            this._on($(window), this._scrollEvents);
        },

        _resetPosition: function(scrollTop) {
            var self = this,
                ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());

            if (scrollTop >= self.options.startTop) {
                //开始设置
                if (ie) {
                    self.element.css({
                        position: 'absolute',
                        top: scrollTop + self.options.fixTop
                    });
                } else {
                    self.element.css({
                        position: 'fixed',
                        top: self.options.fixTop
                    });
                }
            } else {
                self.element.css({
                    position: 'absolute',
                    top: self.options.startTop
                });
            }

        },

        _scrollEvents: {
            scroll: function(event) {
                var $target = $(event.target);
                _.throttle(this._resetPosition($target.scrollTop()), 100);
            }
        }
    });
});