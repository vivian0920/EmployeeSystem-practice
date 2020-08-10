/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

/**
 * @class BestIntervalTextBox
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         ns = ".kendoIntervalTextBox",
         className = "kendoIntervalTextBox",
         proxy = $.proxy;

    var GSSIntervalTextBox = widget.extend({

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

            element = that.element;

            //Template
            that._procTemplate();

            //處理readonly_mode
            that._procReadonlyMode();

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
            
        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestIntervalTextBox
             * @MemberOf BestIntervalTextBox
             */
            name: "BestIntervalTextBox",
            /**
             * @property {string} suffix TextBox的後綴詞
             * @default string.empty
             * @MemberOf BestIntervalTextBox
             */
            suffix: ControlDefaultsObject.IntervalTextBox.suffix || null,
            /**
             * @property {string} interval_symbol 區間分隔符號
             * @default ~
             * @MemberOf BestIntervalTextBox
             */
            interval_symbol: ControlDefaultsObject.IntervalTextBox.interval_symbol || "~",
            /**
             * @property {string} mode TextBox的資料模式
             * @default None
             * @MemberOf BestIntervalTextBox
             */
            mode: ControlDefaultsObject.IntervalTextBox.mode || "None",
            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default string.empty
             * @MemberOf BestIntervalTextBox
             */
            placeholder: ControlDefaultsObject.IntervalTextBox.placeholder || null,
            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestIntervalTextBox
             * @desc Y:兩個TextBox皆為必填<br/>1:第一個TextBox必填,第二個TextBox非必填<br/>2:第一個TextBox非必填,第二個TextBox必填<br/>3:擇一必填<br/>4:成對填或成對不填<br/>N:兩個TextBox皆非必填
             */
            required_mode: ControlDefaultsObject.IntervalTextBox.required_mode || "N",
            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestIntervalTextBox
             * @desc Y:兩個TextBox皆為唯讀<br/>1:第一個TextBox唯讀,第二個TextBox非唯讀<br/>2:第一個TextBox非唯讀,第二個TextBox唯讀<br/>N:兩個TextBox皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.IntervalTextBox.readonly_mode || "N",

            //NumericTextBox 使用的設定
            /**
             * @property {string} unit 單位
             * @default [Percent]為100<br/>[Currency]為1000<br/>[Number]為1
             * @MemberOf BestIntervalTextBox
             */
            unit: ControlDefaultsObject.IntervalTextBox.unit || null,
            /**
             * @property {int} decimals 小數點位數
             * @default null
             * @MemberOf BestIntervalTextBox
             */
            format: ControlDefaultsObject.IntervalTextBox.format || null,
            /**
             * @property {int} decimals 小數點位數
             * @default null
             * @MemberOf BestIntervalTextBox
             */
            decimals: ControlDefaultsObject.IntervalTextBox.decimals || null,
            /**
             * @property {string} minus_format 負數格式
             * @default Minus
             * @MemberOf BestIntervalTextBox
             * @desc 內含兩種格式<br/>[Minus]-1<br/>[Parenthesis](1)
             */
            minus_format: ControlDefaultsObject.IntervalTextBox.minus_format || 'Minus',
            /**
             * @property {string} carry_method 小數點進位方式
             * @default Round
             * @MemberOf BestIntervalTextBox
             * @desc 內含三種格式<br/>[Round]四捨五入<br/>[Floor]無條件捨去<br/>[Ceil]無條件進位
             */
            carry_method: ControlDefaultsObject.IntervalTextBox.carry_method || 'Round',

            //TextBox 使用的設定
            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestIntervalTextBox
             */
            special_character: ControlDefaultsObject.IntervalTextBox.special_character || true,
            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestIntervalTextBox
             * @desc 當special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            allow_special_character: ControlDefaultsObject.IntervalTextBox.allow_special_character || "",
            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestIntervalTextBox
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.IntervalTextBox.case_format || "None",
            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestIntervalTextBox
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.IntervalTextBox.half_full_width || "None",
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestIntervalTextBox
             */
            is_escape_confirm: ControlDefaultsObject.IntervalTextBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestIntervalTextBox
             */
            is_change: ControlDefaultsObject.IntervalTextBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestIntervalTextBox
             */
            is_target: true,
            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestIntervalTextBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,
            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestIntervalTextBox
             */
            error_message: "",
            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestIntervalTextBox
             */
            validation_group: "",
            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestIntervalTextBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },

        /**
        * @desc 唯讀處理
        * @MemberOf BestIntervalTextBox
        * @method readonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestIntervalTextBox().Breadonly();
        * 取消唯讀:element.BestIntervalTextBox().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                objFirst = that._getFirstIntervalObj(),
                objSecond = that._getSecondIntervalObj();

            objFirst.Breadonly(isReadonly);
            objSecond.Breadonly(isReadonly);

            //設定控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestIntervalTextBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 唯讀: element.BestIntervalTextBox().Brequired();
         * 不唯讀: element.BestIntervalTextBox().Brequired(false);
         */
        Brequired: function (required) {

            var that = this,
                isRequired = required === undefined ? true : required;

            if (!isRequired) {
                if (that.options.required_mode != "N") {
                    isRequired = true;
                }
            }

            //設定控制項必填狀態
            that.options.required_status = isRequired;

        },

        /**
         * @desc 重設Options
         * @memberof BestIntervalTextBox
         * @method BsetOptions
         * @param {object} options 欲修改的options
         * @example
         * 重設: element.BestIntervalTextBox().Brequired(false);
         */
        BsetOptions: function (options) {
            var that = this;

            that._setEvents(options);

            //重新設定Options資料
            widget.fn.setOptions.call(that, options);

            //set Readonly Mode
            that._procReadonlyMode();

            //重設定required
            ProcRequired(that);
        },

        /**
         * @desc 設/取值 First TextBox Value
         * @MemberOf BestIntervalTextBox
         * @method firstvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 First TextBox Value
         * @example
         * 取值:element.BestIntervalTextBox().firstvalue();
         * 設值:element.BestIntervalTextBox().firstvalue(setValue);
         */
        firstvalue: function (setValue) {
            var that = this, objFirst = that._getFirstIntervalObj();

            //取值
            if (setValue == null) {
                return objFirst.Bvalue();
            }

            //設值
            if (setValue != null) {
                objFirst.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 Second TextBox Value
         * @MemberOf BestIntervalTextBox
         * @method secondvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 Second TextBox Value
         * @example
         * 取值:element.BestIntervalTextBox().secondvalue();
         * 設值:element.BestIntervalTextBox().secondvalue(setValue);
         */
        secondvalue: function (setValue) {
            var that = this, objSecond = that._getSecondIntervalObj();

            //取值
            if (setValue == null) {
                return objSecond.Bvalue();
            }

            //設值
            if (setValue != null) {
                objSecond.Bvalue(setValue);
            }

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestIntervalTextBox
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            //由於span不提供focus, 所以目前做法先聚焦至畫面上第一個input
            //取得data-role含有best,且具有required,但非含有readonly,disabled的control
            that.element.find("input.kendoIntervalTextBox:not([readonly=true],[readonly=readonly],[disabled]):first").focus();

        },

        _blur: function () {
            if (this._chkRequired()) {

                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(this.element.attr("id"));
                }

            }
        },

        //change事件
        _change: function () {
            this.options.is_change = true;
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.firstvalue().length > 0 || that.secondvalue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this,
                objFirst = that._getFirstIntervalObj(),
                objSecond = that._getSecondIntervalObj(),
                isLegal = true;

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode) {
                case "Y":   //First & Second皆必填
                    if (!objFirst._chkReadOnlyStatus() && that.firstvalue().length == 0) isLegal = false;

                    if (!objSecond._chkReadOnlyStatus() && that.secondvalue().length == 0) isLegal = false;
                    
                    break;
                case 1:   //First 必填 Second非必填
                    if (!objFirst._chkReadOnlyStatus() && that.firstvalue().length == 0) isLegal = false;

                    break;
                case 2:   //First 非必填 Second必填
                    if (!objSecond._chkReadOnlyStatus() && that.secondvalue().length == 0) isLegal = false;

                    break;
                case 3:   //First Second 擇一填
                    var isFirstRequired = true;

                    if (!objFirst._chkReadOnlyStatus() && that.firstvalue().length == 0) isFirstRequired = false;

                    if (!isFirstRequired && !objSecond._chkReadOnlyStatus() && that.secondvalue().length == 0) isLegal = false;

                    break;
                case 4:   //First Second 成對填,要填都要填;反之,都不填
                    var isFirstRequired = true;

                    //判斷First是否有值
                    if (!objFirst._chkReadOnlyStatus() && that.firstvalue().length == 0) isFirstRequired = false;

                    //First有值,Second無值,isLegal=false
                    if (isFirstRequired && !objSecond._chkReadOnlyStatus() && that.secondvalue().length == 0) isLegal = false;
                    //First無值,Second有值,isLegal=false
                    if (!isFirstRequired && !objSecond._chkReadOnlyStatus() && that.secondvalue().length > 0) isLegal = false;

                    break;
                case "N":   //First & Second皆非必填
                    isLegal = true;

                    break;
            }

            return isLegal;

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

        },
        
        //取得FirstInterval物件
        _getFirstIntervalObj: function () {
            var that = this, objFirst;

            switch (that.options.mode) {
                case "Number":
                case "Currency":
                case "Percent":
                    objFirst = that.FirstInterval.data("kendoBestNumericTextBox");
                    break;
                default:
                    objFirst = that.FirstInterval.data("kendoBestTextBox");
                    break;
            }

            return objFirst;
        },

        //取得SecondInterval物件
        _getSecondIntervalObj: function () {
            var that = this, objSecond;

            switch (that.options.mode) {
                case "Number":
                case "Currency":
                case "Percent":
                    objSecond = that.SecondInterval.data("kendoBestNumericTextBox");
                    break;
                default:
                    objSecond = that.SecondInterval.data("kendoBestTextBox");
                    break;
            }

            return objSecond;
        },

        //處理ReadonlyMode
        _procReadonlyMode: function () {
            var that = this,
                objFirst = that._getFirstIntervalObj(),
                objSecond = that._getSecondIntervalObj();

            if (that.options.readonly_mode != null) {
                switch (that.options.readonly_mode) {
                    case "Y":   //Both Readonly
                        objFirst.BsetOptions({ readonly_mode: "Y" });
                        objSecond.BsetOptions({ readonly_mode: "Y" });
                        break;
                    case 1:   //First Readonly Second Not Readonly
                        objFirst.BsetOptions({ readonly_mode: "Y" });
                        objSecond.BsetOptions({ readonly_mode: "N" });
                        break;
                    case 2:   //First Not Readonly Second Readonly
                        objFirst.BsetOptions({ readonly_mode: "N" });
                        objSecond.BsetOptions({ readonly_mode: "Y" });
                        break;
                    case "N":   //Both Not Readonly
                        objFirst.BsetOptions({ readonly_mode: "N" });
                        objSecond.BsetOptions({ readonly_mode: "N" });
                        break;

                }
            }
        },

        //Template
        _procTemplate: function () {
            var that = this,
                input = "<input />",
                optionsBase = {};           //基礎設定檔

            //新增 FirstInterval
            that.FirstInterval = $(input);
            that.element.append(that.FirstInterval);
            that.FirstInterval.addClass(className);
            that.FirstInterval.on("blur" + ns, proxy(that._blur, that));

            //新增 區隔符號
            that.element.append("&nbsp;" + that.options.interval_symbol + "&nbsp;");

            //新增 SecondInterval
            that.SecondInterval = $(input);
            that.element.append(that.SecondInterval);
            that.SecondInterval.addClass(className);
            that.SecondInterval.on("blur" + ns, proxy(that._blur, that));

            //Bind Change事件
            if (that.options.is_escape_confirm) {
                that.FirstInterval.on("change", proxy(that._change, that));
                that.SecondInterval.on("change", proxy(that._change, that));
            }

            //整理optionsBase
            optionsBase.unit = that.options.unit;
            optionsBase.placeholder = that.options.placeholder;
            optionsBase.mode = that.options.mode;
            optionsBase.suffix = that.options.suffix;
            optionsBase.is_target = false;

            switch (that.options.mode) {
                case "Number":
                case "Currency":
                case "Percent":
                    optionsBase.format = that.options.format;
                    optionsBase.decimals = that.options.decimals;
                    optionsBase.minus_format = that.options.minus_format;
                    optionsBase.carry_method = that.options.carry_method;
                    break;

                default:
                    optionsBase.special_character = that.options.special_character;
                    optionsBase.allow_special_character = that.options.allow_special_character;
                    optionsBase.case_format = that.options.case_format;
                    optionsBase.half_full_width = that.options.half_full_width;
                    break;

            }

            //根據mode來決定要使用NumericTextBox或TextBox
            switch (that.options.mode) {
                case "Number":
                case "Currency":
                case "Percent":
                    that.FirstInterval.kendoBestNumericTextBox(optionsBase);
                    that.SecondInterval.kendoBestNumericTextBox(optionsBase);
                    break;

                default:
                    that.FirstInterval.kendoBestTextBox(optionsBase);
                    that.SecondInterval.kendoBestTextBox(optionsBase);
                    break;

            }
        },

        _setEvents: function (options) {
            var that = this,
                idx = 0,
                length = that.events.length,
                e;

            for (; idx < length; idx++) {
                e = that.events[idx];
                if (that.options[e] && options[e]) {
                    that.unbind(e, that.options[e]);
                }
            }

            that.bind(that.events, options);
        }
    });

    ui.plugin(GSSIntervalTextBox);

    //===================================== Private Method  =====================================
    function ProcReadonly(obj) {
        /// <summary>
        /// 處理element是否唯讀
        /// </summary>

        //初始就唯讀情況
        //1. 依據唯讀模式設定控制項唯讀
        //2. 受整頁唯讀控管
        if (obj.options.readonly_mode == "Y" || obj.options.readonly_status) {
            obj.Breadonly(true);
        } else {
            obj.Breadonly(false);
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

    //===================================== Private Method  =====================================

})($);