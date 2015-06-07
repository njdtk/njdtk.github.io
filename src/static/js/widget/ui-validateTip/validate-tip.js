define(['lib/jquery-ui'], function() {

    $.widget('ui.validateTip', {
        options: {
            preEl: null,
            tipMsg: null,
            reqMsg: '必填项',
            require: false,
            showTip: true,
            regExp: null, // 正则表达式,如果可以用正则表达式解决的，直接给出匹配的正则表达式，如果不能，此属性不定义，需要重写validateFunc方法。
            hasArrow: false,

            validateFunc: $.noop
        },

        _create: function() {

            this.$tip = $('<span class="ui-validate-tip"/>');
            this.$tip.append('<i/>');

            this.element
            // add a class for theming
            .addClass("ui-validate")
            // prevent double click to select text
            .disableSelection();

            this.element.find(this.options.preEl).after(this.$tip);

            this.options.hasArrow &&
                this.$tip.append('<span class="arrow-border"></span><span class="arrow"></span>');

            this._on(this.element, {
                "input input": this._validate,
                "focus input": this._validate
            });
        },

        _validate: function(e) {
            e.preventDefault();
            var tipMsg = this.options.tipMsg || '',
                reqMsg = this.options.reqMsg,
                $text = this.$tip.find('i'),
                result = this.options.validateFunc(),
                flag = false;

            this.content = $.trim(this.element.find('input').val());
            this.$tip.hide();

            if (this.content) {
                //如果输入非空
                $text.text(tipMsg);

                if (this.options.regExp) {
                    flag = this.options.regExp.test(this.content);
                    flag ?
                        this.$tip.hide() :
                        this.$tip.show();
                    return flag;

                } else {
                    result ? this.$tip.hide() : this.$tip.show();
                    return result;
                }
            } else {
                //输入为空
                if (this.options.require) {
                    //该为必须项
                    $text.text(reqMsg);
                    this.$tip.show();
                    return false;
                } else {
                    this.$tip.hide();
                    return true;
                }
            }

        }
    });
});