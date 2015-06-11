'use strict';
define([
    'lib/jquery-ui',
    'text!widget/ui-progressBar/tpl/progress-bar.tpl'
], function(jqueryUI, tpl) {

    $.widget('ui.progressBar', {

        // default options
        options: {
            steps: [],
            defaultIndex: 1,

            setProgress: null
        },

        _create: function() {
            this.element
            // add a class for theming
            .addClass("ui-progress");

            var barSize = this.options.steps.length || 1;

            this.element.append(_.template(tpl, {
                data: {
                    steps: this.options.steps,
                    barSize: barSize * 2 - 1
                }
            }));
            this.element.find('.progress-item.bar').width(100 / barSize + '%');
        },

        _init: function() {
            this.setProgress(0);
        },

        setProgress: function(index) {
            var $self = this.element,
                $bar = $self.find('.ui-progress-bar'),
                $points = $bar.find('.progress-bar-point');

            for (var i = 0; i < index; i++) {
                $points.eq(i).addClass('on');
                $points.eq(i).next().html('<div class="progress-bar-going"/>');
            }
            $bar.find('.progress-bar-going').last().css('width', '50%');
        }

    });
});