/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 年份YearPicker
//描述: 年份輸入
//歷程: 1. 2014/05/19   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , BestTextBox = ui.BestTextBox;

    /**
     * @classdesc 繼承BestTextBox
     * @class BestYearPicker
     */
    var GssYearPicker = BestTextBox.extend({

        init: function (element, options) {

            // cache a reference to this
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            options.placeholder = options.is_tw_year ? "yyy" : "yyyy";

            // make the base call to initialize this widget
            BestTextBox.fn.init.call(this, element, options);

            that._create();

        },

        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestYearPicker
             * @MemberOf BestYearPicker
             */
            name: "BestYearPicker",

            /**
             * @property {bool} is_tw_year 是否顯示民國年
             * @default false
             * @MemberOf BestYearPicker
             */
            is_tw_year: ControlDefaultsObject.YearPicker.is_tw_year || false,

            /**
             * @property {bool} allow_shortcut 是否顯示快速查詢按鈕
             * @default false
             * @MemberOf BestYearPicker             
             */
            allow_shortcut: ControlDefaultsObject.YearPicker.allow_shortcut || false,

            /**
             * @property {arraylist} shortcut_data_source 快速查詢的datasource
             * @default []
             * @MemberOf BestYearPicker
             * @desc 可自行設定快速查詢的資料來源, 若沒有設定則由widget依據目前時間去產生
             */
            shortcut_data_source: ControlDefaultsObject.YearPicker.shortcut_data_source || [],

            /**
             * @property {date} min 年份可設定的最小值
             * @default 1900
             * @MemberOf BestYearPicker
             */
            min: ControlDefaultsObject.YearPicker.min || 1900,

            /**
             * @property {date} max 年份可設定的最大值
             * @default 2099
             * @MemberOf BestYearPicker
             */
            max: ControlDefaultsObject.YearPicker.max || 2099,

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestYearPicker
             */
            is_escape_confirm: ControlDefaultsObject.YearPicker.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestYearPicker
             */
            is_change: ControlDefaultsObject.YearPicker.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestYearPicker
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestYearPicker
             * @desc 供整頁唯讀或區域唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestYearPicker
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default 年度
             * @MemberOf BestYearPicker
             */
            error_message: "年度",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestYearPicker
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestYearPicker
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestYearPicker
             * @desc 供整頁必填或區域必填使用
             */
            required_status: false

        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestYearPicker
         * @method Bvalue
         * @param {string} setValue 年度字串, 格式為yyyy
         * @return {string} 符合控制項設定格式的年度字串
         * @example
         * 取值: element.BestYearPicker().Bvalue();
         * 設值: element.BestYearPicker().Bvalue("2014");
         */
        Bvalue: function (value) {
            var that = this, element = that.element;

            //取值
            if (value === undefined) {
                if (that.options.is_tw_year) {
                    return $.trim(String(StringFormatObject.DateTime.GetADYear(element.val())));
                }

                if (!that.options.is_tw_year) {
                    return $.trim(element.val());
                }
            }

            //設值,需檢視是否有不合法字元,若有則刪除該字元
            if (value !== undefined) {
                if (that._chkYear(value)) {
                    element.val(that._procValue(value));
                }
                else {
                    element.val("")
                }
            }

        },

        /**
         * @desc 設定控制項是否唯讀
         * @memberof BestYearPicker
         * @method Breadonly
         * @param {bool} readonly 是否唯讀
         * @example
         * 唯讀: element.Breadonly();
         * 唯讀: element.Breadonly(true);
         * 不唯讀: element.Breadonly(false);
         */
        Breadonly: function (readonly) {
            //修改kendo原先的function, 使readonly等同disable

            var that = this
                , isReadonly = readonly === undefined ? true : readonly;

            if (!isReadonly) {
                //非唯讀狀態, 則要依據readonly_mode回到初始狀態

                switch (that.options.readonly_mode.toString()) {

                    case "Y":   //唯讀
                        isReadonly = true;
                        break;

                    case "N": //非唯讀
                        isReadonly = false;
                        break;

                }

            }

            that._editable({
                readonly: isReadonly,
                disable: false
            });

            //設定控制項唯讀狀態
            that.options.readonly_status = isReadonly;

            //快速查詢按鈕
            if (that.options.allow_shortcut) {
                that.quickButton.BestQuickButton().Breadonly(isReadonly);
            }

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestYearPicker
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 唯讀: element.Brequired();
         * 唯讀: element.Brequired(true);
         * 不唯讀: element.Brequired(false);
         */
        Brequired: function (required) {

            var that = this
                , isRequired = required === undefined ? true : required;

            if (!isRequired) {
                //非必填狀態, 則要依據required_mode回到初始狀態
                if (that.options.required_mode.toString() != "N") isRequired = true;
            }

            //設定控制項必填狀態
            that.options.required_status = isRequired;

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestYearPicker
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            that.element.focus();

        },

        /**
         * @desc 設定控制項的options
         * @memberof BestYearPicker
         * @method BsetOptions
         * @example
         * 設定options: element.setOptions({ readonly_mode: "N" });
         */
        BsetOptions: function (options) {

            var that = this;

            ui.Widget.fn.setOptions.call(that, options);

        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this;

            // set the initial toggled state
            that.toggle = true;

            //設定格式
            that.element.data("kendo" + that.options.name).setOptions({
                mode: "Digit",
                special_character: false,
                allow_special_character: that.options.is_tw_year ? "-" : "",
                is_escape_confirm: that.options.is_escape_confirm,
                is_change: that.options.is_change
            });

            //限定最大阿長度
            that.element.attr("maxlength", 4);

            that.element.width("40px").addClass("text-right");

            //設定快速查詢按鈕
            if (that.options.allow_shortcut) {
                that._bindQuickBtn();
            }

            //初始就唯讀情況
            //1. 依據唯讀模式設定控制項唯讀
            //2. 受整頁唯讀控管
            if (that.options.readonly_mode == "Y" || that.options.readonly_status) {
                that.Breadonly(true);
            }

            //設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算必填狀態)
            if (that.options.required_mode != "N") {
                that.Brequired(true);
            }

        },

        _blur: function () {

            // cache a reference to this
            var that = this
                , year = $.trim(that.element[0].value)
                , elementObj = that.element.data("kendo" + that.options.name);

            if (that._chkRequired()) {
                if (that.options.is_tw_year && year.length == 4) {

                    //避免keyin錯誤在西元年轉換成民國年時, 多打上了負號
                    if (year.indexOf("-") == -1) {
                        year = StringFormatObject.DateTime.GetTWYear(year);
                    }
                    else {
                        year = "";
                    }
                }

                elementObj.Bvalue(year.toString());

                //將共用ErrorDialogObservableObject中, 存在的錯誤訊息刪除
                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
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

            if (that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this
                , isKeyInVal = false;

            //控制項非唯讀狀態且有輸入資料
            if (!that._chkReadOnlyStatus() && that.Bvalue().length > 0) isKeyInVal = true;

            return isKeyInVal;

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

        _bindQuickBtn: function () {

            var that = this
                , appendObj = that.element.parent();

            //若未輸入任何快速查詢的值, 則依序往前推算2年
            if (that.options.shortcut_data_source.length == 0) {

                var nowDate = new Date()
                    , realYear = nowDate.getFullYear()
                    , yearText = that.options.is_tw_year ? StringFormatObject.DateTime.GetTWYear(nowDate.getFullYear())
                                                            : nowDate.getFullYear();

                for (var i = 0; i < 3; i++) {

                    that.options.shortcut_data_source.push({
                        ShortcutKey: yearText - i,
                        ShortcutValue: realYear - i
                    });

                }

            }

            //動態產生快速查詢按鈕
            that.quickButton = $(that._templates.quickButton);
            appendObj.append(that.quickButton);

            that.quickButton.BestQuickButton({
                dataSource: that.options.shortcut_data_source,
                text_field: "ShortcutKey",
                value_field: "ShortcutValue",
                fn: function (text, value) {

                    that._quickClick(value);

                }
            });

        },

        _quickClick: function (realYear) {

            var that = this;

            if (that.options.is_tw_year) {
                realYear = StringFormatObject.DateTime.GetTWYear(realYear);
            }

            that.element.data("kendo" + that.options.name).Bvalue(realYear.toString());

            if (that._chkRequired()) {
                
                //將共用ErrorDialogObservableObject中, 存在的錯誤訊息刪除
                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                }

            }

            if (that.options.is_escape_confirm) {
                that._change();
            }
        },

        // the templates for each of the UI elements that comprise the widget
        _templates: {
            quickButton: "<span />"
        },

        //檢查年份
        _chkYear: function (year) {
            var that = this;

            if (year.length == 3) {
                year = StringFormatObject.DateTime.GetADYear(year);
            }
            if (year > that.options.max || year < that.options.min) {
                return false;
            }
            else {
                return true;
            }
        }
    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssYearPicker);

})(jQuery);