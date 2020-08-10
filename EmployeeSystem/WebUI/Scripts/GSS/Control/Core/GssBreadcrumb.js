/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />

//功能: 麵包屑Breadcrumb
//描述: 功能列
//歷程: 1. 2014/05/27   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
         , ui = kendo.ui
         , Widget = ui.Widget;

    /**
     * @classdesc 麵包屑Breadcrumb
     * @class BestBreadcrumb
     */
    var GssBreadcrumb = Widget.extend({

        init: function (element, options) {

            // cache a reference to this
            var that = this;

            // make the base call to initialize this widget
            Widget.fn.init.call(this, element, options);

            that._create();

        },

        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestBreadcrumb
             * @MemberOf BestBreadcrumb
             */
            name: "BestBreadcrumb",

            /**
             * @property {string} itemText 麵包屑顯示字樣
             * @default ""
             * @MemberOf BestBreadcrumb
             * @desc 麵包屑顯示字樣
             */
            itemText: "",

            /**
             * @property {int} nowLevel 產生麵包屑的頁面層級
             * @default 0
             * @MemberOf BestBreadcrumb
             * @desc 產生麵包屑的頁面層級
             */
            nowLevel: 0,

            /**
             * @property {bool} allow_favorite 是否開啟我的最愛按鈕
             * @default false
             * @MemberOf BestBreadcrumb
             * @desc 是否開啟我的最愛按鈕
             */
            allow_favorite: ControlDefaultsObject.Breadcrumb.allow_favorite || false

        },

        GetCurrentPath: function () {

            var that = this
                , currentPath = "";

            that.div.find("a").each(function () {
                currentPath += $(this).text() + "/";
            });

            return currentPath.substr(0, currentPath.length - 1);

        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this
                 , template;

            // set the initial toggled state
            that.toggle = true;

            //取得目前頁面層級
            that.options.nowLevel = BaseObject.NowLevel;

            //Step1: 麵包屑(功能列)
            template = kendo.template(that._templates.div);
            that.div = $(template(that.options));
            that.div.addClass("pull-left BreadcrumbList").width("95%");
            that.div.append("<ul></ul>");

            that.element.height("36px").append(that.div);

            template = kendo.template(that._templates.functionList);
            that.functionList = $(template(that.options));

            if (that.options.nowLevel > 1) {

                var preLevel = that.options.nowLevel - 1
                     , preBreadcrumbObject = $("#" + BaseObject.PageNM + preLevel).find(".BreadcrumbList").find("ul")
                     , preHtml = "";

                //繼承前一個template的麵包屑
                preHtml = preBreadcrumbObject.html();

                //加上前面的麵包屑項目
                that.div.children().append(preHtml);

                //將前面的麵包屑註冊click事件
                that.div.children().find("li").click(function () {

                    var liThis = $(this);

                    that._functionListClick(liThis);

                });

            }

            //加上目前的麵包屑項目
            that.div.children().append(that.functionList);

            if (that.options.allow_favorite) {

                //Step2: 產生加入我的最愛按鈕
                template = kendo.template(that._templates.div);
                that.div = $(template(that.options));
                that.div.addClass("pull-right text-center").width("5%");

                that.element.append(that.div);

                template = kendo.template(that._templates.favoriteButton);
                that.favoriteButton = $(template(that.options));

                that.div.append(that.favoriteButton);

                // setup the button click event. wrap it in a closure so that
                // "this" will be equal to the widget and not the HTML element that
                // the click function passes.
                that.favoriteButton.click(function (e) {

                    var btnThis = $(this);

                    that._favoriteClick(btnThis);

                });

            }

        },

        _functionListClick: function (liThis) {

            var that = this
                , level = liThis.find("a").attr("funcLevel")
                , objNowPage = $("#" + BaseObject.PageNM + that.options.nowLevel);

            //判斷頁面是否有變更過資料,若有資料未存檔,則回傳false
            if (SharedMethodObject.Page.ChkIsEscapteConfirm()) {

                //清除並隱藏目前的畫面
                objNowPage.empty();
                objNowPage.hide();

                //開啟返回的畫面
                BaseObject.PreLevel = that.options.nowLevel;
                BaseObject.NowLevel = level;
                $("#" + BaseObject.PageNM + level).show();

                //刪除多餘的頁面
                $.each($("[id*=" + BaseObject.PageNM + "]"), function (index, item) {

                    if (index > BaseObject.NowLevel - 1 && index != BaseObject.NowLevel - 1) {
                        $(item).remove();
                    }

                });

            }
        },

        _favoriteClick: function (btnThis) {

            //TODO: 未完成 需要進DB取得程式對應路徑

            var that = this
                 , nowBreadcrumbObject = btnThis.parent().parent().find(".BreadcrumbList").find("li:last")
                 , addItemText = nowBreadcrumbObject.text()
                 , addFlag = true;

            //TODO: 先檢查是否已經存在, 先判斷是否存在資料中
            $("#DR001_MyFavorite").find(".k-item>.k-header").each(function () {

                if ($(this).text() == addItemText) {
                    addFlag = false;
                    return false;
                }

            });

            if (addFlag) {

                //TODO: ajax回DB寫入資料庫, 成功後才執行下面的畫面上的新增

                var panelDataSource = $("#DR001_MyFavorite").data("kendoPanelBar");

                panelDataSource.append({ text: addItemText });

                $("#DR001_MyFavorite").find(".k-item>.k-header:last").each(function () {

                    //加上導頁功能
                    $(this).click(function () {
                        //alert(addItemValue);

                        $("#DR001_MyFavorite").find(".k-item>.k-header").removeClass("k-state-selected");
                        $(this).addClass("k-state-selected");

                        return false;
                    })

                    //加上刪除功能
                    $(this).append("<span title='刪除' class=\"k-icon k-i-close k-panelbar-collapse\"/>");

                    $(this).children(".k-i-close").click(function () {

                        //TODO: ajax回DB刪除資料庫資料

                        panelDataSource.remove($(this).parent());

                        return false;
                    });

                });

            }

        },

        // the templates for each of the UI elements that comprise the widget
        _templates: {
            div: "<div></div>",
            functionList: "<li><a href='\\#' funcLevel='#: nowLevel #'>#: itemText #</a></li>",
            favoriteButton: "<a class='btn centerAlign btn-primary btn-s' title='加入我的最愛'><i class='icon-heart icon-white'></i></a>"
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssBreadcrumb);

})(jQuery);