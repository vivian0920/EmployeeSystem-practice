/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 擴充KendoDatePicker功能 - 年月MonthYearPicker
//描述: 年月輸入
//歷程: 1. 2014/05/20   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , BestDatePicker = ui.BestDatePicker;

    /**
     * @classdesc 繼承BestDatePicker
     * @class BestMonthYearPicker
     */
    var GssMonthYearPicker = BestDatePicker.extend({

        init: function (element, options) {

            // cache a reference to this
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            BestDatePicker.fn.init.call(this, element, options);

        },

        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestMonthYearPicker
             * @MemberOf BestMonthYearPicker
             */
            name: "BestMonthYearPicker",

            /**
             * @property {bool} is_tw_year 是否顯示民國年
             * @default false
             * @MemberOf BestMonthYearPicker
             */
            is_tw_year: ControlDefaultsObject.MonthYearPicker.is_tw_year || false,

            /**
             * @property {string} date_delimiter 日期間的分隔符號
             * @default /
             * @MemberOf BestMonthYearPicker
             */
            date_delimiter: ControlDefaultsObject.MonthYearPicker.date_delimiter || "/",

            /**
             * @property {bool} allow_shortcut 是否顯示快速查詢按鈕
             * @default false
             * @MemberOf BestMonthYearPicker             
             */
            allow_shortcut: ControlDefaultsObject.MonthYearPicker.allow_shortcut || false,

            /**
             * @property {arraylist} shortcut_data_source 快速查詢的datasource
             * @default []
             * @MemberOf BestMonthYearPicker
             * @desc 可自行設定快速查詢的資料來源, 若沒有設定則由widget依據目前時間去產生
             */
            shortcut_data_source: ControlDefaultsObject.MonthYearPicker.shortcut_data_source || [],

            /**
             * @property {string} suffix 控制項的後置文字
             * @default ""
             * @MemberOf BestMonthYearPicker
             */
            suffix: ControlDefaultsObject.MonthYearPicker.suffix || "",

            /**
             * @property {string} format 日期顯示的格式
             * @default yyyy/MM
             * @MemberOf BestMonthYearPicker
             */
            format: ControlDefaultsObject.MonthYearPicker.format || "yyyy/MM",

            /**
             * @property {date} min 日期可設定的最小值
             * @default Date(1900, 0, 1)
             * @MemberOf BestMonthYearPicker
             */
            min: ControlDefaultsObject.MonthYearPicker.min || new Date(1900, 0, 1),

            /**
             * @property {date} max 日期可設定的最大值
             * @default Date(2099, 11, 31)
             * @MemberOf BestMonthYearPicker
             */
            max: ControlDefaultsObject.MonthYearPicker.max || new Date(2099, 11, 31),

            start: "year",     //只能選擇年月
            depth: "year",      //選擇日期後對應的也只有年月

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestMonthYearPicker
             */
            is_escape_confirm: ControlDefaultsObject.TextBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestMonthYearPicker
             */
            is_change: ControlDefaultsObject.TextBox.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestMonthYearPicker
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestMonthYearPicker
             * @desc 供整頁唯讀或區域唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestMonthYearPicker
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default 年月
             * @MemberOf BestMonthYearPicker
             */
            error_message: "年月",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestMonthYearPicker
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestMonthYearPicker
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestMonthYearPicker
             * @desc 供整頁必填或區域必填使用
             */
            required_status: false

        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssMonthYearPicker);

})(jQuery);