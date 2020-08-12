/// <reference path="../../../jQuery/jquery-1.11.1.min.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: 擴充KendoMenu功能 - 區域收合PanelBar
//描述: 區域收合
//歷程: 1. 2014/11/28   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , ns = ".BestPanelBar"
        , KendoPanelBar = ui.PanelBar
        , VISIBLE = ":visible"
        , EXPAND = "expand"
        , COLLAPSE = "collapse"
        , SINGLE = "single"
        , SELECT = "select"
        , CONTENT = "k-content"
        , DISABLEDCLASS = "k-state-disabled"
        , LINK = "k-link"
        , LINKSELECTOR = "." + LINK
        , ITEM = ".k-item"
        , HREF = "href"
        , GROUPS = "> .k-panel"
        , CONTENTS = "> .k-content"
        , initDivTop = 0;

    /**
     * @classdesc 擴充KendoMenu功能 - 區域收合PanelBar
     * @class BestPanelBar
     */
    var GssPanelBar = KendoPanelBar.extend({

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
            KendoPanelBar.fn.init.call(this, element, options);

            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestPanelBar
             * @MemberOf BestPanelBar
             */
            name: "BestPanelBar",

            /**
             * @property {Array} contentUrls 內容的URL
             * @default 空陣列
             * @MemberOf BestPanelBar
             */
            contentUrls: [],

            /**
             * @property {object} dataSource Widget的dataSource
             * @default null
             * @MemberOf BestPanelBar
             * @desc 包含欄位: text(Bar的名稱), cssClass(套用的CSS), url(點擊後的link), encoded(text是否編碼), content(內容), contentUrl(內容的URL), imageUrl(Bar的圖示路徑), items(子項目)
             */
            dataSource: null,

            /**
             * @property {string} expandMode Widget的開合模式
             * @default multiple
             * @MemberOf BestPanelBar
             * @desc multiple: 可以開啟多個<br>
                     single: 一次只能開啟一個           
             */
            expandMode: ControlDefaultsObject.PanelBar.expandMode || "multiple",

            /**
             * @property {boolean} isDefinedCollapse 是否自行定義收合方式
             * @default false
             * @MemberOf BestPanelBar         
             */
            isDefinedCollapse: ControlDefaultsObject.PanelBar.isDefinedCollapse || false,

            /**
             * @property {int} collapseHeightRate 收合比例
             * @default 0.5
             * @MemberOf BestPanelBar
             * @desc 比例設定, 如: 0.5, 0.2等等          
             */
            collapseHeightRate: ControlDefaultsObject.PanelBar.collapseHeightRate || 0.5,

            /**
             * @property {bool} isContentScroller content是否含有滑動方式呈現
             * @default false
             * @MemberOf BestPanelBar
             */
            isContentScroller: ControlDefaultsObject.PanelBar.isContentScroller || false,

            /**
             * @property {bool} isFixdTop content是否固定在上方
             * @default false
             * @MemberOf BestPanelBar
             */
            isFixdTop: ControlDefaultsObject.PanelBar.isFixdTop || false

        },

        _create: function () {

            // cache a reference to this
            var that = this
                , parentObj = that.element.closest("div[id*=Center]");

            // set the initial toggled state
            that.toggle = true;

            if (that.options.isFixdTop) {

                //將div註冊scroll bar事件
                parentObj.on("scroll" + ns, $.proxy(that._scrollFixdTop, that, parentObj));

                //暫存初始高度, 之後給固定FixedTop時使用
                initDivTop = parentObj.offset().top;

            }

        },

        _scrollFixdTop: function (parentObj) {

            var that = this
                , nowWidth = that.element.outerWidth();

            if (parentObj.scrollTop() > 10) {
                that.element.parent().addClass("DivFixedTop").width(nowWidth).css("top", initDivTop);
            }
            else {
                that.element.parent().removeClass("DivFixedTop").removeAttr("style");
            }

        },

        _click: function (target) {

            var that = this,
                element = that.element,
                prevent, contents, href, isAnchor;

            if (target.parents("li." + DISABLEDCLASS).length) {
                return;
            }

            if (target.closest(".k-widget")[0] != element[0]) {
                return;
            }

            var link = target.closest(LINKSELECTOR),
                item = link.closest(ITEM);

            that._updateSelected(link);

            contents = item.find(GROUPS).add(item.find(CONTENTS));
            href = link.attr(HREF);
            isAnchor = href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1);
            prevent = !!(isAnchor || contents.length);

            if (contents.data("animating")) {
                return prevent;
            }

            if (that._triggerEvent(SELECT, item)) {
                prevent = true;
            }

            if (prevent === false) {
                return;
            }

            if (that.options.expandMode == SINGLE) {
                if (that._collapseAllExpanded(item)) {
                    return prevent;
                }
            }

            if (contents.length) {
                var visibility = contents.is(VISIBLE);

                //判斷是否依據使用者定義的收合比例來收合
                if (that.options.isDefinedCollapse) {
                    that._customeCollapse(visibility, item);
                }
                else {
                    if (!that._triggerEvent(!visibility ? EXPAND : COLLAPSE, item)) {
                        prevent = that._toggleItem(item, visibility);
                    }
                }

            }

            return prevent;
        },

        //依據收合比例調整收合方式
        _customeCollapse: function (visibility, item) {

            var that = this
                , contentHeight = 0
                , objNowLi = that.element.find(".k-state-highlight")
                , objNowContent = objNowLi.find(".k-content")
                , objNowIcon = objNowLi.find(".k-icon")
                , realStatusClass = "realStatus"
                , realContentStarus = objNowLi.attr(realStatusClass) || "S";

            //需針對目前content是否隱藏來修改目前的值
            visibility = realContentStarus == "H" ? !visibility : visibility;

            if (visibility) {

                //取得原本的content高度, 並且乘上使用者設定的比例
                contentHeight = objNowContent.height() * that.options.collapseHeightRate;

                objNowLi.attr(realStatusClass, "H");    //H: 隱藏
                objNowContent.height(contentHeight);
                objNowContent.css("overflow", "hidden");
                objNowContent.css("display", "block");
                objNowIcon.removeClass("k-i-arrow-n").addClass("k-i-arrow-s");

                if (that.options.isContentScroller) {

                    var objScrollerBtn = objNowContent.find(".mTSButton:visible")
                        , objAllBtn = objNowContent.find(".mTSButton");

                    //調整scroller兩邊箭頭按鈕的CSS
                    if (objScrollerBtn.length > 0) {

                        var btnPadding = parseInt(objScrollerBtn.eq(0).css("padding").replace("px", ""), 10) * that.options.collapseHeightRate
                            , btnTop = objScrollerBtn.eq(0).position().top * that.options.collapseHeightRate;

                        objAllBtn.css("padding", btnPadding);
                        objAllBtn.css("top", btnTop);
                    }

                }

            }
            else {

                if (!that._triggerEvent(!visibility ? EXPAND : COLLAPSE, item)) {
                    prevent = that._toggleItem(item, visibility);
                }

                objNowLi.attr(realStatusClass, "S");    //S: 顯示
                objNowContent.height("auto");
                objNowContent.css("overflow", "visiable");
                objNowContent.css("display", "block");
                objNowIcon.removeClass("k-i-arrow-s").addClass("k-i-arrow-n");

                if (that.options.isContentScroller) {

                    var objScrollerBtn = objNowContent.find(".mTSButton:visible")
                        , objAllBtn = objNowContent.find(".mTSButton");

                    //調整scroller兩邊箭頭按鈕的CSS
                    if (objScrollerBtn.length > 0) {

                        var btnPadding = parseInt(objScrollerBtn.eq(0).css("padding").replace("px", ""), 10) / that.options.collapseHeightRate
                            , btnTop = objScrollerBtn.eq(0).position().top / that.options.collapseHeightRate;

                        objAllBtn.css("padding", btnPadding);
                        objAllBtn.css("top", btnTop);

                    }

                }

            }

        }

    });

    ui.plugin(GssPanelBar);

})(jQuery);