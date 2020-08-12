/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestQuickButton
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         proxy = $.proxy,
         quickClass = "quickClass"

    var GSSQuickButton = widget.extend({

        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            widget.fn.init.call(that, element, options);

            //Template
            that._procTemplate();

            //處理readonly
            if (that.options.readonly_status) {
                that.Breadonly(true);
            }

        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestQuickButton
             * @MemberOf BestQuickButton
             */
            name: "BestQuickButton",

            /**
             * @property {object} dataSource 資料物件(快捷鈕)
             * @default null
             * @MemberOf BestQuickButton
             */
            dataSource: {},

            /**
             * @property {string} text_field 設定dataSource裡的Text Field
             * @default text
             * @MemberOf BestQuickButton
             */
            text_field: ControlDefaultsObject.TextAreaBox.text_field || "text",
            /**
             * @property {string} value_field 設定dataSource裡的Value Field
             * @default value
             * @MemberOf BestQuickButton
             */
            value_field: ControlDefaultsObject.TextAreaBox.value_field || "value",

            /**
             * @property {fn} fn 按鈕事件
             * @default null
             * @MemberOf BestQuickButton
             */
            fn:null,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default false
             * @MemberOf BestQuickButton
             */
            is_target: false,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestQuickButton
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false
        },

        /**
        * @desc 唯讀設定
        * @MemberOf BestPhoneTextBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestQuickButton().Breadonly();
        * 取消唯讀:element.BestQuickButton().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly;

            //執行是否可編輯處理
            if (isReadonly) {
                that.element.find("." + quickClass).hide();
            } else {
                that.element.find("." + quickClass).show();
            }

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 重設Options,會自動更新
         * @memberof BestQuickButton
         * @method BsetOptions
         * @param {object} options 欲修改的options
         * @example
         * 重設: element.BestQuickButton().BsetOptions(false);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            widget.fn.setOptions.call(that, options);

            //重長資料
            that._procTemplate();
        },

        //Template
        _procTemplate: function () {
            var that = this,
                template = "<button type='button'></button>";

            //清空element
            that.element.empty();

            for (var index = 0; index < that.options.dataSource.length; index++) {

                that.quickButton = $(template);
                that.quickButton.BestButton({
                    text: that.options.dataSource[index][that.options.text_field],
                    value: that.options.dataSource[index][that.options.value_field],
                    is_target: false
                });

                that.quickButton.addClass(quickClass);

                //綁定快速按鈕事件，將點選按鈕的值放入textbox中
                that.quickButton.click(function(e){
                    that.options.fn($(this).BestButton().options.text, $(this).BestButton().Bvalue());
                });

                //動態產生快速查詢按鈕
                that.element.append(that.quickButton).append("&nbsp;");

            }
        }
    });

    ui.plugin(GSSQuickButton);

})($);