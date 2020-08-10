/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

/**
 * @classdesc 繼承kendo.AutoComplete <a href="http://docs.telerik.com/kendo-ui/api/web/autocomplete" target="_blank"> Reference </a>
 * @class BestAutoComplete
 */

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        autocomplete = ui.AutoComplete,
        ns = ".kendoAutoComplete",
        proxy = $.proxy;

    var GSSAutoComplete = autocomplete.extend({

        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            autocomplete.fn.init.call(that, element, options);            

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.parent().after("<span>" + that.options.suffix + "</span>");
            }

            that.element.on("blur" + ns, proxy(that._blur, that));

            if (that.options.is_escape_confirm) {
                that.element.on("change" + ns, proxy(this._customchange, this));
            }
        },

        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestAutoComplete
             * @MemberOf BestAutoComplete
             */
            name: "BestAutoComplete",
            /**
             * @property {string} suffix 後綴詞
             * @default string.empty
             * @MemberOf BestAutoComplete
             */
            suffix: ControlDefaultsObject.AutoComplete.suffix || null,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestAutoComplete
             */
            is_escape_confirm: ControlDefaultsObject.AutoComplete.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestAutoComplete
             */
            is_change: ControlDefaultsObject.AutoComplete.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestAutoComplete
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestAutoComplete
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestAutoComplete
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestAutoComplete
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestAutoComplete
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestAutoComplete
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestAutoComplete
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },

        /**
        * @desc 唯讀處理
        * @MemberOf BestAutoComplete
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestAutoComplete().Breadonly();
        * 取消唯讀:element.BestAutoComplete().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                isDisable = false;

            //執行原生的readonly method
            that.readonly(isReadonly);

            //readonly為false
            if (!isReadonly) {
                //非唯讀狀態, 則要依據readonly_mode回到初始狀態
                switch (that.options.readonly_mode.toString()) {
                    case "Y":   //唯讀
                        isReadonly = true;
                        break;
                    case "N":   //非唯讀
                        isReadonly = false;
                        break;
                }
            }

            //執行是否可編輯處理
            this._editable({
                readonly: isReadonly,
                disable: isDisable
            });

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestAutoComplete
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestAutoComplete().Brequired();
         * 不必填: element.BestAutoComplete().Brequired(false);
         */
        Brequired: function (required) {

            var that = this
                , isRequired = required === undefined ? true : required;

            if (!isRequired) {
                if (that.options.required_mode != "N") {
                    isRequired = true;
                }
            }

            //設定控制項必填狀態
            that.options.required_status = isRequired;

        },

        /**
         * @desc 重新設定Options
         * @memberof BestAutoComplete
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestTextBox().BsetOptions(obj);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            ui.Widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設/取值 TextBox value
         * @memberof BestAutoComplete
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 TextBox Value
         * @example
         * 取值:element.BestAutoComplete().Bvalue();
         * 設值:element.BestAutoComplete().Bvalue(setValue);
         */
        Bvalue: function (setValue) {
            var that = this, intervalLength, getValue;

            //取值
            if (setValue == null) {

                if (that.options.separator != null) {
                    //取得回值資料
                    getValue = that.element.data("kendo" + that.options.name).value();
                    //計算要return的字串長度(為了避免字串最後會再出現separator資料)
                    intervalLength = getValue.length - that.options.separator.length;                          

                    return getValue.substr(0, intervalLength);
                }
                else {
                    return that.element.data("kendo" + that.options.name).value();
                }

            }

            //設值
            if (setValue != null) {

                that.element.data("kendo" + that.options.name).value(setValue);

            }
        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestAutoComplete
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            that.element.focus();

        },

        _blur: function () {
            if (this._chkRequired()) {
                
                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(this.element.attr("id"));
                }

            }
        },

        //change事件
        _customchange: function () {
            this.options.is_change = true;
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.Bvalue().toString().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this;

            if (!that._chkReadOnlyStatus() && that.Bvalue().toString().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查控制項目前必填狀態, 回傳:true必填, false非必填
        _chkRequiredStatus: function () {

            var that = this
                , isRequired = that.options.required_status;

            if (!isRequired) {
                //當非必填狀態下, 需要額外判斷必填模式
                if (that.options.required_mode != "N") isRequired = true;
            }

            return isRequired;

        },

        //檢查控制項目前唯讀狀態, 回傳:true唯讀, false非唯讀
        _chkReadOnlyStatus: function () {

            var that = this
                , isReadOnly = that.options.readonly_status;

            if (!isReadOnly) {
                //當非唯讀狀態下, 需要額外判斷唯讀模式
                if (that.options.readonly_mode == "Y") isReadOnly = true;
            }

            return isReadOnly;

        }

    });

    ui.plugin(GSSAutoComplete);

    //===================================== Private Method =====================================
    function ProcReadonly(obj) {
        /// <summary>
        /// 處理element是否唯讀
        /// </summary>

        //初始就唯讀情況
        //1. 依據唯讀模式設定控制項唯讀
        //2. 受整頁唯讀控管
        if (obj.options.readonly_mode == "Y" || obj.options.readonly_status) {
            obj.Breadonly(true);
        }

    }

    function ProcRequired(obj) {
        /// <summary>
        /// 處理element是否必填
        /// </summary>

        //設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算必填狀態)
        if (obj.options.required_mode != "N") {
            obj.Brequired(true);
        }
    }

    //===================================== Private Method =====================================

})($);