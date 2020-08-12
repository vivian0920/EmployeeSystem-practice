/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @classdesc 繼承kendo.Button <a href="http://docs.telerik.com/kendo-ui/api/web/button" target="_blank"> Reference </a>
 * @class BestButton
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         button = ui.Button;

    var GSSButton = button.extend({

        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);
            
            button.fn.init.call(that, element, options);

            //將options.text Bind在畫面上
            if (that.options.text != null) {
                that.element.append(that.options.text);
            }

            //處理readonly
            if (that.options.readonly_status) {
                that.Breadonly(true);
            }
            
        },

        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestButton
             * @MemberOf BestButton
             */
            name: "BestButton",
            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestButton
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,
            /**
             * @property {string} value 實際值
             * @default null
             * @MemberOf BestButton
             * @desc 記錄實際值
             */
            value: null,
            /**
             * @property {string} text 呈現文字
             * @default null
             * @MemberOf BestButton
             */
            text: null,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestButton
             */
            is_target: true
        },

        /**
         * @desc 唯讀處理
         * @memberof BestButton
         * @method Breadonly
         * @param {boolean} readonly 是否唯讀
         * @example
         * element.BestButton().Breadonly();
         */
        Breadonly: function (readonly) {
            readonly = readonly || true;
            
            if (readonly) {
                this.element.hide();
            }

            if (!readonly) {
                this.element.show();
            }

        },

        /**
         * @desc 設/取值 button value
         * @memberof BestButton
         * @method Bvalue
         * @param {string} value 設定值
         * @example
         * 取值:element.BestButton().Bvalue();
         * 設值:element.BestButton().Bvalue(value);
         */
        Bvalue: function (value) {
            var that = this;

            //取值
            if (value === undefined) {
                return that.options.value;
            }

            //設值,需檢視是否有不合法字元,若有則刪除該字元
            if (value !== undefined) {
                that.options.value = value;
            }

        },
        /**
         * @desc 重新設定Options
         * @memberof BestButton
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestButton().BsetOptions(obj);
         */
        BsetOptions: function (options) {
        var that = this;

            //重新設定Options資料
        widget.fn.setOptions.call(that, options);

    }
    });    

    ui.plugin(GSSButton);

})($);