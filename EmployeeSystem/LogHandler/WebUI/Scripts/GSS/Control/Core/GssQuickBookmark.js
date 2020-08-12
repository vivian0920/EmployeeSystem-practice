//功能: QuickBookmark 書籤快速鍵功能
//描述: 點選書籤超連結後自動跳至該位置
//歷程: 1. 2015/01/06   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget
        , ns = ".BestQuickBookmark"
        , icnoOpenClass = "k-icon k-i-expand-w"
        , icnoCloseClass = "k-icon k-i-expand"
        , quickBookmarkContentClass = "b-quick-bookmark-content"
        , quickBookmarkItemClass = "b-quick-bookmark-item"
        , quickBookmarkContentHeaderClass = "b-quick-bookmark-content-header"
        , quickBookmarkContentBodyClass = "b-quick-bookmark-content-body";

    /**
     * @classdesc 當scrollbar往下滾動時會出現top圖示, 點選後跳至頂端
     * @class BestQuickBookmark
     */
    var GssQuickBookmark = Widget.extend({

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
             * @default BestQuickBookmark
             * @MemberOf BestQuickBookmark
             */
            name: "BestQuickBookmark",

            /**
             * @property {string} position_setting Widget的顯示位置
             * @default "right-center"
             * @MemberOf BestQuickBookmark
             * @desc 可以設定為"left", "right", "right bottom", "center top", "center-10 top-25%"等<br/>
                     請參考: http://api.jqueryui.com/position/
             */
            position_setting: ControlDefaultsObject.QuickBookmark.position_setting || "right-center",

            /**
             * @property {string} bookmark_css_name 加入書籤快速鍵的註記符號
             * @default b-quick-bookmark
             * @MemberOf BestQuickBookmark
             * @desc 例如: <div class="b-quick-bookmark">清單</div>
             */
            bookmark_css_name: ControlDefaultsObject.QuickBookmark.bookmark_css_name || "b-quick-bookmark",

            /**
             * @property {string} content_header_text 書籤快速鍵容器的顯示名稱
             * @default 書籤快速鍵
             * @MemberOf BestQuickBookmark
             */
            content_header_text: ControlDefaultsObject.QuickBookmark.content_header_text || "書籤快速鍵"

        },

        /**
         * @desc 設定控制項的影藏
         * @memberof BestQuickBookmark
         * @method BfadeOut
         * @example
         * 設定options: element.BfadeOut();
         */
        BfadeOut: function () {

            var that = this;
            that.QuickBookmark.fadeOut("fast");

        },

        _create: function () {

            // cache a reference to this
            var that = this
                , parentObj = that.element.parent()
                , quickBookmarkTemplate = kendo.template(that._templates.div)
                , cellTemplate = ""
                , objBookmark = that.element.find("." + that.options.bookmark_css_name);

            // set the initial toggled state
            that.toggle = true;

            if (objBookmark.length == 0) return false;

            //Step1: 產生QuickBookmark區塊
            that.QuickBookmark = $(quickBookmarkTemplate(that.options));
            that.QuickBookmark.header = that.QuickBookmark.find("." + quickBookmarkContentHeaderClass);
            that.QuickBookmark.body = that.QuickBookmark.find("." + quickBookmarkContentBodyClass);

            //產生書籤快速鍵
            objBookmark.each(function (index, item) {

                var objThis = $(this)
                    , newId = BaseObject.PageNM + BaseObject.NowLevel + "_" + that.options.name + "_" + index;

                //動態為目標產生id
                objThis.attr("id", newId);

                //產生書籤快速鍵
                cellTemplate = "<li><a href='#" + newId + "' class='" + quickBookmarkItemClass + "'>" + objThis.text() + "</a></li>";
                that.QuickBookmark.body.find("ul").append(cellTemplate);

            });

            that.QuickBookmark.mouseover(function () {

                // filter: for ie
                // -moz-opacity: for Moz + FF
                // opacity: for CSS3的標準語法，FOR支援CSS3的瀏覽器（FF 1.5）
                that.QuickBookmark.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "1").css("opacity", "1").css("z-index", "2");

            });

            that.QuickBookmark.mouseleave(function () {

                that.QuickBookmark.css("filter", "alpha(Opacity=50, Style=0)").css("-moz-opacity", "0.5").css("opacity", "0.5").css("z-index", "auto");

            });

            parentObj.append(that.QuickBookmark);

            //註冊點選header後 開啟/收合 動作
            that.QuickBookmark.header.click(function () {

                var nowLeft = that.QuickBookmark.position().left;

                if (that.QuickBookmark.body.is(":hidden")) {

                    that.QuickBookmark.header.find("span").removeClass(icnoOpenClass).addClass(icnoCloseClass);

                    if (that.QuickBookmark.body.height() > that.QuickBookmark.header.height()) {
                        that.QuickBookmark.header.height(that.QuickBookmark.body.height());
                    }
                    
                    that.QuickBookmark.body.show();
                    that.QuickBookmark.css("left", nowLeft - that.QuickBookmark.body.width() - 5);

                }
                else {

                    that.QuickBookmark.header.find("span").removeClass(icnoCloseClass).addClass(icnoOpenClass);
                    that.QuickBookmark.header.removeAttr("style");
                    that.QuickBookmark.body.hide();
                    that.QuickBookmark.css("left", nowLeft + that.QuickBookmark.body.width() + 5);

                }

            });

            //Step2: 將div註冊scroll bar事件
            parentObj.on("scroll" + ns, $.proxy(that._scroll, that));

        },

        _scroll: function () {

            var that = this
                , parentObj = that.element.parent();

            if (parentObj.scrollTop() > 150) {

                that.QuickBookmark.fadeIn("fast").position({
                    my: that.options.position_setting,
                    at: that.options.position_setting,
                    of: parentObj
                });

                //For FireFox
                if (!!window.sidebar) {
                    if (that.options.position_setting.indexOf("bottom") != -1) {
                        var topPosition = $(window).height() - 45;
                        that.QuickBookmark.css("top", topPosition);
                    }
                }

            }
            else {
                that.QuickBookmark.fadeOut("fast");
            }

        },

        _templates: {
            div: '<div class="' + quickBookmarkContentClass + '">'
                    + '<div class="' + quickBookmarkContentHeaderClass + '">#: content_header_text #<span class="' + icnoOpenClass + '"></span></div>'
                    + '<div class="' + quickBookmarkContentBodyClass + '"><ul></ul></div>'
                    + '</div>'
        }

    });

    ui.plugin(GssQuickBookmark);

})(jQuery);