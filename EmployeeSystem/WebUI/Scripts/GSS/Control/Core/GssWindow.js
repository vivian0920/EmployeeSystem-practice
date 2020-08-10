/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Window = ui.Window,
        proxy = $.proxy,
        extend = $.extend;

    /**
     * @classdesc 繼承kendo.window <a href="http://docs.telerik.com/kendo-ui/api/web/window" target="_blank"> Reference </a>
     * @class BestWindow
     */

    var GSSWindow = Window.extend({

        //Init事件
        init: function (element, options) {

            var that = this, initOptions = {},
                actions = ControlDefaultsObject.Window.actions || [
                "Minimize",
                "Maximize",
                "Close"
                ],
                defaultOptions = $.extend({}, that.options);

            //當處理options完成後,若actions無設定時,則需使用預設值(主要是為了解決當從外部傳入的資料少於預設值時,會發生除了傳入值外還會加上預設值的問題)
            if (options.actions === undefined) {
                options.actions = actions;
            }

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            Window.fn.init.call(that, element, options);

            that._create();

        },

        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestWindow
             * @MemberOf BestWindow
             */
            name: "BestWindow",
            /**
             * @property {string} title 另開視窗的Title設定
             * @default New Window
             * @MemberOf BestWindow
             */
            title: ControlDefaultsObject.Window.title || "New Window",
            /**
             * @property {string} width 另開視窗的寬度設定
             * @default 600px
             * @MemberOf BestWindow
             */
            width: ControlDefaultsObject.Window.width || "600px",
            /**
             * @property {array} actions 另開視窗允許的動作
             * @default ["Minimize","Maximize","Close"]
             * @MemberOf BestWindow
             * @desc 允許動作的設定,可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-actions)
             */
            actions: [],
            /**
             * @property {boolean} modal 是否lock原視窗
             * @default true
             * @MemberOf BestWindow
             */
            modal: ControlDefaultsObject.Window.modal || true,
            /**
             * @property {object} position 設定視窗呈現位置
             * @default {top: 100, left: 250}
             * @MemberOf BestWindow
             * @desc 其設定可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-position)
             */
            position: ControlDefaultsObject.Window.position || {
                top: 100,
                left: 250
            },
            iframe: ControlDefaultsObject.Window.iframe || false,
            /**
             * @property {object} parameter 外部欲傳給window內的資料物件
             * @default null
             * @MemberOf BestWindow
             */
            parameter: null,
            /**
             * @property {object} result window欲傳出外部的資料物件
             * @default null
             * @MemberOf BestWindow
             */
            result: null,
            fn: null
        },

        /**
         * @desc 執行options.fn
         * @memberof BestWindow
         * @method execfn
         * @example
         * $.BestWindow().execfn();
         */
        execfn: function () {
            this.options.fn(this.options.result);
        },

        /**
         * @desc 設/取 options.parameter資料
         * @memberof BestWindow
         * @method parameter
         * @param {object} setValue 設定值(可不傳)
         * @return {object} 取得options.parameter資料
         * @example
         * 取值:$.BestWindow().parameter();
         * 設值:$.BestWindow().parameter(setValue);
         */
        parameter: function (setValue) {

            //取parameter
            if (setValue == null) {
                return this.options.parameter;
            }

            //設定parameter
            if (setValue != null) {
                this.options.parameter = setValue;
            }
        },

        /**
         * @desc 設/取值 options.result資料
         * @memberof BestWindow
         * @method result
         * @param {object} setValue 設定值(可不傳)
         * @return {object} 取得options.result資料
         * @example
         * 取值:$.BestWindow().result();
         * 設值:$.BestWindow().result(setValue);
         */
        result: function (setValue) {

            //取得所選取的資料物件
            if (setValue == null) {
                return this.options.result;
            }

            //設定所選取的資料物件
            if (setValue != null) {
                this.options.result = setValue;
            }

        },

        _create: function () {

            var that = this,
                objWindow = that.element.data("kendo" + that.options.name);

            //重新設定Title
            that.title(that.options.title);

            //註冊window開啟時, 需要額外執行增加錯誤訊息視窗的編號
            objWindow.bind("open", that._openWindowEvent);

            //註冊window關閉時, 需要額外執行刪除錯誤訊息視窗
            objWindow.bind("close", that._closeWindowEvent);

        },

        _ajaxRequest: function (options) {
            this._loadingIconTimeout = setTimeout(proxy(this._showLoading, this), 100);

            $.ajax(extend({
                type: "GET",
                dataType: "html",
                cache: false,
                error: proxy(this._ajaxError, this),
                complete: proxy(this._ajaxComplete, this),
                success: proxy(this._ajaxSuccess(options.template), this)
            }, options));
        },

        _openWindowEvent: function () {

            var that = this;
            
            //新增錯誤訊息視窗
            BaseObject.ErrorDialogIndex += 1;

        },

        _closeWindowEvent: function () {

            var that = this;

            //清除畫面上的錯誤訊息視窗
            ErrorDialogObservableObject.DeleteErrorDialog();

            //多增加關閉後直接刪除畫面上Window(包含html)的功能
            that.destroy();

        }

    });

    ui.plugin(GSSWindow);

})($);