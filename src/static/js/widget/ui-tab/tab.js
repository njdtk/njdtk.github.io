define(['lib/jquery-ui'], function() {

    $.widget('ui.tab', {
        options: {
            titles: []
        },

        _create: function() {
            this.element
            // add a class for theming
            .addClass("ui-tab")
            // prevent double click to select text
            .disableSelection()
            // add class for content theming
            .children().addClass('ui-tab-content');

            var children = this.element.children().clone();

            this.$contents = $('<div class="ui-tab-contents"/>');

            this.element.html(this.$contents);

            this.$contents.append(children);

            this._createTitles();

            this._on(this.element, {
                "click .ui-tab-title": this._clickTab
            });
        },

        _init: function() {
            this.changeTab(0);
        },

        _createTitles: function() {
            var self = this;

            self.$titles = $('<div class="ui-tab-titles"/>');

            $.each(self.options.titles, function(i, title) {
                self.$titles.append('<span class="ui-tab-title">' + title + '</span>');
            });
            self.element.prepend(self.$titles);
        },

        _clickTab:function(e){
        	e.preventDefault();
        	this.changeTab($(e.currentTarget).index());
        },

        changeTab: function(index) {
            this.element.find('.ui-tab-title').eq(index).addClass('selected').siblings().removeClass('selected');
            this.element.find('.ui-tab-content').eq(index).show().siblings().hide();
        }
    });

});