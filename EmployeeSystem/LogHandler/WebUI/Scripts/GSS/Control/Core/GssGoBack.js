//功能: GoBack圖示
//描述: 點選後回上一頁
//歷程: 1. 2014/07/11   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
       , ui = kendo.ui
       , Widget = ui.Widget
       , ns = ".BestGoBack";

    /**
     * @classdesc 當scrollbar往下滾動時會出現GoBack圖示, 點選後返回上一頁
     * @class BestGoBack
     */
    var GssGoBack = Widget.extend({

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
             * @default BestGoBack
             * @MemberOf BestGoBack
             */
            name: "BestGoBack",

            /**
             * @property {string} cotent Widget的內容
             * @default "< Back"
             * @MemberOf BestGoBack
             */
            content: ControlDefaultsObject.GoBack.content || "< Back",

            /**
             * @property {string} position_setting Widget的顯示位置
             * @default "left center"
             * @MemberOf BestGoBack
             * @desc 可以設定為"left", "right", "right bottom", "center top", "center-10 top-25%"等<br/>
                     請參考: http://api.jqueryui.com/position/
             */
            position_setting: ControlDefaultsObject.GoBack.position_setting || "left center"

        },

        /**
         * @desc 設定控制項的影藏
         * @memberof BestGoBack
         * @method BfadeOut
         * @example
         * 設定options: element.BfadeOut();
         */
        BfadeOut: function () {

            var that = this;
            that.GoBack.fadeOut("fast");

        },

        _create: function () {

            // cache a reference to this
            var that = this
                , parentObj = that.element.parent()
                , goBackTemplate = kendo.template(that._templates.button);

            // set the initial toggled state
            that.toggle = true;

            //Step1: 產生GoBack按鈕
            that.GoBack = $(goBackTemplate(that.options));

            //返回圖示動作
            that.GoBack.click(function () {

                var that = this
                    , objNowPage = $("#" + BaseObject.PageNM + BaseObject.NowLevel)
                    , backLevel = BaseObject.NowLevel - 1;

                //判斷頁面是否有變更過資料,若有資料未存檔,則回傳false
                if (SharedMethodObject.Page.ChkIsEscapteConfirm()) {

                    //清除並隱藏目前的畫面
                    objNowPage.empty();
                    objNowPage.hide();

                    //開啟返回的畫面
                    BaseObject.PreLevel = BaseObject.NowLevel;
                    BaseObject.NowLevel = backLevel;
                    $("#" + BaseObject.PageNM + backLevel).show();

                    //刪除多餘的頁面
                    $.each($("[id*=" + BaseObject.PageNM + "]"), function (index, item) {

                        if (index > BaseObject.NowLevel - 1 && index != BaseObject.NowLevel - 1) {
                            $(item).remove();
                        }

                    });

                }

            });

            that.GoBack.mouseover(function () {

                // filter: for ie
                // -moz-opacity: for Moz + FF
                // opacity: for CSS3的標準語法，FOR支援CSS3的瀏覽器（FF 1.5）
                that.GoBack.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "1").css("opacity", "1");

            });

            that.GoBack.mouseleave(function () {

                that.GoBack.css("filter", "alpha(Opacity=50, Style=0)").css("-moz-opacity", "0.5").css("opacity", "0.5");

            });

            parentObj.append(that.GoBack);

            //Step2: 將div註冊scroll bar事件
            parentObj.on("scroll" + ns, $.proxy(that._scroll, that));

        },

        _scroll: function () {

            var that = this
                , parentObj = that.element.parent();

            if (parentObj.scrollTop() > 150) {

                //目前層級大於1, 才表示有上一頁可以返回
                if (BaseObject.NowLevel > 1) {

                    that.GoBack.fadeIn("fast").position({
                        my: that.options.position_setting,
                        at: that.options.position_setting,
                        of: parentObj
                    });

                    //For FireFox
                    if (!!window.sidebar) {
                        if (that.options.position_setting.indexOf("bottom") != -1) {
                            var topPosition = $(window).height() - 45;
                            that.GoBack.css("top", topPosition);
                        }
                    }

                }

            }
            else {
                that.GoBack.fadeOut("fast");
            }

        },

        _templates: {
            button: '<div class="iconGoBack">#: content #</div>'
        }

    });

    ui.plugin(GssGoBack);

})(jQuery);