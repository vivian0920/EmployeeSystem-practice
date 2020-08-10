/// <reference path="../../../jQuery/jquery-1.11.1.min.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 擴充KendoTooltip功能 - 訊息提示Tooltip
//描述: 訊息提示
//歷程: 1. 2014/12/2   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , KendoTooltip = ui.Tooltip;

    /**
     * @classdesc 擴充KendoTooltip功能 - 訊息提示Tooltip
     * @class BestTooltip
     */
    var GssTooltip = KendoTooltip.extend({

        init: function (element, options) {

            var that = this
                , initOptions = {}
                , defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            KendoTooltip.fn.init.call(this, element, options);

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestTooltip
             * @MemberOf BestTooltip
             */
            name: "BestTooltip",

            /**
             * @property {string} position 提示訊息出現的位置
             * @default top
             * @MemberOf BestTooltip
             */
            position: ControlDefaultsObject.Tooltip.position || "top"

        }

    });

    ui.plugin(GssTooltip);

})(jQuery);