/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: GoTop圖示
//描述: 點選後跳至頂端
//歷程: 1. 2014/07/11   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget
        , ns = ".BestGoTop";

    /**
     * @classdesc 當scrollbar往下滾動時會出現top圖示, 點選後跳至頂端
     * @class BestGoTop
     */
    var GssGoTop = Widget.extend({

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
             * @property {string} name Widget的namespace
             * @default BestGoTop
             * @MemberOf BestGoTop
             */
            name: "BestGoTop",

            /**
             * @property {string} cotent Widget的內容
             * @default "^ Top"
             * @MemberOf BestGoTop
             */
            content: ControlDefaultsObject.GoTop.content || "^ Top",

            /**
             * @property {string} position_setting Widget的顯示位置
             * @default "left center"
             * @MemberOf BestGoTop
             * @desc 可以設定為"left", "right", "right bottom", "center top", "center-10 top-25%"等<br/>
                     請參考: http://api.jqueryui.com/position/
             */
            position_setting: ControlDefaultsObject.GoTop.position_setting || "right-10 bottom"


        },

        /**
         * @desc 設定控制項的影藏
         * @memberof BestGoTop
         * @method BfadeOut
         * @example
         * 設定options: element.BfadeOut();
         */
        BfadeOut: function () {

            var that = this;
            that.GoTop.fadeOut("fast");

        },

        _create: function () {

            // cache a reference to this
            var that = this
                , parentObj = that.element.parent()
                , goTopTemplate = kendo.template(that._templates.button);

            // set the initial toggled state
            that.toggle = true;

            //Step1: 產生GoTop按鈕
            that.GoTop = $(goTopTemplate(that.options));

            //置頂圖示動作
            that.GoTop.click(function () {

                parentObj.animate({
                    scrollTop: 0
                }, 100);

                that.GoTop.css("filter", "alpha(Opacity=50, Style=0)").css("-moz-opacity", "0.5").css("opacity", "0.5");

            });

            that.GoTop.mouseover(function () {

                // filter: for ie
                // -moz-opacity: for Moz + FF
                // opacity: for CSS3的標準語法，FOR支援CSS3的瀏覽器（FF 1.5）
                that.GoTop.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "1").css("opacity", "1");

            });

            that.GoTop.mouseleave(function () {

                that.GoTop.css("filter", "alpha(Opacity=50, Style=0)").css("-moz-opacity", "0.5").css("opacity", "0.5");

            });

            parentObj.append(that.GoTop);

            //Step2: 將div註冊scroll bar事件
            parentObj.on("scroll" + ns, $.proxy(that._scroll, that));

        },

        _scroll: function () {

            var that = this
                , parentObj = that.element.parent();

            if (parentObj.scrollTop() > 150) {

                that.GoTop.fadeIn("fast").position({
                    my: that.options.position_setting,
                    at: that.options.position_setting,
                    of: parentObj
                });

                //For FireFox
                if (!!window.sidebar) {
                    if (that.options.position_setting.indexOf("bottom") != -1) {
                        var topPosition = $(window).height() - 45;
                        that.GoTop.css("top", topPosition);
                    }
                }

            }
            else {
                that.GoTop.fadeOut("fast");
            }

        },

        _templates: {
            button: '<div class="iconGoTop">#: content #</div>'
        }

    });

    ui.plugin(GssGoTop);

})(jQuery);