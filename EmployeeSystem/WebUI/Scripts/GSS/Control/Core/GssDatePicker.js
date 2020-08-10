/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../Common/StringFormatObject.js" />
/// <reference path="../Common/Extend.js" />

//功能: 擴充KendoDatePicker功能 - 日期DatePicker
//描述: 日期輸入
//歷程: 1. 2014/05/14   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , KendoDatePicker = ui.DatePicker
        , getCulture = kendo.getCulture
        , calendar = kendo.calendar
        , isInRange = calendar.isInRange
        , restrictValue = calendar.restrictValue
        , isEqualDatePart = calendar.isEqualDatePart
        , MONTH = "month"
        , CENTURY = "century"
        , DATE = Date
        , adjustDST = kendo.date.adjustDST
        , OTHERMONTH = "k-other-month"
        , OTHERMONTHCLASS = ' class="' + OTHERMONTH + '"'
        , calendarThis = null
        , MS_PER_MINUTE = 60000
        , MS_PER_DAY = 86400000
        , cellTemplate = kendo.template('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link" href="\\#" data-#=data.ns#value="#=data.dateString#">#=data.value#</a></td>', { useWithBlock: false })
        , emptyCellTemplate = kendo.template('<td role="gridcell">&nbsp;</td>', { useWithBlock: false })
        , isTwYear = null;

    /**
     * @classdesc 擴充KendoDatePicker功能 - 日期DatePicker
     * @class BestDatePicker
     */
    var GssDatePicker = KendoDatePicker.extend({

        // define the init function which is called by the base widget
        init: function (element, options) {

            // cache a reference to this
            var that = this
                , initOptions = {}
                , defaultOptions = $.extend({}, that.options);

            //刪除畫面上重複的container
            that._removeAppendContainer(element.id);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            KendoDatePicker.fn.init.call(this, element, options);

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestDatePicker
             * @MemberOf BestDatePicker
             */
            name: "BestDatePicker",

            /**
             * @property {bool} is_tw_year 是否顯示民國年
             * @default false
             * @MemberOf BestDatePicker
             */
            is_tw_year: ControlDefaultsObject.DatePicker.is_tw_year || false,

            /**
             * @property {string} date_delimiter 日期間的分隔符號
             * @default /
             * @MemberOf BestDatePicker
             */
            date_delimiter: ControlDefaultsObject.DatePicker.date_delimiter || "/",

            /**
             * @property {bool} allow_shortcut 是否顯示快速查詢按鈕
             * @default false
             * @MemberOf BestDatePicker             
             */
            allow_shortcut: ControlDefaultsObject.DatePicker.allow_shortcut || false,

            /**
             * @property {arraylist} shortcut_data_source 快速查詢的datasource
             * @default []
             * @MemberOf BestDatePicker
             * @desc 可自行設定快速查詢的資料來源, 若沒有設定則由widget依據目前時間去產生
             */
            shortcut_data_source: ControlDefaultsObject.DatePicker.shortcut_data_source || [],

            /**
             * @property {string} format 日期顯示的格式
             * @default yyyy/MM/dd
             * @MemberOf BestDatePicker
             */
            format: ControlDefaultsObject.DatePicker.format || "yyyy/MM/dd",

            /**
             * @property {string} suffix 控制項的後置文字
             * @default ""
             * @MemberOf BestDatePicker
             */
            suffix: ControlDefaultsObject.DatePicker.suffix || "",

            /**
             * @property {date} min 日期可設定的最小值
             * @default Date(1900, 0, 1)
             * @MemberOf BestDatePicker
             */
            min: ControlDefaultsObject.DatePicker.min || new Date(1900, 0, 1),

            /**
             * @property {date} max 日期可設定的最大值
             * @default Date(2099, 11, 31)
             * @MemberOf BestDatePicker
             */
            max: ControlDefaultsObject.DatePicker.max || new Date(2099, 11, 31),

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestDatePicker
             */
            is_escape_confirm: ControlDefaultsObject.DatePicker.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestDatePicker
             */
            is_change: ControlDefaultsObject.DatePicker.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestDatePicker
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestDatePicker
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestDatePicker
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default 日期
             * @MemberOf BestDatePicker
             */
            error_message: "日期",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestDatePicker
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestDatePicker
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestDatePicker
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestDatePicker
         * @method Bvalue
         * @param {string} setValue 日期字串, 格式為yyyyMMdd
         * @return {string} 符合控制項設定格式的日期字串
         * @example
         * 取值: element.BestDatePicker().Bvalue();
         * 設值: element.BestDatePicker().Bvalue("20140724");
         */
        Bvalue: function (setValue) {

            // cache a reference to this
            var that = this
                , elementObj = that.element.data("kendo" + that.options.name)
                , realDate = ""
                , mode = that.options.start || that.options.depth;

            if (typeof setValue !== 'undefined') {

                //設定日期
                elementObj.min(ControlDefaultsObject.DatePicker.min);
                elementObj.max(ControlDefaultsObject.DatePicker.max);

                //將yyyyMMdd格式化成為符合目前datepicker設定的格式
                if (setValue != null) {
                    realDate = StringFormatObject.DateTime.FormatDate(setValue, that.options.format, false);
                }

                if (that._validteDate(realDate)) {
                    elementObj.value(realDate);
                }
                else {
                    elementObj.value(null);
                }

            }
            else {

                if (elementObj.value() != null) {
                    //以kendo內的值為主
                    return changeDateToyyyyMMdd(elementObj.value(), mode);
                }
                else {
                    //取不到kendo內的值則取畫面上的值
                    return $.trim(that.element[0].value);
                }

            }

        },

        /**
         * @desc 設定控制項是否唯讀
         * @memberof BestDatePicker
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
         * @memberof BestDatePicker
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
         * @memberof BestDatePicker
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
         * @memberof BestDatePicker
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
                , containerId = nowId + "_dateview"
                , thisObj = null;

            containerObj.each(function (index, item) {

                thisObj = $(this)

                //把已經存在的container刪除
                if (containerId == item.id) {

                    thisObj.parent(".k-animation-container").remove();
                    thisObj.remove();

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

            //設定語系
            that.element.data("kendo" + that.options.name).setOptions({
                culture: BaseObject.LocalLang
            });

            //註冊事件
            that.element.on("keypress", $.proxy(that._keypress, that));

            //提示訊息為日期格式
            that.element.attr("placeholder", (that.options.is_tw_year ? that.options.format.replace("yyyy", "yyy") : that.options.format));

            //設置後至文字
            if ($.trim(that.options.suffix).length != 0) {
                that.element.parent().parent().after("<span>  " + that.options.suffix + "  </span>");
            }

            //設定快速查詢按鈕
            if (that.options.allow_shortcut) {
                that._bindQuickBtn();
            }

            //覆寫kendoDatePicker原生地function
            that.dateView._setOptions = that._dateViewSetOptions;

            if (that.options.is_escape_confirm) {
                that.element.on("change", $.proxy(that._customchange, that));
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

        //覆寫kendoDatepicker原生地function
        _blur: function () {

            // cache a reference to this
            var that = this
                , date = $.trim(that.element[0].value)
                , elementObj = that.element.data("kendo" + that.options.name);

            if (date != "") {

                that._chkKeyInValue(date);

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
                 , key = e.keyCode || e.which
                 , delimiter = that.options.date_delimiter.charCodeAt(0);    //將格式符號轉成charCode

            //0~9, tab鍵, backspace鍵, delete鍵, home鍵, end鍵, 上下左右鍵, 功能組合鍵, 日期格式的分割字元
            if ((key >= 48 && key <= 57) || key == 9 || key == 8 || key == 46 || key == 36 || key == 35
                || (key >= 37 && key <= 40) || e.ctrlKey || key == delimiter) {

                return true;
            }
            else {

                return false;
            }

        },

        //檢測畫面上輸入的資料
        _chkKeyInValue: function (date) {

            var that = this
                , AD_Date = ""
                , elementObj = that.element.data("kendo" + that.options.name);

            if (that._chkRequired()) {

                //若輸入的值符合目前格式少掉分隔符號的長度, 則需要幫使用者加回分隔符號
                date = $.trim(that.options.date_delimiter).length != 0 ? that._auotAddDelimiter(date) : date;

                //若為民國年則轉成西元年, 因為kendoui datepicker設定資料須使用西元年
                AD_Date = that.options.is_tw_year ? that._changeTWtoAD(date) : date;

                if (that._validteDate(AD_Date)) {
                    elementObj.value(AD_Date);
                    that.element[0].value = date;   //將加回分隔符號的值寫回畫面上

                    //將共用ErrorDialogObservableObject.GetNowErrorDialog()中, 存在的錯誤訊息刪除
                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }
                }
                else {

                    //日期格式錯誤
                    alert("日期格式錯誤");
                    that.element[0].focus();
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

        //自動幫使用者加上Delimiter符號
        _auotAddDelimiter: function (date) {

            // cache a reference to this
            var that = this
                , date_delimiterIndex = date.indexOf(that.options.date_delimiter)
                , nowDateFormat = that.options.format.replace(that.options.date_delimiter, "").replace(that.options.date_delimiter, "")
                , nowDateFormat = that.options.is_tw_year ? nowDateFormat.replace("yyyy", "yyy") : nowDateFormat
                , dateObj = {};

            //date_delimiterIndex == -1 表示有分隔符號, 但是使用者未輸入
            //date.length == initFormat.length 表示使用者輸入的長度跟沒有分隔符號的format長度相同
            if (date_delimiterIndex == -1 && date.length == nowDateFormat.length) {

                dateObj = that._splitDate(date, nowDateFormat)

                date = that.options.format.replace("dd", dateObj.dd);
                date = date.replace("MM", dateObj.MM);
                date = date.replace("yyyy", dateObj.yyyy);

            }

            return date;

        },

        //將西元年轉成民國年
        _changeADtoTW: function (date) {

            var that = this
                , dateObj = that._splitDate(date, that.options.format)
                , resultDate = "";

            if (dateObj.yyyy != "") {

                resultDate = date.replace(dateObj.yyyy, StringFormatObject.DateTime.GetTWYear(dateObj.yyyy));
            }

            return resultDate;

        },

        //將民國年轉成西元年
        _changeTWtoAD: function (date) {

            var that = this
                , nowDateFormat = that.options.format.replace("yyyy", "yyy")
                , dateObj = that._splitDate(date, nowDateFormat)
                , resultDate = "";

            if (dateObj.yyyy != "") {
                resultDate = date.replace(dateObj.yyyy, StringFormatObject.DateTime.GetADYear(dateObj.yyyy).toString());
            }

            return resultDate;

        },

        //依據傳入的日期格式將日期分割成年,月,日
        _splitDate: function (date, dateSplitFormat) {

            var that = this
                , ddIndex = dateSplitFormat.indexOf("dd")
                , MMIndex = dateSplitFormat.indexOf("MM")
                , yyyyIndex = -1
                , dd = ""
                , MM = ""
                , yyyy = ""
                , initRegExp = ""
                , dateAry = []
                , min = -1
                , max = -1;

            //依據format動態產生regExp
            if (dateSplitFormat.indexOf("yyyy") != -1) {
                yyyyIndex = dateSplitFormat.indexOf("yyyy");
                initRegExp = dateSplitFormat.replace("yyyy", "(\\d{4})");
            }
            else {
                yyyyIndex = dateSplitFormat.indexOf("yyy");
                initRegExp = dateSplitFormat.replace("yyy", "([-]?\\d{1,3})");
            }

            initRegExp = initRegExp.replace("MM", "(\\d{1,2})");
            initRegExp = initRegExp.replace("dd", "(\\d{1,2})");

            var regExp = new RegExp("^" + initRegExp + "$");

            if (regExp.test(date)) {

                //array長度總總共為4
                dateAry = date.match(regExp);

                if (dateAry.length == 4) {
                    //表示年月日

                    //判斷年月日先後順序
                    min = Math.min(yyyyIndex, MMIndex, ddIndex);
                    max = Math.max(yyyyIndex, MMIndex, ddIndex);
                }
                else if (dateAry.length == 3) {
                    //表示年月

                    //判斷年月日先後順序
                    min = Math.min(yyyyIndex, MMIndex);
                }

                //Step1: set min
                if (yyyyIndex == min) {
                    yyyy = dateAry[1];
                }
                else if (MMIndex == min) {
                    MM = dateAry[1];
                }
                else {
                    dd = dateAry[1];
                }

                //Step2: set max
                if (yyyyIndex == max) {
                    yyyy = dateAry[3];
                }
                else if (MMIndex == max) {
                    MM = dateAry[3];
                }
                else {
                    dd = dateAry[3];
                }

                //Step3: set middle
                if (yyyy == "") {
                    yyyy = dateAry[2];
                }
                else if (MM == "") {
                    MM = dateAry[2];
                }
                else {
                    dd = dateAry[2];
                }

            }

            return {
                yyyy: yyyy,
                MM: MM,
                dd: dd
            };

        },

        _validteDate: function (date) {

            var that = this
                , legal = false
                , nowDateFormat = that.options.is_tw_year ? that.options.format.replace("yyyy", "yyy") : that.options.format
                , dateObj = {};

            //若為西元年則需轉成民國年
            date = that.options.is_tw_year ? that._changeADtoTW(date) : date;
            dateObj = that._splitDate(date, nowDateFormat);

            if (that.options.start == "year" && that.options.depth == "year") {
                //表示日期為年月格式

                if (dateObj.yyyy != "" && dateObj.MM != "") {

                    //確認月: 1~12
                    if (parseInt(dateObj.MM, 10) >= 1 && parseInt(dateObj.MM, 10) <= 12) {

                        legal = true;

                    }

                }

            }
            else {
                //表示日期為年月日格式

                if (dateObj.yyyy != "" && dateObj.MM != "" && dateObj.dd != "") {

                    //確認月: 1~12;  日: 1~31
                    if (parseInt(dateObj.MM, 10) >= 1 && parseInt(dateObj.MM, 10) <= 12
                        && parseInt(dateObj.dd, 10) >= 1 && parseInt(dateObj.dd, 10) <= 31) {

                        legal = true;

                    }

                }

            }

            return legal;

        },

        _bindQuickBtn: function () {

            var that = this
                , appendObj = that.element.parent().parent().parent();

            //表示沒有設定任何快速查詢資料
            if (that.options.shortcut_data_source.length == 0) {

                //未輸入快速查詢的日期, 則用當天
                var nowDate = new Date()
                     , nowYear = that.options.is_tw_year ? StringFormatObject.DateTime.GetTWYear(nowDate.getFullYear()) : nowDate.getFullYear()
                     , realYear = nowDate.getFullYear()
                     , keyText = ""
                     , valueText = "";

                keyText = that.options.format;
                keyText = keyText.replace("yyyy", nowYear)
                                            .replace("MM", String((nowDate.getMonth() + 1)).padLeft(2, "0"))
                                            .replace("dd", String(nowDate.getDate()).padLeft(2, "0"));

                //valueText規定格式為yyyyMMdd
                valueText = realYear.toString()
                            + String((nowDate.getMonth() + 1)).padLeft(2, "0")
                            + String(nowDate.getDate()).padLeft(2, "0");

                that.options.shortcut_data_source.push({
                    ShortcutKey: keyText,
                    ShortcutValue: valueText
                });

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
                , elementObj = that.element.data("kendo" + that.options.name);

            //針對realDate做調整
            if (realDate.length == 4) {
                //表示只有年分, 需要預設帶入月份為1

                realDate += "01";
            }

            //將yyyyMMdd格式化成為符合目前datepicker設定的格式
            realDate = StringFormatObject.DateTime.FormatDate(realDate, that.options.format, false);

            if (that._validteDate(realDate)) {
                //因為datepicker底層設定值是使用西元年, 所以在此傳入西元年
                elementObj.value(realDate);

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

        _dateViewSetOptions: function (options) {

            var that = this;

            isTwYear = options.is_tw_year;

            //Step1: 覆寫kendoCalendar的views屬性
            if (isTwYear) {
                calendar.views = [
                    {
                        name: MONTH,
                        title: function (date, min, max, culture) {

                            var resultTitle = ""
                                , twYear = null;

                            //增加民國年判斷
                            if (isTwYear) {
                                twYear = StringFormatObject.DateTime.GetTWYear(date.getFullYear());

                                //民國0年訂為民國前1年
                                resultTitle = getCalendarInfo(culture).months.names[date.getMonth()] + " " + (twYear == 0 ? -1 : twYear);
                            }
                            else {
                                resultTitle = getCalendarInfo(culture).months.names[date.getMonth()] + " " + date.getFullYear();
                            }

                            return resultTitle;
                        },
                        content: function (options) {
                            var that = this,
                            idx = 0,
                            min = options.min,
                            max = options.max,
                            date = options.date,
                            dates = options.dates,
                            format = options.format,
                            culture = options.culture,
                            navigateUrl = options.url,
                            hasUrl = navigateUrl && dates[0],
                            currentCalendar = getCalendarInfo(culture),
                            firstDayIdx = currentCalendar.firstDay,
                            days = currentCalendar.days,
                            names = shiftArray(days.names, firstDayIdx),
                            shortNames = shiftArray(days.namesShort, firstDayIdx),
                            start = calendar.firstVisibleDay(date, currentCalendar),
                            firstDayOfMonth = that.first(date),
                            lastDayOfMonth = that.last(date),
                            toDateString = that.toDateString,
                            today = new DATE(),
                            html = '<table tabindex="0" role="grid" class="k-content" cellspacing="0"><thead><tr role="row">';

                            for (; idx < 7; idx++) {
                                html += '<th scope="col" title="' + names[idx] + '">' + shortNames[idx] + '</th>';
                            }

                            today = new DATE(today.getFullYear(), today.getMonth(), today.getDate());
                            adjustDST(today, 0);
                            today = +today;

                            return view({
                                cells: 42,
                                perRow: 7,
                                html: html += '</tr></thead><tbody><tr role="row">',
                                start: new DATE(start.getFullYear(), start.getMonth(), start.getDate()),
                                min: new DATE(min.getFullYear(), min.getMonth(), min.getDate()),
                                max: new DATE(max.getFullYear(), max.getMonth(), max.getDate()),
                                content: options.content,
                                empty: options.empty,
                                setter: that.setDate,
                                build: function (date) {
                                    var cssClass = [],
                                        day = date.getDay(),
                                        linkClass = "",
                                        url = "#";

                                    if (date < firstDayOfMonth || date > lastDayOfMonth) {
                                        cssClass.push(OTHERMONTH);
                                    }

                                    if (+date === today) {
                                        cssClass.push("k-today");
                                    }

                                    if (day === 0 || day === 6) {
                                        cssClass.push("k-weekend");
                                    }

                                    if (hasUrl && inArray(+date, dates)) {
                                        url = navigateUrl.replace("{0}", kendo.toString(date, format, culture));
                                        linkClass = " k-action-link";
                                    }

                                    return {
                                        date: date,
                                        dates: dates,
                                        ns: kendo.ns,
                                        //增加民國年判斷
                                        title: toDateLocalString_chkIsTwYear(date, "D", culture, isTwYear),
                                        value: date.getDate(),
                                        dateString: toDateString(date),
                                        cssClass: cssClass[0] ? ' class="' + cssClass.join(" ") + '"' : "",
                                        linkClass: linkClass,
                                        url: url
                                    };
                                }
                            });
                        },
                        first: function (date) {
                            return calendar.firstDayOfMonth(date);
                        },
                        last: function (date) {
                            var last = new DATE(date.getFullYear(), date.getMonth() + 1, 0),
                                first = calendar.firstDayOfMonth(date),
                                timeOffset = Math.abs(last.getTimezoneOffset() - first.getTimezoneOffset());

                            if (timeOffset) {
                                last.setHours(first.getHours() + (timeOffset / 60));
                            }

                            return last;
                        },
                        compare: function (date1, date2) {
                            var result,
                            month1 = date1.getMonth(),
                            year1 = date1.getFullYear(),
                            month2 = date2.getMonth(),
                            year2 = date2.getFullYear();

                            if (year1 > year2) {
                                result = 1;
                            } else if (year1 < year2) {
                                result = -1;
                            } else {
                                result = month1 == month2 ? 0 : month1 > month2 ? 1 : -1;
                            }

                            return result;
                        },
                        setDate: function (date, value) {
                            var hours = date.getHours();
                            if (value instanceof DATE) {
                                date.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
                            } else {
                                calendar.setTime(date, value * MS_PER_DAY);
                            }
                            adjustDST(date, hours);
                        },
                        toDateString: function (date) {
                            return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
                        }
                    },
                    {
                        name: "year",
                        title: function (date) {
                            //增加民國年判斷
                            return isTwYear ? StringFormatObject.DateTime.GetTWYear(date.getFullYear()) : date.getFullYear();
                        },
                        content: function (options) {
                            var namesAbbr = getCalendarInfo(options.culture).months.namesAbbr,
                            toDateString = this.toDateString,
                            min = options.min,
                            max = options.max;

                            return view({
                                min: new DATE(min.getFullYear(), min.getMonth(), 1),
                                max: new DATE(max.getFullYear(), max.getMonth(), 1),
                                start: new DATE(options.date.getFullYear(), 0, 1),
                                setter: this.setDate,
                                build: function (date) {
                                    return {
                                        value: namesAbbr[date.getMonth()],
                                        ns: kendo.ns,
                                        dateString: toDateString(date),
                                        cssClass: ""
                                    };
                                }
                            });
                        },
                        first: function (date) {
                            return new DATE(date.getFullYear(), 0, date.getDate());
                        },
                        last: function (date) {
                            return new DATE(date.getFullYear(), 11, date.getDate());
                        },
                        compare: function (date1, date2) {
                            return compare(date1, date2);
                        },
                        setDate: function (date, value) {
                            var month,
                                hours = date.getHours();

                            if (value instanceof DATE) {
                                month = value.getMonth();

                                date.setFullYear(value.getFullYear(), month, date.getDate());

                                if (month !== date.getMonth()) {
                                    date.setDate(0);
                                }
                            } else {
                                month = date.getMonth() + value;

                                date.setMonth(month);

                                if (month > 11) {
                                    month -= 12;
                                }

                                if (month > 0 && date.getMonth() != month) {
                                    date.setDate(0);
                                }
                            }

                            adjustDST(date, hours);
                        },
                        toDateString: function (date) {
                            return date.getFullYear() + "/" + date.getMonth() + "/1";
                        }
                    },
                    {
                        name: "decade",
                        title: function (date, min, max) {
                            //增加民國年判斷
                            return calendarTitle_chkIsTwYear(date, min, max, 10, isTwYear);
                        },
                        content: function (options) {
                            var year = options.date.getFullYear(),
                            toDateString = this.toDateString;

                            return view({
                                start: new DATE(year - year % 10 - 1, 0, 1),
                                min: new DATE(options.min.getFullYear(), 0, 1),
                                max: new DATE(options.max.getFullYear(), 0, 1),
                                setter: this.setDate,
                                build: function (date, idx) {
                                    return {
                                        //增加民國年判斷
                                        value: isTwYear ? StringFormatObject.DateTime.GetTWYear(date.getFullYear()) : date.getFullYear(),
                                        ns: kendo.ns,
                                        dateString: toDateString(date),
                                        cssClass: idx === 0 || idx == 11 ? OTHERMONTHCLASS : ""
                                    };
                                }
                            });
                        },
                        first: function (date) {
                            var year = date.getFullYear();
                            return new DATE(year - year % 10, date.getMonth(), date.getDate());
                        },
                        last: function (date) {
                            var year = date.getFullYear();
                            return new DATE(year - year % 10 + 9, date.getMonth(), date.getDate());
                        },
                        compare: function (date1, date2) {
                            return compare(date1, date2, 10);
                        },
                        setDate: function (date, value) {
                            setDate(date, value, 1);
                        },
                        toDateString: function (date) {
                            return date.getFullYear() + "/0/1";
                        }
                    },
                    {
                        name: CENTURY,
                        title: function (date, min, max) {
                            //增加民國年判斷
                            return calendarTitle_chkIsTwYear(date, min, max, 100, isTwYear);
                        },
                        content: function (options) {
                            var year = options.date.getFullYear(),
                            min = options.min.getFullYear(),
                            max = options.max.getFullYear(),
                            toDateString = this.toDateString,
                            minYear = min,
                            maxYear = max;

                            minYear = minYear - minYear % 10;
                            maxYear = maxYear - maxYear % 10;

                            if (maxYear - minYear < 10) {
                                maxYear = minYear + 9;
                            }

                            return view({
                                start: new DATE(year - year % 100 - 10, 0, 1),
                                min: new DATE(minYear, 0, 1),
                                max: new DATE(maxYear, 0, 1),
                                setter: this.setDate,
                                build: function (date, idx) {
                                    var start = date.getFullYear(),
                                        end = start + 9;

                                    if (start < min) {
                                        start = min;
                                    }

                                    if (end > max) {
                                        end = max;
                                    }

                                    //增加民國年判斷
                                    start = isTwYear ? StringFormatObject.DateTime.GetTWYear(start) : start;
                                    end = isTwYear ? StringFormatObject.DateTime.GetTWYear(end) : end;

                                    return {
                                        ns: kendo.ns,
                                        value: (start < 0 ? "(" + start + ")" : start)
                                                + " - "
                                                + (end < 0 ? "(" + end + ")" : end),
                                        dateString: toDateString(date),
                                        cssClass: idx === 0 || idx == 11 ? OTHERMONTHCLASS : ""
                                    };
                                }
                            });
                        },
                        first: function (date) {
                            var year = date.getFullYear();
                            return new DATE(year - year % 100, date.getMonth(), date.getDate());
                        },
                        last: function (date) {
                            var year = date.getFullYear();
                            return new DATE(year - year % 100 + 99, date.getMonth(), date.getDate());
                        },
                        compare: function (date1, date2) {
                            return compare(date1, date2, 100);
                        },
                        setDate: function (date, value) {
                            setDate(date, value, 10);
                        },
                        toDateString: function (date) {
                            var year = date.getFullYear();
                            return (year - year % 10) + "/0/1";
                        }
                    }
                ];
            }

            //Step2: 產生小日曆
            that.calendar.setOptions({
                focusOnNav: false,
                change: options.change,
                culture: options.culture,
                dates: options.dates,
                depth: options.depth,
                footer: options.footer,
                format: options.format,
                max: options.max,
                min: options.min,
                month: options.month,
                start: options.start
            });

            //Step3: 依據是否為民國年修改kendoCalendar的Footer字樣
            if (isTwYear) {
                calendarFooter_chkIsTwYear(that.calendar, isTwYear);
            }

        },

        //當日期資料有任何異動時, 會觸發的事件
        _update: function (value) {

            //覆寫原生kendoDatePicker原生地function

            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                current = that._value,
                date = kendo.parseDate(value, options.parseFormats, options.culture),
                isSameType = (date === null && current === null) || (date instanceof Date && current instanceof Date),
                formattedValue;

            if (+date === +current && isSameType) {
                formattedValue = toDateLocalString_chkIsTwYear(date, options.format, options.culture, options.is_tw_year);

                if (formattedValue !== value) {
                    that.element.val(date === null ? value : formattedValue);
                }

                return date;
            }

            if (date !== null && isEqualDatePart(date, min)) {
                date = restrictValue(date, min, max);
            } else if (!isInRange(date, min, max)) {
                date = null;
            }

            that._value = date;
            that.dateView.value(date);
            that.element.val(date ? toDateLocalString_chkIsTwYear(date, options.format, options.culture, options.is_tw_year) : value);
            that._updateARIA(date);

            return date;

        },

        // the templates for each of the UI elements that comprise the widget
        _templates: {
            quickButton: "<span />"
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssDatePicker);

    //===================================== Private Method For Calendar =====================================

    //將datetime轉成yyyyMMdd
    //參數mode: 判斷現在是 年月日(month) 還是 年月(year)
    function changeDateToyyyyMMdd(date, mode) {

        var yyyy = 0
            , MM = 0
            , dd = 0
            , finalDate = "";

        if ($.type(date) === "date") {

            yyyy = date.getFullYear();
            MM = date.getMonth() + 1;
            dd = date.getDate();

            finalDate = yyyy.toString()
                    + MM.toString().padLeft(2, "0");

            if (mode == "month") {
                finalDate += dd.toString().padLeft(2, "0");
            }

        }

        return finalDate;

    }

    function getCalendarInfo(culture) {
        return getCulture(culture).calendars.standard;
    }

    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    //產生小日曆
    function view(options) {
        var idx = 0,
            data,
            min = options.min,
            max = options.max,
            start = options.start,
            setter = options.setter,
            build = options.build,
            length = options.cells || 12,
            cellsPerRow = options.perRow || 4,
            content = options.content || cellTemplate,
            empty = options.empty || emptyCellTemplate,
            html = options.html || '<table tabindex="0" role="grid" class="k-content k-meta-view" cellspacing="0"><tbody><tr role="row">';

        for (; idx < length; idx++) {
            if (idx > 0 && idx % cellsPerRow === 0) {
                html += '</tr><tr role="row">';
            }

            data = build(start, idx);

            html += isInRange(start, min, max) ? content(data) : empty(data);

            setter(start, 1);
        }

        return html + "</tr></tbody></table>";
    }

    //小日曆Header文字
    function calendarTitle_chkIsTwYear(date, min, max, modular, isTwYear) {
        var start = date.getFullYear(),
            minYear = min.getFullYear(),
            maxYear = max.getFullYear(),
            end;

        start = start - start % modular;
        end = start + (modular - 1);

        if (start < minYear) {
            start = minYear;
        }
        if (end > maxYear) {
            end = maxYear;
        }

        start = isTwYear ? StringFormatObject.DateTime.GetTWYear(start) : start;
        end = isTwYear ? StringFormatObject.DateTime.GetTWYear(end) : end;

        return (start < 0 ? "(" + start + ")" : start) + " - " + (end < 0 ? "(" + end + ")" : end);
    }

    //小日曆Footer文字
    function calendarFooter_chkIsTwYear(calendarThis, isTwYear) {

        var that = calendarThis,
            today = getToday(),
            element = that.element,
            footer = element.find(".k-footer"),
            footDate = toDateLocalString_chkIsTwYear(today, "D", that.options.culture, isTwYear);

        that._today = footer.show()
                            .find(".k-link")
                            .html(footDate)
                            .attr("title", footDate);

        that._toggle();

    }

    function getToday() {
        var today = new DATE();
        return new DATE(today.getFullYear(), today.getMonth(), today.getDate());
    }

    //將日期轉成定義的字串
    function toDateLocalString_chkIsTwYear(value, fmt, culture, isTwYear) {

        var that = this,
            objectToString = {}.toString;

        if (fmt) {
            if (objectToString.call(value) === "[object Date]") {
                return formatDate_chkIsTwYear(value, fmt, culture, isTwYear);
            }
        }

        return value !== undefined ? value : "";
    }

    //將日期格式化
    function formatDate_chkIsTwYear(date, format, culture, isTwYear) {
        culture = getCulture(culture);

        var that = this,
            dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,
            calendar = culture.calendars.standard,
            days = calendar.days,
            months = calendar.months;

        format = calendar.patterns[format] || format;

        return format.replace(dateFormatRegExp, function (match) {
            var result;

            if (match === "d") {
                result = date.getDate();
            } else if (match === "dd") {
                result = pad(date.getDate());
            } else if (match === "ddd") {
                result = days.namesAbbr[date.getDay()];
            } else if (match === "dddd") {
                result = days.names[date.getDay()];
            } else if (match === "M") {
                result = date.getMonth() + 1;
            } else if (match === "MM") {
                result = pad(date.getMonth() + 1);
            } else if (match === "MMM") {
                result = months.namesAbbr[date.getMonth()];
            } else if (match === "MMMM") {
                result = months.names[date.getMonth()];
            } else if (match === "yy") {
                result = pad(date.getFullYear() % 100);
            } else if (match === "yyyy") {

                result = pad(date.getFullYear(), 4);

                //增加民國年判斷
                match = isTwYear ? "yyy" : match;
                result = isTwYear ? StringFormatObject.DateTime.GetTWYear(result) : result;

            } else if (match === "h") {
                result = date.getHours() % 12 || 12;
            } else if (match === "hh") {
                result = pad(date.getHours() % 12 || 12);
            } else if (match === "H") {
                result = date.getHours();
            } else if (match === "HH") {
                result = pad(date.getHours());
            } else if (match === "m") {
                result = date.getMinutes();
            } else if (match === "mm") {
                result = pad(date.getMinutes());
            } else if (match === "s") {
                result = date.getSeconds();
            } else if (match === "ss") {
                result = pad(date.getSeconds());
            } else if (match === "f") {
                result = math.floor(date.getMilliseconds() / 100);
            } else if (match === "ff") {
                result = date.getMilliseconds();
                if (result > 99) {
                    result = math.floor(result / 10);
                }

                result = pad(result);
            } else if (match === "fff") {
                result = pad(date.getMilliseconds(), 3);
            } else if (match === "tt") {
                result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0];
            }

            return result !== undefined ? result : match.slice(1, match.length - 1);
        });
    }

    //補滿足夠長度的0
    function pad(number, digits, end) {

        var zeros = ["", "0", "00", "000", "0000"];

        number = number + "";
        digits = digits || 2;
        end = digits - number.length;

        if (end) {
            return zeros[digits].substring(0, end) + number;
        }

        return number;
    }

    //比對日期
    function compare(date1, date2, modifier) {
        var year1 = date1.getFullYear(),
            start = date2.getFullYear(),
            end = start,
            result = 0;

        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }

        if (year1 > end) {
            result = 1;
        } else if (year1 < start) {
            result = -1;
        }

        return result;
    }

    //設定日期
    function setDate(date, value, multiplier) {
        value = value instanceof DATE ? value.getFullYear() : date.getFullYear() + multiplier * value;
        date.setFullYear(value);
    }

    //===================================== Private Method For Calendar =====================================

})(jQuery);