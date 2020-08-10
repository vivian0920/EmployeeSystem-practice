/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 擴充KendoDatePicker功能 - 年月區間IntervalMonthYearPicker
//描述: 年月區間輸入
//歷程: 1. 2014/05/21   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget;

    /**
     * @classdesc 年月區間IntervalMonthYearPicker
     * @class BestIntervalMonthYearPicker
     */
    var GssIntervalMonthYearPicker = Widget.extend({

        init: function (element, options) {

            // cache a reference to this
            var that = this
                , initOptions = {}
                , defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            Widget.fn.init.call(this, element, options);

            that._create();

            that.element.on("change", $.proxy(that._change, that));

        },

        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestIntervalMonthYearPicker
             * @MemberOf BestIntervalMonthYearPicker
             */
            name: "BestIntervalMonthYearPicker",

            /**
             * @property {string} childName Widget中子控制項的namespace
             * @default BestMonthYearPicker
             * @MemberOf BestIntervalMonthYearPicker
             */
            childName: "BestMonthYearPicker",

            /**
             * @property {bool} is_tw_year 是否顯示民國年
             * @default false
             * @MemberOf BestIntervalMonthYearPicker
             */
            is_tw_year: ControlDefaultsObject.IntervalMonthYearPicker.is_tw_year || false,

            /**
             * @property {string} date_delimiter 日期間的分隔符號
             * @default /
             * @MemberOf BestIntervalMonthYearPicker
             */
            date_delimiter: ControlDefaultsObject.IntervalMonthYearPicker.date_delimiter || "/",

            /**
             * @property {bool} allow_shortcut 是否顯示快速查詢按鈕
             * @default false
             * @MemberOf BestIntervalMonthYearPicker             
             */
            allow_shortcut: ControlDefaultsObject.IntervalMonthYearPicker.allow_shortcut || false,

            /**
             * @property {arraylist} shortcut_data_source 快速查詢的datasource
             * @default []
             * @MemberOf BestIntervalMonthYearPicker
             * @desc 可自行設定快速查詢的資料來源, 若沒有設定則由widget依據目前時間去產生
             */
            shortcut_data_source: ControlDefaultsObject.IntervalMonthYearPicker.shortcut_data_source || [],

            /**
             * @property {string} format 日期顯示的格式
             * @default yyyy/MM
             * @MemberOf BestIntervalMonthYearPicker
             */
            format: ControlDefaultsObject.IntervalMonthYearPicker.format || "yyyy/MM",

            /**
             * @property {string} suffix 控制項的後置文字
             * @default ""
             * @MemberOf BestIntervalMonthYearPicker
             */
            suffix: ControlDefaultsObject.IntervalMonthYearPicker.suffix || "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestIntervalMonthYearPicker
             * @desc Y：startInterval及endInterval皆必填 <br>
                     1：startInterval必填，endInterval非必填 <br>
                     2：startInterval非必填，endInterval必填 <br>
                     3：startInterval及endInterval擇一填寫 <br>
                     4：startInterval及endInterval成對必填，可都不填但若要填寫一定要startInterval及endInterval都有值 <br>
                     N：startInterval及endInterval皆非必填
             */
            required_mode: ControlDefaultsObject.IntervalMonthYearPicker.required_mode || "N",

            /**
             * @property {string} readonly_mode 控制項唯讀的模式
             * @default N
             * @MemberOf BestIntervalMonthYearPicker
             * @desc Y：startInterval及endInterval皆唯讀 <br>
                     1：startInterval唯讀，endInterval非唯讀 <br>
                     2：startInterval非唯讀，endInterval唯讀 <br>
                     N：startInterval及endInterval皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.IntervalMonthYearPicker.readonly_mode || "N",

            /**
             * @property {date} min 日期可設定的最小值
             * @default Date(1900, 0, 1)
             * @MemberOf BestIntervalMonthYearPicker
             */
            min: ControlDefaultsObject.IntervalMonthYearPicker.min || new Date(1900, 0, 1),

            /**
             * @property {date} max 日期可設定的最大值
             * @default Date(2099, 11, 31)
             * @MemberOf BestIntervalMonthYearPicker
             */
            max: ControlDefaultsObject.IntervalMonthYearPicker.max || new Date(2099, 11, 31),

            /**
             * @property {string} diff_operator Less小於/More大於
             * @default null
             * @MemberOf BestIntervalMonthYearPicker
             */
            diff_operator: ControlDefaultsObject.IntervalMonthYearPicker.diff_operator || null,

            /**
             * @property {string} diff 差距值
             * @default null
             * @MemberOf BestIntervalMonthYearPicker
             */
            diff: ControlDefaultsObject.IntervalMonthYearPicker.diff || null,

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestIntervalMonthYearPicker
             */
            is_escape_confirm: ControlDefaultsObject.IntervalMonthYearPicker.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestIntervalMonthYearPicker
             */
            is_change: ControlDefaultsObject.IntervalMonthYearPicker.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestIntervalMonthYearPicker
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestIntervalMonthYearPicker
             * @desc 供整頁唯讀或區域唯使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 年月區間
             * @MemberOf BestIntervalMonthYearPicker
             */
            error_message: "年月區間",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestIntervalMonthYearPicker
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestIntervalMonthYearPicker
             * @desc 供整頁必填或區域必填使用
             */
            required_status: false

        },

        /**
         * @desc 開始控制項的取值跟設值方法(依據kendo原生的方法)
         * @memberof BestIntervalMonthYearPicker
         * @method startValue
         * @param {date} setValue 日期
         * @return {date} 日期物件
         * @example
         * 取值: element.startValue();
         * 設值: element.startValue(new Date(2014, 0, 1));
         */
        startValue: function (setValue) {

            // cache a reference to this
            var that = this
                , startInterval = that.startInterval.data("kendo" + that.options.childName);

            if (typeof setValue !== 'undefined') {

                //設定開始日期
                startInterval.min(new Date(1900, 0, 1));
                startInterval.max(new Date(2099, 11, 31));

                startInterval.value(setValue);
                that._startChange();

            }
            else {
                return startInterval.value();
            }

        },

        /**
         * @desc 開始控制項的取值跟設值方法
         * @memberof BestIntervalMonthYearPicker
         * @method BstartValue
         * @param {string} setValue 年月字串, 格式為yyyyMM
         * @return {string} 符合控制項設定格式的年月字串
         * @example
         * 取值: element.BstartValue();
         * 設值: element.BstartValue("201407");
         */
        BstartValue: function (setValue) {

            // cache a reference to this
            var that = this
                , startInterval = that.startInterval.data("kendo" + that.options.childName);

            if (typeof setValue !== 'undefined') {

                startInterval.Bvalue(setValue);
                that._startChange();

            }
            else {
                return startInterval.Bvalue();
            }

        },

        /**
         * @desc 結束控制項的取值跟設值方法(依據kendo原生的方法)
         * @memberof BestIntervalMonthYearPicker
         * @method endValue
         * @param {date} setValue 日期
         * @return {date} 日期物件
         * @example
         * 取值: element.endValue();
         * 設值: element.endValue(new Date(2014, 0, 1));
         */
        endValue: function (setValue) {

            // cache a reference to this
            var that = this
                , endInterval = that.endInterval.data("kendo" + that.options.childName);

            if (typeof setValue !== 'undefined') {

                //設定結束日期
                endInterval.min(new Date(1900, 0, 1));
                endInterval.max(new Date(2099, 11, 31));

                endInterval.value(setValue);
                that._endChange();

            }
            else {
                return endInterval.value();
            }

        },

        /**
         * @desc 結束控制項的取值跟設值方法
         * @memberof BestIntervalMonthYearPicker
         * @method BendValue
         * @param {string} setValue 年月字串, 格式為yyyyMM
         * @return {string} 符合控制項設定格式的年月字串
         * @example
         * 取值: element.BendValue();
         * 設值: element.BendValue("201407");
         */
        BendValue: function (setValue) {

            // cache a reference to this
            var that = this
                , endInterval = that.endInterval.data("kendo" + that.options.childName);

            if (typeof setValue !== 'undefined') {

                endInterval.Bvalue(setValue);
                that._endChange();

            }
            else {
                return endInterval.Bvalue();
            }

        },

        /**
         * @desc 設定控制項是否唯讀
         * @memberof BestIntervalMonthYearPicker
         * @method Breadonly
         * @param {bool} readonly 是否唯讀
         * @example
         * 唯讀: element.Breadonly();
         * 唯讀: element.Breadonly(true);
         * 不唯讀: element.Breadonly(false);
         */
        Breadonly: function (readonly) {

            var that = this
                , isReadonly = readonly === undefined ? true : readonly
                , startInterval = that.startInterval.data("kendo" + that.options.childName)
                , endInterval = that.endInterval.data("kendo" + that.options.childName);

            if (isReadonly) {
                that._setReadonlyMode("Y");
            }
            else {
                that._setReadonlyMode();
            }

            //設定控制項唯讀狀態
            that.options.readonly_status = isReadonly;

            //快速查詢按鈕
            if (that.options.allow_shortcut) {
                that.quickButton.BestQuickButton().Breadonly(isReadonly);
            }

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestIntervalMonthYearPicker
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
         * @memberof BestIntervalMonthYearPicker
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            //取得data-role含有best且不唯讀的control
            that.element.find("[data-role*=best]").each(function () {

                var that = $(this);

                //依據不同的data-role產生不同的控制項
                var objControl = SelectControlObject.SelectControl(that);

                if (objControl == null) return;    //控制項不存在, 換下一個

                //判斷唯讀狀態
                if (!objControl._chkReadOnlyStatus()) {
                    objControl.focus();
                    return false;
                }

            });

        },

        /**
         * @desc 設定控制項的options
         * @memberof BestIntervalMonthYearPicker
         * @method BsetOptions
         * @example
         * 設定options: element.BsetOptions({ readonly_mode: "2" });
         */
        BsetOptions: function (options) {

            var that = this;

            Widget.fn.setOptions.call(that, options);

        },

        //change事件
        _change: function () {
            var that = this;

            if (that.options.is_escape_confirm) {
                that.options.is_change = true;
            }
        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this
                , template;

            // set the initial toggled state
            that.toggle = true;

            //Step1: 產生開始年月控制項
            template = kendo.template(that._templates.input);
            that.startInterval = $(template(that.options));

            //動態產生開始日期控制項
            that.element.append(that.startInterval);

            //註冊事件
            that.startInterval.on("change", $.proxy(that._startChange, that));

            //Step2: 產生結束年月控制項
            template = kendo.template(that._templates.input);
            that.endInterval = $(template(that.options));

            //動態產生結束日期控制項
            that.element.append(" ~ ").append(that.endInterval);

            //註冊事件
            that.endInterval.on("change", $.proxy(that._endChange, that));

            //Step3: 將年月區間控制項套用底層格式
            that.startInterval.kendoBestMonthYearPicker({
                is_tw_year: that.options.is_tw_year,
                date_delimiter: that.options.date_delimiter,
                format: that.options.format,
                min: that.options.min,
                max: that.options.max,
                is_target: false    //設定為非目標物
            });

            that.endInterval.kendoBestMonthYearPicker({
                is_tw_year: that.options.is_tw_year,
                date_delimiter: that.options.date_delimiter,
                format: that.options.format,
                min: that.options.min,
                max: that.options.max,
                is_target: false    //設定為非目標物
            });

            //Step4: 設定唯讀模式
            that._setReadonlyMode();

            //Step5: 設置後至文字
            if ($.trim(that.options.suffix).length != 0) {
                that.element.append("<span>  " + that.options.suffix + "  </span>");
            }

            //Step6: 產生快速查詢按鈕
            if (that.options.allow_shortcut) {
                that._bindQuickBtn();
            }

            //Step7: 初始就唯讀情況(受整頁唯讀控管)
            if (that.options.readonly_status) {
                that.Breadonly(true);
            }

            //Step8: 設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算有必填存在的狀態)
            if (that.options.required_mode != "N") {
                that.options.required_status = true;
            }

        },

        //設定子控制項的readonly模式
        _setReadonlyMode: function (readonlyMode) {

            var that = this
                , strReadonlyMode = readonlyMode === undefined ? that.options.readonly_mode.toString() : readonlyMode
                , startIntervalReadOnlyMode = ""
                , endIntervalReadOnlyMode = ""
                , startInterval = that.startInterval.data("kendo" + that.options.childName)
                , endInterval = that.endInterval.data("kendo" + that.options.childName);

            switch (strReadonlyMode) {
                case "Y":   //startInterval及endInterval皆唯讀
                    startIntervalReadOnlyMode = "Y";
                    endIntervalReadOnlyMode = "Y";
                    break;
                case "1": //startInterval唯讀，endInterval非唯讀
                    startIntervalReadOnlyMode = "Y";
                    endIntervalReadOnlyMode = "N";
                    break;
                case "2": //startInterval非唯讀，endInterval唯讀
                    startIntervalReadOnlyMode = "N";
                    endIntervalReadOnlyMode = "Y";
                    break;
                case "N": //startInterval及endInterval皆非唯讀
                    startIntervalReadOnlyMode = "N";
                    endIntervalReadOnlyMode = "N";
                    break;
            }

            //設定開始日期的唯讀
            startInterval.BsetOptions({
                readonly_mode: startIntervalReadOnlyMode
            });

            if (startIntervalReadOnlyMode == "Y") {
                startInterval.Breadonly();
            }
            else {
                startInterval.Breadonly(false);
            }

            //設定結束日期的唯讀
            endInterval.BsetOptions({
                readonly_mode: endIntervalReadOnlyMode
            });

            if (endIntervalReadOnlyMode == "Y") {
                endInterval.Breadonly();
            }
            else {
                endInterval.Breadonly(false);
            }

        },

        _startChange: function () {

            // cache a reference to this
            var that = this
                 , startInterval = that.startInterval.data("kendo" + that.options.childName)
                 , endInterval = that.endInterval.data("kendo" + that.options.childName)
                 , startDate = $.trim(startInterval.element[0].value);

            if (startDate.length != 0) {

                //檢測畫面上輸入的資料
                startInterval._chkKeyInValue(startDate);

                //若輸入的開始日期大於結束日期, 就會等於null
                if (startInterval.value() != null) {

                    if (startInterval.value() > endInterval.value()) {

                        if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 2) {

                            //設定開始日期最大值
                            startInterval.max(startInterval.value());

                            //設定結束日期
                            endInterval.value(startInterval.value());
                            endInterval.min(startInterval.value());

                        }

                    }
                    else {

                        //設定開始日期最大值
                        startInterval.max(endInterval.value());

                        //設定結束日期
                        endInterval.min(startInterval.value());

                    }

                }
                else {

                    //表示輸入的開始日期大於結束日期
                    endInterval.min(new Date(1900, 0, 1));

                }

                //判斷是否符合必填
                if (that._chkRequired()) {

                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }

                }

            }
            else {

                startInterval.max(endInterval.value());
                endInterval.min(new Date(1900, 0, 1));

            }

        },

        _endChange: function () {

            // cache a reference to this
            var that = this
                 , startInterval = that.startInterval.data("kendo" + that.options.childName)
                 , endInterval = that.endInterval.data("kendo" + that.options.childName)
                  , endDate = $.trim(endInterval.element[0].value);

            if (endDate.length != 0) {

                //檢測畫面上輸入的資料
                endInterval._chkKeyInValue(endDate);

                //若輸入的結束日期小於開始日期, 就會等於null
                if (endInterval.value() != null) {

                    if (endInterval.value() < startInterval.value() || startInterval.value() == null) {

                        if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 1) {

                            //設定開始日期
                            startInterval.max(endInterval.value());
                            startInterval.value(endInterval.value());

                            //設定結束日期
                            endInterval.min(endInterval.value());

                        }

                    }
                    else {

                        //設定開始日期
                        startInterval.max(endInterval.value());

                        //設定結束日期
                        endInterval.min(startInterval.value());

                    }

                }
                else {

                    //表示輸入的結束日期小於開始日期
                    startInterval.max(new Date(2099, 11, 31));

                }

                //判斷是否符合必填
                if (that._chkRequired()) {

                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }

                }

            }
            else {

                startInterval.max(new Date(2099, 11, 31));
                endInterval.min(startInterval.value());

            }

        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.BstartValue().length > 0 || that.BendValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this
                , startInterval = that.startInterval.data("kendo" + that.options.childName)
                , endInterval = that.endInterval.data("kendo" + that.options.childName)
                , isKeyInVal = false;

            //判斷控制項必填模式
            switch (that.options.required_mode.toString()) {

                case "Y":   //startInterval及endInterval皆必填

                    if (!startInterval._chkReadOnlyStatus() && that.BstartValue().length == 0) {
                        isKeyInVal = false;
                    }
                    else if (!endInterval._chkReadOnlyStatus() && that.BendValue().length == 0) {
                        isKeyInVal = false;
                    }
                    else {
                        isKeyInVal = true;
                    }

                    break;

                case "1":   //startInterval必填，endInterval非必填

                    if (!startInterval._chkReadOnlyStatus() && that.BstartValue().length == 0) {
                        isKeyInVal = false;
                    }
                    else {
                        isKeyInVal = true;
                    }

                    break;

                case "2":   //startInterval非必填，endInterval必填

                    if (!endInterval._chkReadOnlyStatus() && that.BendValue().length == 0) {
                        isKeyInVal = false;
                    }
                    else {
                        isKeyInVal = true;
                    }

                    break;


                case "3":   //startInterval及endInterval擇一填寫

                    if (!startInterval._chkReadOnlyStatus() && that.BstartValue().length > 0) {
                        isKeyInVal = true;
                    }
                    else if (!endInterval._chkReadOnlyStatus() && that.BendValue().length > 0) {
                        isKeyInVal = true;
                    }
                    else if (startInterval._chkReadOnlyStatus() && endInterval._chkReadOnlyStatus()) {
                        isKeyInVal = true;
                    }
                    else {
                        isKeyInVal = false;
                    }

                    break;

                case "4":   //startInterval及endInterval成對必填，可都不填但若要填寫一定要startInterval及endInterval都有值

                    if ((!startInterval._chkReadOnlyStatus() && that.BstartValue().length == 0)
                        && (!endInterval._chkReadOnlyStatus() && that.BendValue().length == 0)) {
                        isKeyInVal = true;
                    }
                    else if ((!startInterval._chkReadOnlyStatus() && that.BstartValue().length > 0)
                        && (!endInterval._chkReadOnlyStatus() && that.BendValue().length > 0)) {
                        isKeyInVal = true;
                    }
                    else if (startInterval._chkReadOnlyStatus() || endInterval._chkReadOnlyStatus()) {
                        isKeyInVal = true;
                    }
                    else {
                        isKeyInVal = false;
                    }

                    break;

                case "N":   //startInterval及endInterval皆非必填
                    isKeyInVal = true;
                    break;

            }

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
                , appendObj = that.element;

            //若未輸入任何快速查詢的值, 則用年月表示(依序往前推算5個月)
            if ($.trim(that.options.shortcut_data_source).length == 0) {

                var nowDate = new Date()
                    , nowYear = 0
                    , realYear = 0
                    , monthYearFormat = that.options.format.indexOf("dd") == 0 ? that.options.format.replace("dd" + that.options.date_delimiter, "")
                                                                                                           : that.options.format.replace(that.options.date_delimiter + "dd", "")
                    , keyText = ""
                    , valueText = "";

                for (var i = 0; i < 5; i++) {

                    nowYear = that.options.is_tw_year ? StringFormatObject.DateTime.GetTWYear(nowDate.getFullYear()) : nowDate.getFullYear();
                    realYear = nowDate.getFullYear();

                    keyText = monthYearFormat;
                    keyText = keyText.replace("yyyy", nowYear)
                                     .replace("MM", String(nowDate.getMonth() + 1).padLeft(2, "0"));

                    //valueText規定格式為yyyyMM
                    valueText = realYear.toString()
                                + String((nowDate.getMonth() + 1)).padLeft(2, "0");

                    that.options.shortcut_data_source.push({
                        ShortcutKey: keyText,
                        ShortcutValue: valueText
                    });

                    //遞減月份
                    nowDate.setMonth(nowDate.getMonth() - 1);

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

        _quickClick: function (realDate) {

            var that = this
                , startDate = ""
                , endDate = ""
                , startInterval = that.startInterval.data("kendo" + that.options.childName)
                , endInterval = that.endInterval.data("kendo" + that.options.childName);

            //Step1: 針對realDate做調整
            if (realDate.length == 4) {
                //表示快速查詢為年格式

                startDate = StringFormatObject.DateTime.FormatDate(realDate + "01", that.options.format, false);

                if (that.options.diff_unit !== null) {
                    endDate = StringFormatObject.DateTime.FormatDate(that._diffdate(realDate + "01", that.options.diff), that.options.format, false);
                }
                else {
                    endDate = StringFormatObject.DateTime.FormatDate(realDate + "12", that.options.format, false);
                }
            }
            else if (realDate.length == 6) {
                //表示快速查詢為年月格式

                startDate = StringFormatObject.DateTime.FormatDate(realDate, that.options.format, false);

                if (that.options.diff_unit !== null) {
                    endDate = StringFormatObject.DateTime.FormatDate(that._diffdate(realDate, that.options.diff), that.options.format, false);
                }
                else {
                    var dateObj = startInterval._splitDate(startDate, that.options.format);

                    endDate = new Date(dateObj.yyyy + "/" + dateObj.MM + "/01");
                    endDate.setMonth(endDate.getMonth() + 1);
                    endDate.setDate(endDate.getDate() - 1);
                    endDate = StringFormatObject.DateTime.FormatDate(endDate, that.options.format, false);
                }
            }

            //Step2: 設定開始日期
            if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 1) {

                if (startInterval._validteDate(startDate)) {

                    startInterval.min(new Date(1900, 0, 1));
                    startInterval.max(new Date(2099, 11, 31));

                    //因為datepicker底層設定值是使用西元年, 所以在此傳入西元年
                    startInterval.value(startDate);
                }
                else {
                    startInterval.value(null);
                }

            }

            //Step3: 設定結束日期
            if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 2) {

                if (endInterval._validteDate(endDate)) {

                    endInterval.min(new Date(1900, 0, 1));
                    endInterval.max(new Date(2099, 11, 31));

                    //因為datepicker底層設定值是使用西元年, 所以在此傳入西元年
                    endInterval.value(endDate);
                }
                else {
                    endInterval.value(null);
                }

            }

            //Step4: 重新設定開始日期及結束日期的最大值, 最小值
            if (startDate != null && endDate != null) {

                startInterval.max(endInterval.value());
                endInterval.min(startInterval.value());

            }

            if (that._chkRequired()) {

                //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                }

            }

            if (that.options.is_escape_confirm) {
                that.options.is_change = true;
            }

        },

        // the templates for each of the UI elements that comprise the widget
        _templates: {
            input: "<input />'",
            quickButton: "<span />"
        },

        _diffdate: function (date, diff) {
            var that = this,
                startDate = "";

            startDate = new Date(date.substr(0, 4) + "/" + date.substr(4, 2) + "/01");

            startDate.setMonth(startDate.getMonth() + diff);
            return StringFormatObject.DateTime.FormatDate(startDate, "yyyyMM", false);
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssIntervalMonthYearPicker);

})(jQuery);