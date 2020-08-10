/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../Common/StringFormatObject.js" />

/**  
     * @classdesc 繼承kendo.NumericTextBox <a href="http://docs.telerik.com/kendo-ui/api/web/numerictextbox" target="_blank"> Reference </a>
     * @class BestNumericTextBox 
     */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         numerictextbox = ui.NumericTextBox,
         POINT = '.',
         objOptions,
         SPIN = "spin",
         ns = ".kendoNumericTextBox",
         PLACEHOLDER = "placeholder",
         MOUSELEAVE = "mouseleave" + ns,
         HOVEREVENTS = "mouseenter" + ns + " " + MOUSELEAVE,
         DEFAULT = "k-state-default",
         STATEDISABLED = "k-state-disabled",
         DISABLED = "disabled",
         READONLY = "readonly",
         ARIA_DISABLED = "aria-disabled",
         ARIA_READONLY = "aria-readonly",
         proxy = $.proxy,
         activeElement = kendo._activeElement,
         SELECTED = "k-state-selected";

    var GSSNumericTextBox = numerictextbox.extend({

        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            //處理options資料
            setObject = that._SetOptions(options);

            numerictextbox.fn.init.call(that, element, setObject);

            //文字設定置右
            that.element.addClass("text-right");
            that.element.prev("input").addClass("text-right");

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.parent().parent().after("&nbsp;<span>" + that.options.suffix + "</span>");
            }

            that.element.on("blur" + ns, proxy(function () {
                if (that._chkRequired()) {

                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }

                }
            }, that));
        },

        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestNumericTextBox
             * @MemberOf BestNumericTextBox
             */
            name: "BestNumericTextBox",
            /**
             * @property {string} mode 資料模式
             * @default Currency
             * @MemberOf BestNumericTextBox
             * @desc 僅提供[Percent]、[Currency]、[Number]
             */
            mode: ControlDefaultsObject.NumericTextBox.mode || "Currency",
            /**
             * @property {string} suffix 後綴詞
             * @default null
             * @MemberOf BestNumericTextBox
             */
            suffix: ControlDefaultsObject.NumericTextBox.suffix || null,
            /**
             * @property {string} unit 單位
             * @default [Percent]為100<br/>[Currency]為1000<br/>[Number]為1
             * @MemberOf BestNumericTextBox
             */
            unit: ControlDefaultsObject.NumericTextBox.unit || null,
            /**
             * @property {string} format 資料格式
             * @default null
             * @MemberOf BestNumericTextBox
             */
            format: ControlDefaultsObject.NumericTextBox.format || null,
            /**
             * @property {int} decimals 小數點位數
             * @default null
             * @MemberOf BestNumericTextBox
             */
            decimals: ControlDefaultsObject.NumericTextBox.decimals || null,
            /**
             * @property {string} minus_format 負數格式
             * @default Minus
             * @MemberOf BestNumericTextBox
             * @desc 內含兩種格式<br/>[Minus]-1<br/>[Parenthesis](1)
             */
            minus_format: ControlDefaultsObject.NumericTextBox.minus_format || 'Minus',
            /**
             * @property {string} carry_method 小數點進位方式
             * @default Round
             * @MemberOf BestNumericTextBox
             * @desc 內含三種格式<br/>[Round]四捨五入<br/>[Floor]無條件捨去<br/>[Ceil]無條件進位
             */
            carry_method: ControlDefaultsObject.NumericTextBox.carry_method || 'Round',
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestNumericTextBox
             */
            is_escape_confirm: ControlDefaultsObject.NumericTextBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestNumericTextBox
             */
            is_change: ControlDefaultsObject.NumericTextBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestNumericTextBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestNumericTextBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestNumericTextBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",            

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestNumericTextBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestNumericTextBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestNumericTextBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestNumericTextBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false,
            //Change事件
            change: function () {
                if (that.options.is_escape_confirm) {
                    that.options.is_change = true;
                }
            }
        },

        /**
        * @desc 唯讀處理
        * @MemberOf BestNumericTextBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestNumericTextBox().Breadonly();
        * 取消唯讀:element.BestNumericTextBox().Breadonly(false);
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
         * @memberof BestNumericTextBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestNumericTextBox().Brequired();
         * 不必填: element.BestNumericTextBox().Brequired(false);
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
         * @memberof BestNumericTextBox
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
         * @desc 設值/取值<br/>mode:Percent時,[取值]需除以100;[設值]需乘以100<br/>mode:不為Percent,[取值]需乘以unit;[設值]需除以unit 
         * @MemberOf BestNumericTextBox
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 經單位換算後的值
         * @example
         * 取值:element.BestNumericTextBox().Bvalue();
         * 設值:element.BestNumericTextBox().Bvalue(setValue);
         */
        Bvalue: function (setValue) {
            var that = this,
                unit = that.options.unit || 1,
                decimals = that.options.decimals || 0;

            //取值
            if (setValue == null) {

                if (that.element.val().toString().trim().length == 0) {
                    return null;
                }

                //若為Percent，則取值時要除以100，且小數需加兩位
                if (that.options.mode == 'Percent') {
                    return that._ProcCarry(that.element.data("kendo" + that.options.name).value() / unit, decimals + 2);
                }

                //若非為Percent，則取值時要乘以unit
                if (that.options.mode != 'Percent') {
                    return that._ProcCarry(that.element.data("kendo" + that.options.name).value(), decimals) * unit;
                }

            }

            //設值
            if (setValue != null) {

                //若為Percent，則取值時要乘以100
                if (that.options.mode == 'Percent') {
                    that.element.data("kendo" + that.options.name).value(setValue * unit);
                }

                //若非為Percent，則取值時要除以unit
                if (that.options.mode != 'Percent') {
                    that.element.data("kendo" + that.options.name).value(setValue / unit);
                }
            }
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.Bvalue().toString().length>0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this;

            if (!that._chkReadOnlyStatus() && that.Bvalue() != null && that.Bvalue().toString().length > 0) {
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

        },

        _step: function (step) {
            var that = this,
                 element = that.element,
                 multiple = 1,
                 value = that._parse(element.val()) || 0,
                 baseFirst = 1,
                 baseSecond = 1;


            if (activeElement() != element[0]) {
                that._focusin();
            }

            //有小數點時,要先乘至整數,再運算才不會有浮點數問題
            if (value.toString().match(".") !== "0") {
                baseFirst = Math.pow(10, (value.toString().length - (value.toString().indexOf(".") + 1)));
            }

            if (that.options.step.toString().match(".") !== "0") {
                baseSecond = Math.pow(10, (that.options.step.toString().length - (that.options.step.toString().indexOf(".") + 1)));
            }

            if (baseFirst >= baseSecond) {
                multiple = baseFirst;
            } else {
                multiple = baseSecond;
            }

            value = Math.round(value * multiple) + Math.round(that.options.step * step * multiple);

            that._update(that._adjust(value / multiple));

            that.trigger(SPIN);
        },

        _update: function (value) {
            var that = this,
                options = that.options,
                format = options.format,
                decimals = options.decimals,
                culture = that._culture(),
                numberFormat = that._format(format, culture),
                isNotNull;

            if (decimals == null) {
                decimals = numberFormat.decimals;
            }

            value = that._parse(value, culture);

            isNotNull = value !== null;

            if (isNotNull) {
                value = parseFloat(that._ProcCarry(value, decimals));
            }

            that._value = value = that._adjust(value);
            that._placeholder(kendo.toString(value, format, culture));

            if (isNotNull) {
                value = value.toString();
                if (value.indexOf("e") !== -1) {
                    value = that._ProcCarry(+value, decimals);
                }
                value = value.replace(POINT, numberFormat[POINT]);
            } else {
                value = "";
            }

            that.element.val(value).attr("aria-valuenow", value);
        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestLandSiteText
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this
                , currentObj = null;

            //取得data-role含有best,且具有required,但非含有readonly,disabled, hidden的control
            currentObj = that.element.parent().find("input:not([readonly=true],[readonly=readonly],[disabled]):visible:first");
            currentObj.focus();

        },

        //處理options資料
        _SetOptions: function (options) {

            //format為null時，則根據mode來設定預設值
            if (options.format == null) {
                var preFormat = '#,#'
                    , postFormat, format;

                //若Mode為Percent，則格式無需千分號
                if (options.mode == 'Percent') {
                    preFormat = '#';
                };

                format = preFormat;

                //根據是否有設定decimals來調整format格式
                if (options.decimals != null) {
                    postFormat = '#'.repeat(options.decimals);
                    format = format + '.' + postFormat;
                }

                //根據minus_format來設定負值呈現方式:Minus:-1 / Parenthesis:(1)                
                if (options.minus_format == 'Minus' || options.minus_format == null) {
                    options.format = format + ';' + '-' + format;
                }

                if (options.minus_format == 'Parenthesis') {
                    options.format = format + ';' + '(' + format + ')';
                }
            }

            //當為Currency，若沒有設定unit，則預設為1000
            if (options.unit == null && options.mode == 'Currency') {
                options.unit = 1000;
            }

            //當為Percent，則unit預設為100
            if (options.unit == null && options.mode == 'Percent') {
                options.unit = 100;
            }

            return options;
        },

        _editable: function (options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                text = that._text.add(element),
                wrapper = that._inputWrapper.off(HOVEREVENTS);

            that._toggleText(true);

            that._upArrowEventHandler.unbind("press");
            that._downArrowEventHandler.unbind("press");
            element.off("keydown" + ns).off("keypress" + ns).off("paste" + ns);

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                text.removeAttr(DISABLED)
                    .removeAttr(READONLY)
                    .attr(ARIA_DISABLED, false)
                    .attr(ARIA_READONLY, false);

                that._upArrowEventHandler.bind("press", function (e) {
                    e.preventDefault();
                    that._spin(1);
                    that._upArrow.addClass(SELECTED);
                });

                that._downArrowEventHandler.bind("press", function (e) {
                    e.preventDefault();
                    that._spin(-1);
                    that._downArrow.addClass(SELECTED);
                });

                that.element
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("paste" + ns, proxy(that._paste, that));

            } else {
                wrapper
                    .addClass(STATEDISABLED)
                    .removeClass(DEFAULT);

                text.attr(DISABLED, DISABLED)
                    //.attr(READONLY, readonly)
                    .attr(ARIA_DISABLED, disable)
                    .attr(ARIA_READONLY, readonly);

                text.removeAttr(PLACEHOLDER);
            }
        },

        //處理進位
        _ProcCarry: function (value, decimals) {
            var that = this;

            if (value != null) {
                //options.carry_method為Round (四捨五入)
                if (that.options.carry_method == 'Round') {
                    return StringFormatObject.Numeric.Round(value, decimals);
                };

                //options.carry_method為Floor (無條件捨去)
                if (that.options.carry_method == 'Floor') {
                    return StringFormatObject.Numeric.Floor(value, decimals);
                };

                //options.carry_method為Ceil (無條件進位)
                if (that.options.carry_method == 'Ceil') {
                    return StringFormatObject.Numeric.Ceil(value, decimals);
                };
            } else {
                return value;
            }
        }
    });

    ui.plugin(GSSNumericTextBox);

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