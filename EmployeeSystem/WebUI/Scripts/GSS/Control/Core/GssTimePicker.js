/// <reference path="../Common/StringFormatObject.js" />
/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 擴充KendoTimePicker功能 - 時間TimePicker
//描述: 時間輸入
//歷程: 1. 2014/05/21   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , KendoTimePicker = ui.TimePicker;

    /**
     * @classdesc 擴充KendoTimePicker功能 - 時間TimePicker
     * @class BestTimePicker
     */
    var GssTimePicker = KendoTimePicker.extend({

        init: function (element, options) {

            // cache a reference to this
            var that = this
                , initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //刪除畫面上重複的container
            that._removeAppendContainer(element.id);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            KendoTimePicker.fn.init.call(this, element, options);

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

        },

        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestTimePicker
             * @MemberOf BestTimePicker
             */
            name: "BestTimePicker",

            /**
             * @property {string} suffix 控制項的後置文字
             * @default ""
             * @MemberOf BestTimePicker
             */
            suffix: ControlDefaultsObject.TimePicker.suffix || "",

            /**
             * @property {bool} is_twelve_hour 是否為12小時制
             * @default false
             * @MemberOf BestTimePicker
             * @desc 若為12小時制, 顯示2:00 PM; 若不是12小時制, 顯示23:00
             */
            is_twelve_hour: ControlDefaultsObject.TimePicker.is_twelve_hour || false,

            /**
             * @property {bool} allow_shortcut 是否顯示快速查詢按鈕
             * @default false
             * @MemberOf BestTimePicker             
             */
            allow_shortcut: ControlDefaultsObject.TimePicker.allow_shortcut || false,

            /**
             * @property {arraylist} shortcut_data_source 快速查詢的datasource
             * @default []
             * @MemberOf BestTimePicker
             * @desc 可自行設定快速查詢的資料來源, 若沒有設定則由widget依據目前時間去產生
             */
            shortcut_data_source: ControlDefaultsObject.TimePicker.shortcut_data_source || [],

            /**
             * @property {int} interval 時間間隔
             * @default 60
             * @MemberOf BestTimePicker
             * @desc 預設區間為1小時
             */
            interval: ControlDefaultsObject.TimePicker.interval || 60,

            /**
             * @property {date} min 時間可設定的最小值
             * @default Date(1900, 0, 1)
             * @MemberOf BestTimePicker
             */
            min: ControlDefaultsObject.TimePicker.min || new Date(1900, 0, 1, 0, 0, 0),

            /**
             * @property {date} max 日期可設定的最大值
             * @default Date(2099, 11, 31)
             * @MemberOf BestTimePicker
             */
            max: ControlDefaultsObject.TimePicker.max || new Date(1900, 0, 1, 0, 0, 0),

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTimePicker
             */
            is_escape_confirm: ControlDefaultsObject.TimePicker.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTimePicker
             */
            is_change: ControlDefaultsObject.TimePicker.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestTimePicker
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestTimePicker
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestTimePicker
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default 時間
             * @MemberOf BestTimePicker
             */
            error_message: "時間",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestTimePicker
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestTimePicker
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestTimePicker
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestTimePicker
         * @method Bvalue
         * @param {string} setValue 時間字串, 格式為hhmm
         * @return {string} 符合控制項設定格式的時間字串
         * @example
         * 取值: element.BestTimePicker().Bvalue();
         * 設值: element.BestTimePicker().Bvalue("0800");
         */
        Bvalue: function (setValue) {

            // cache a reference to this
            var that = this
                , elementObj = that.element.data("kendo" + that.options.name)
                , realTime = "";

            if (typeof setValue !== 'undefined') {

                realTime = StringFormatObject.DateTime.FormatTime(setValue, that.options.is_twelve_hour);

                if (that._validteTime(realTime)) {

                    //設定開始時間
                    elementObj.value(realTime);

                }
                else {
                    elementObj.value(null);
                }

            }
            else {

                if (elementObj.value() != null) {
                    //以kendo內的值為主
                    return changeTimeToHmm(elementObj.value());
                }
                else {
                    //取不到kendo內的值則取畫面上的值
                    return $.trim(that.element[0].value);
                }

            }

        },

        /**
         * @desc 設定控制項是否唯讀
         * @memberof BestTimePicker
         * @method Breadonly
         * @param {bool} readonly 是否唯讀
         * @example
         * 唯讀: element.Breadonly();
         * 唯讀: element.Breadonly(true);
         * 不唯讀: element.Breadonly(false);
         */
        Breadonly: function (readonly) {

            var that = this
                , isReadonly = readonly === undefined ? true : readonly;

            //先執行kendo原生的readonly方法
            that.readonly(isReadonly);

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
                readonly: false,
                disable: isReadonly
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
         * @memberof BestTimePicker
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
         * @memberof BestTimePicker
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
         * @memberof BestTimePicker
         * @method BsetOptions
         * @example
         * 設定options: element.setOptions({ readonly_mode: "N" });
         */
        BsetOptions: function (options) {

            var that = this;

            ui.Widget.fn.setOptions.call(that, options);

        },

        //清除畫面上重複產生的container, 減輕瀏覽器負擔(須處理的有dropdownlist, timepicker, datepicker, datagrid)
        _removeAppendContainer: function (nowId) {

            var containerObj = $(document).find("div[data-role='popup']")
                , containerId = nowId + "_timeview"
                , thisObj = null;

            containerObj.each(function (index, item) {

                thisObj = $(this)

                if (item.children.length > 0) {

                    //把已經存在的container刪除
                    if (containerId == item.children[0].id) {

                        thisObj.parent(".k-animation-container").remove();
                        thisObj.remove();

                    }

                }

            });

        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this;

            // set the initial toggled state
            that.toggle = true;

            //設定語系及時間格式
            //時間語系暫時使用AM, PM
            var timeFormat = that.options.is_twelve_hour ? "h:mm tt" : "H:mm";

            that.element.data("kendo" + that.options.name).setOptions({
                //culture: BaseObject.LocalLang,
                format: timeFormat,
                interval: that.options.interval,
                max: that.options.max,
                min: that.options.min
            });

            //註冊事件
            that.element.on("blur", $.proxy(that._blur, that));
            that.element.on("keypress", $.proxy(that._keypress, that));

            if (that.options.is_escape_confirm) {
                that.element.on("change", $.proxy(that._customchange, that));
            }

            //設置後至文字
            if ($.trim(that.options.suffix).length != 0) {
                that.element.parent().parent().after("<span>  " + that.options.suffix + "  </span>");
            }

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
                 , time = $.trim(that.element[0].value)
                 , elementObj = that.element.data("kendo" + that.options.name);

            if (time != "") {

                that._chkKeyInValue(time);

            }
            else {
                elementObj.value(null);
            }

        },

        //change事件
        _customchange: function () {
            this.options.is_change = true;
        },

        _keypress: function (e) {

            var that = this
                 , key = e.keyCode
                 , char = e.charCode;

            //0~9, space鍵, tab鍵, backspace鍵, delete鍵, home鍵, end鍵, 上下左右鍵, 功能組合鍵, :鍵, aA pP mM鍵
            if ((char >= 48 && char <= 57) || char == 32 || key == 9 || key == 8 || key == 46
                || key == 36 || key == 35 || (key >= 37 && key <= 40) || e.ctrlKey || char == 58
                || (char == 97 || char == 65) || (char == 112 || char == 80) || (char == 109 || char == 77)) {
                return true;
            }
            else {
                return false;
            }

        },

        //檢測畫面上輸入的資料
        _chkKeyInValue: function (time) {

            var that = this
                , elementObj = that.element.data("kendo" + that.options.name);

            if (that._chkRequired()) {

                if (that._validteTime(time)) {
                    elementObj.value(time);

                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }
                }
                else {

                    //時間格式錯誤
                    alert("時間格式錯誤");
                    elementObj.value(null);

                }

            }

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

        _validteTime: function (time) {

            var that = this
                 , legal = false
                 , initRegExp = "";

            //依據format動態產生regExp
            initRegExp = that.options.is_twelve_hour ? that.options.format.replace("h", "\\d{1,2}") : that.options.format.replace("H", "\\d{1,2}");
            initRegExp = initRegExp.replace(":", "\\:");
            initRegExp = initRegExp.replace("mm", "\\d{2}");
            //時間語系暫時使用AM, PM
            initRegExp = initRegExp.replace("tt", "(am|AM|pm|PM)");
            regExp = new RegExp("^" + initRegExp + "$", "g");

            if (regExp.test(time)) {

                legal = true;

            }

            return legal;

        },

        _bindQuickBtn: function () {

            var that = this
                , appendObj = that.element.parent().parent().parent();

            //若未輸入任何快速查詢的值, 則為現在時間往後延累加1小時
            if ($.trim(that.options.shortcut_data_source).length == 0) {

                var nowDate = new Date()
                    , nowHM = ""
                    , realHM = "";

                for (var i = 0; i < 5; i++) {

                    //現在時間往後延累加1小時
                    nowDate.setHours(nowDate.getHours() + 1);
                    nowDate.setMinutes(0);

                    if (that.options.is_twelve_hour) {

                        if (nowDate.getHours() >= 12) {
                            nowHM = nowDate.getHours() - 12;
                            nowHM = nowHM == 0 ? "12" : nowHM
                                    + ":" + String(nowDate.getMinutes()).padLeft(2, "0") + " PM";
                        }
                        else {
                            nowHM = nowDate.getHours();
                            nowHM = nowHM == 0 ? "12" : nowHM
                                    + ":" + String(nowDate.getMinutes()).padLeft(2, "0") + " AM";
                        }

                    }
                    else {
                        nowHM = nowDate.getHours() + ":" + String(nowDate.getMinutes()).padLeft(2, "0");
                    }

                    realHM = nowDate.getHours() + String(nowDate.getMinutes()).padLeft(2, "0");

                    that.options.shortcut_data_source.push({
                        ShortcutKey: nowHM,
                        ShortcutValue: realHM
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
                , elementObj = that.element.data("kendo" + that.options.name);

            realTime = StringFormatObject.DateTime.FormatTime(realTime, that.options.is_twelve_hour);

            if (that._validteTime(realTime)) {
                elementObj.value(realTime);

                if (that._chkRequired()) {
                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }
                }
            }
            else {
                elementObj.value(null);
            }

            if (that.options.is_escape_confirm) {
                that._customchange();
            }

        },

        // the templates for each of the UI elements that comprise the widget
        _templates: {
            quickButton: "<span />"
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssTimePicker);

    //===================================== Private Method For Calendar =====================================

    //將datetime轉成Hmm
    function changeTimeToHmm(date) {

        var yyyy = 0
            , MM = 0
            , dd = 0
            , finalTime = "";

        if ($.type(date) === "date") {

            //en-US: 當時間為12小時制時, 會自動加上AM, PM
            //hour12: 控制時間是否為12小時制
            //hour, minute: 在此我們只取時分, 不取秒
            finalTime = date.toLocaleTimeString("en-US",
                                    {
                                        hour12: false,
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });

        }

        return finalTime.replace(":", "");

    }

    //===================================== Private Method For Calendar =====================================

})(jQuery);