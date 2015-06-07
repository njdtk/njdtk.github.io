define([
    'lib/jquery-ui',
    'text!widget/ui-imgScroll/tpl/img-scroll.tpl'
], function(jqueryui, tpl) {

    $.widget('ui.imgScroll', {
        options: {
            imgs: [{
                img: '',
                url: '',
                count: ''
            }],
            imgHeight: 340,
            imgWidth: 1000,
            isHref: true,
            timer: 10000
        },

        _create: function() {

            this.element
            // add a class for theming
            .addClass("ui-img-scroll")
            // prevent double click to select text
            .disableSelection();

            this.element.append(_.template(tpl, {
                data: this.options.imgs
            }));

            this.$content = this.element.find('.ui-img-scroll-content');
            this.$pages = this.element.find('.ui-img-scroll-pages');
            this.$pageItem = this.$pages.find('.ui-img-scroll-page');

            //init the size
            this.$content.width(this.options.imgWidth * this.options.imgs.length);
            this.$content.find('.img').width(this.options.imgWidth);
            this.$content.find('img').height(this.options.imgHeight);
            this._on(this.element, {
                "click .ui-img-scroll-page": this._slideTo
            });

            setInterval($.proxy(this.slide, this), this.options.timer);

        },

        _slideTo: function(e) {
            e.preventDefault();
            this._slide($(e.currentTarget).index());
        },

        slide: function(index) {
            var len = this.options.imgs.length;
            if (index || index === 0) {
                this.index = index;
            }
            if (this.index < len) {
                this.$content.css('left', -this.$el.width() * this.index);
                this.$pageItem.removeClass('on');
                $(this.$pageItem[this.index]).addClass('on');
                this.index++;
            } else if (this.index == len) {
                this.$content.css('left', 0);
                this.$pageItem.removeClass('on');
                $(this.$pageItem[0]).addClass('on');
                this.index = 1;
            }
        }
    });

});