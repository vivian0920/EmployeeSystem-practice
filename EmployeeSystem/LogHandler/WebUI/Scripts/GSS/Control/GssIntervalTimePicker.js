/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 擴充KendoTimePicker功能 - 時間區間IntervalTimePicker
//描述: 時間區間輸入
//歷程: 1. 2014/05/21   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget;

    /**
     * @classdesc 時間區間IntervalTimePicker
     * @class BestIntervalTimePicker
     */
    var GssIntervalTimePicker = Widget.extend({

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

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

            that.element.on("change", $.proxy(that._change, that));

        },

        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestIntervalTimePicker
             * @MemberOf BestIntervalTimePicker
             */
            name: "BestIntervalTimePicker",

            /**
             * @property {string} childName Widget中子控制項的namespace
             * @default BestTimePicker
             * @MemberOf BestIntervalTimePicker
             */
            childName: "BestTimePicker",

            /**
             * @property {bool} is_twelve_hour 是否為12小時制
             * @default false
             * @MemberOf BestIntervalTimePicker
             * @desc 若為12小時制, 顯示2:00 PM; 若不是12小時制, 顯示23:00
             */
            is_twelve_hour: ControlDefaultsObject.IntervalTimePicker.is_twelve_hour || false,

            /**
             * @property {bool} allow_shortcut 是否顯示快速查詢按鈕
             * @default false
             * @MemberOf BestIntervalTimePicker             
             */
            allow_shortcut: ControlDefaultsObject.IntervalTimePicker.allow_shortcut || false,

            /**
             * @property {arraylist} shortcut_data_source 快速查詢的datasource
             * @default []
             * @MemberOf BestIntervalTimePicker
             * @desc 可自行設定快速查詢的資料來源, 若沒有設定則由widget依據目前時間去產生
             */
            shortcut_data_source: ControlDefaultsObject.IntervalTimePicker.shortcut_data_source || [],

            /**
             * @property {int} interval 時間間隔
             * @default 60
             * @MemberOf BestIntervalTimePicker
             * @desc 預設區間為1小時
             */
            interval: ControlDefaultsObject.IntervalTimePicker.interval || 60,

            /**
             * @property {string} suffix 控制項的後置文字
             * @default ""
             * @MemberOf BestIntervalTimePicker
             */
            suffix: ControlDefaultsObject.IntervalTimePicker.suffix || "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestIntervalTimePicker
             * @desc Y：startInterval及endInterval皆必填 <br>
                     1：startInterval必填，endInterval非必填 <br>
                     2：startInterval非必填，endInterval必填 <br>
                     3：startInterval及endInterval擇一填寫 <br>
                     4：startInterval及endInterval成對必填，可都不填但若要填寫一定要startInterval及endInterval都有值 <br>
                     N：startInterval及endInterval皆非必填
             */
            required_mode: ControlDefaultsObject.IntervalTimePicker.required_mode || "N",

            /**
             * @property {string} readonly_mode 控制項唯讀的模式
             * @default N
             * @MemberOf BestIntervalTimePicker
             * @desc Y：startInterval及endInterval皆唯讀 <br>
                     1：startInterval唯讀，endInterval非唯讀 <br>
                     2：startInterval非唯讀，endInterval唯讀 <br>
                     N：startInterval及endInterval皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.IntervalTimePicker.readonly_mode || "N",

            /**
             * @property {date} min 時間可設定的最小值
             * @default Date(1900, 0, 1)
             * @MemberOf BestIntervalTimePicker
             */
            min: ControlDefaultsObject.IntervalTimePicker.min || new Date(1900, 0, 1, 0, 0, 0),

            /**
             * @property {date} max 日期可設定的最大值
             * @default Date(2099, 11, 31)
             * @MemberOf BestIntervalTimePicker
             */
            max: ControlDefaultsObject.IntervalTimePicker.max || new Date(1900, 0, 1, 0, 0, 0),

            /**
             * @property {string} diff_operator Less小於/More大於
             * @default null
             * @MemberOf BestIntervalTimePicker
             */
            diff_operator: ControlDefaultsObject.IntervalTimePicker.diff_operator || null,

            //已有時間間隔，先保留
            /**
             * @property {string} diff 差距值
             * @default null
             * @MemberOf BestIntervalTimePicker
             */
            diff: ControlDefaultsObject.IntervalTimePicker.diff || null,

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestIntervalTimePicker
             */
            is_escape_confirm: ControlDefaultsObject.IntervalTimePicker.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestIntervalTimePicker
             */
            is_change: ControlDefaultsObject.IntervalTimePicker.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestIntervalTimePicker
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestIntervalTimePicker
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 時間區間
             * @MemberOf BestIntervalTimePicker
             */
            error_message: "時間區間",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestIntervalTimePicker
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestIntervalTimePicker
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 開始控制項的取值跟設值方法(依據kendo原生的方法)
         * @memberof BestIntervalTimePicker
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

                //設定開始時間
                startInterval.value(setValue);
                that._startChange();

            }
            else {
                return startInterval.value();
            }

        },

        /**
         * @desc 開始控制項的取值跟設值方法
         * @memberof BestIntervalTimePicker
         * @method BstartValue
         * @param {string} setValue 時間字串, 格式為hhmm
         * @return {string} 符合控制項設定格式的時間字串
         * @example
         * 取值: element.BstartValue();
         * 設值: element.BstartValue("0800");
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
         * @memberof BestIntervalTimePicker
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
                endInterval.value(setValue);
                that._endChange();

            }
            else {
                return endInterval.value();
            }

        },

        /**
         * @desc 結束控制項的取值跟設值方法
         * @memberof BestIntervalTimePicker
         * @method BendValue
         * @param {string} setValue 時間字串, 格式為hhmm
         * @return {string} 符合控制項設定格式的時間字串
         * @example
         * 取值: element.BendValue();
         * 設值: element.BendValue("2300");
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
         * @memberof BestIntervalTimePicker
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
         * @memberof BestIntervalTimePicker
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
         * @memberof BestIntervalTimePicker
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
         * @memberof BestIntervalTimePicker
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

            //Step1: 產生開始年份控制項
            template = kendo.template(that._templates.input);
            that.startInterval = $(template(that.options));

            that.element.append(that.startInterval);

            //註冊事件
            that.startInterval.on("change", $.proxy(that._startChange, that));

            //Step2: 產生結束時間控制項
            template = kendo.template(that._templates.input);
            that.endInterval = $(template(that.options));

            //動態產生結束日期控制項
            that.element.append(" ~ ").append(that.endInterval);

            //註冊事件
            that.endInterval.on("change", $.proxy(that._endChange, that));

            //Step3: 將時間區間控制項套用底層格式
            that.startInterval.kendoBestTimePicker({
                is_twelve_hour: that.options.is_twelve_hour,
                interval: that.options.interval,
                min: that.options.min,
                max: that.options.max,
                is_target: false    //設定為非目標物
            });

            that.endInterval.kendoBestTimePicker({
                is_twelve_hour: that.options.is_twelve_hour,
                interval: that.options.interval,
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
                , startTime = $.trim(startInterval.element[0].value)
                , endTime = null;

            if (startTime.length != 0) {

                //檢測畫面上輸入的資料
                startInterval._chkKeyInValue(startTime);

                //若輸入的開始時間大於結束時間, 就會等於null
                if (startInterval.value() != null) {

                    if (startInterval.value() > endInterval.value()) {

                        if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 2) {

                            //設定結束時間
                            endTime = new Date(startInterval.value());
                            endTime.setMinutes(endTime.getMinutes() + that.options.interval);
                            endInterval.value(endTime);

                        }

                    }

                }

                if (that._chkRequired()) {

                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }

                }

            }
        },

        _endChange: function () {

            // cache a reference to this
            var that = this
                , startInterval = that.startInterval.data("kendo" + that.options.childName)
                , endInterval = that.endInterval.data("kendo" + that.options.childName)
                , endTime = $.trim(endInterval.element[0].value)
                , startTime = null;

            if (endTime.length != 0) {

                //檢測畫面上輸入的資料
                endInterval._chkKeyInValue(endTime);

                //若輸入的結束時間小於開始時間, 就會等於null
                if (endInterval.value() != null) {

                    if (endInterval.value() < startInterval.value() || startInterval.value() == null) {

                        if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 1) {

                            //設定開始時間
                            startTime = new Date(endInterval.value());
                            startTime.setMinutes(startTime.getMinutes() - that.options.interval);
                            startInterval.value(startTime);

                        }

                    }

                }

                if (that._chkRequired()) {

                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }

                }

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

            //若未輸入任何快速查詢的值, 則為現在時間往後延累加1小時
            if ($.trim(that.options.shortcut_data_source).length == 0) {

                var nowDate = new Date()
                    , nowHM = ""
                    , realHM = "";

                for (var i = 0; i < 5; i++) {

                    //現在時間往後延累加1小時
                    nowDate.setHours(nowDate.getHours() + 1);
                    nowDate.setMinutes(0);

                    //en-US: 當時間為12小時制時, 會自動加上AM, PM
                    //hour12: 控制時間是否為12小時制
                    //hour, minute: 在此我們只取時分, 不取秒
                    nowHM = nowDate.toLocaleTimeString("en-US",
                                            {
                                                hour12: that.options.is_twelve_hour,
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })

                    realHM = nowDate.toLocaleTimeString("en-US",
                                            {
                                                hour12: false,
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            });

                    that.options.shortcut_data_source.push({
                        ShortcutKey: nowHM,
                        ShortcutValue: realHM.replace(":", "")
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

        _quickClick: function (realTime) {

            var that = this
                , startInterval = that.startInterval.data("kendo" + that.options.childName)
                , endInterval = that.endInterval.data("kendo" + that.options.childName)
                , startTime = null
                , endTime = null;

            realTime = StringFormatObject.DateTime.FormatTime(realTime, that.options.is_twelve_hour);

            //Step1: 設定開始時間
            if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 1) {

                if (startInterval._validteTime(realTime)) {

                    startTime = realTime;
                    startInterval.value(startTime);

                }
                else {
                    startInterval.value(null);
                }

            }

            //Step2: 設定結束時間
            if (that.options.readonly_mode != "Y" && that.options.readonly_mode != 2) {

                if (endInterval._validteTime(realTime)) {

                    if (that.options.readonly_mode == 1) {
                        endTime = realTime;
                        endInterval.value(endTime);
                    }
                    else {
                        endTime = new Date(startInterval.value());
                        endTime.setMinutes(endTime.getMinutes() + that.options.interval);
                        endInterval.value(endTime);
                    }

                }
                else {
                    startInterval.value(null);
                }

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
        }
    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssIntervalTimePicker);

})(jQuery);