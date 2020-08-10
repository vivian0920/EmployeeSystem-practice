//功能: 頁籤功能
//描述: 頁籤功能
//歷程: 1. 2014/12/29   1.00   Ben_Tsai   Create

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    /**
     * @classdesc 頁籤功能
     * @class BestTabStrip
     */
    var GssTabStrip = Widget.extend({

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
            Widget.fn.init.call(this, element, options);

            that._create();

        },

        options: {

            /**
             * @property {string} name 物件名稱
             * @default BestTabStrip
             * @MemberOf BestTabStrip
             */
            name: "BestTabStrip",

            /**
             * @property {string} dataTextField dataSource的text欄位
             * @default 空字串
             * @MemberOf BestTabStrip
             */
            dataTextField: "",

            /**
             * @property {string} dataContentUrlField dataSource的contentUrl欄位
             * @default 空字串
             * @MemberOf BestTabStrip
             */
            dataContentUrlField: "",

            /**
             * @property {array} dataSource 資料來源
             * @default BestTabStrip
             * @MemberOf BestTabStrip
             */
            dataSource: null,

            /**
             * @property {int} content_height Content的高度
             * @default 0
             * @MemberOf BestTabStrip
             * @desc 若有設定值, 則會固定顯示的高度
             */
            content_height: ControlDefaultsObject.TabStrip.content_height || 0

        },

        /**
        * @desc 選取處理
        * @MemberOf BestTabStrip
        * @method Bselect
        * @param {object} selectParam jQuery selector 或 index 或 object
        * @example
        * 選取:element.BestTabStrip().Bselect(0);
        *      element.BestTabStrip().Bselect($("li:last"));
        *      element.BestTabStrip().Bselect(li:last);
        */
        Bselect: function (selectParam) {
            
            var that = this
                , objTabStrip = that.element.data("kendoTabStrip");

            objTabStrip.select(selectParam);

        },

        _create: function () {

            // cache a reference to this
            var that = this;

            // set the initial toggled state
            that.toggle = true;

            that.element.kendoTabStrip({
                animation: { open: { effects: "fadeIn" } },
                dataTextField: that.options.dataTextField,
                dataContentUrlField: that.options.dataContentUrlField,
                dataSource: that.options.dataSource
            });

            //若有設定Content高度則固定顯示高度
            if (that.options.content_height > 0) {
                that.element.find(".k-content").height(that.options.content_height).css("overflow", "auto");
            }

        }

    });

    ui.plugin(GssTabStrip);

})(jQuery);