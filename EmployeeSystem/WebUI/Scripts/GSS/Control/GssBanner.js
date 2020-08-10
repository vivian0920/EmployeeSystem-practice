/// <reference path="../Data/ControlDefaultsObject.js" />

/**
 * @class BestBanner
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget;

    var GSSBanner = widget.extend({

        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            widget.fn.init.call(that, element, options);

            //處理日期
            that._procDate();

            //Template
            that._procTemplate();
        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestBanner
             * @MemberOf BestBanner
             */
            name: "BestBanner",
            /**
             * @property {string} ap_name 系統名稱
             * @default 徵授信管理系統
             * @MemberOf BestBanner
             */
            ap_name: ControlDefaultsObject.Banner.ap_name || "徵授信管理系統",
            /**
             * @property {string} ap_name_url 系統網址
             * @default string.empty
             * @MemberOf BestBanner
             */
            ap_name_url: ControlDefaultsObject.Banner.ap_name_url || "",
            /**
             * @property {string} user_name_icon 登入者圖示
             * @default icon-user icon-white
             * @MemberOf BestBanner
             */
            user_name_icon: ControlDefaultsObject.Banner.user_name_icon || "icon-user icon-white",
            /**
             * @property {string} user_name_text 登入者名稱
             * @default 019405NM
             * @MemberOf BestBanner
             */
            user_name_text: ControlDefaultsObject.Banner.user_name_text || " 019405NM ",
            /**
             * @property {string} ap_date_icon 系統日期圖示
             * @default icon-time icon-white
             * @MemberOf BestBanner
             */
            ap_date_icon: ControlDefaultsObject.Banner.ap_date_icon || "icon-time icon-white",
            /**
             * @property {string} ap_date_text 系統日期
             * @default 系統日期
             * @MemberOf BestBanner
             */
            ap_date_text: ControlDefaultsObject.Banner.ap_date_text || null,
            /**
             * @property {string} ap_language_url 語系網址
             * @default string.empty
             * @MemberOf BestBanner
             */
            ap_language_url: ControlDefaultsObject.Banner.ap_language_url || "",
            /**
             * @property {string} ap_home_url 首頁網址
             * @default string.empty
             * @MemberOf BestBanner
             */
            ap_home_url: ControlDefaultsObject.Banner.ap_home_url || "",
            /**
             * @property {string} ap_log_out 登出
             * @default string.empty
             * @MemberOf BestBanner
             */
            ap_log_out: ControlDefaultsObject.Banner.ap_log_out || ""
        },

        //處理日期
        _procDate: function () {
            var that = this,
                date = new Date();

            //取出系統當天日期
            that.options.ap_date_text = " " + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + " ";

        },

        //Template套上options屬性 長出banner 
        _procTemplate: function () {
            var that = this, divBanner = {}, apNameDivTemplate = {},
                divInfoSection = {}, linkUserName = {}, linkApDate = {},
                linkApLanguage = {}, linkApHome = {}, linkApLogOut = {};

            //新增div 
            divBanner = kendo.template(that._templates.bannerDiv);
            that.Banner = $(divBanner(that.options));
            that.element.append(that.Banner);

            //在div中新增'系統名稱'
            apNameDivTemplate = kendo.template(that._templates.apNameDiv.replace(/apNameText/, that.options.ap_name).replace(/apNameUrl/, that.options.ap_name_url));
            that.ApName = $(apNameDivTemplate(that.options));
            that.element.find("div[class='k-pane k-scrollable header']").append(that.ApName);

            //在div中新增一 InfoSection div
            divInfoSection = kendo.template(that._templates.InfoSectionDiv);
            that.InfoSection = $(divInfoSection(that.options));
            that.element.find("div[class='k-pane k-scrollable header']").append(that.InfoSection);

            //在InfoSection div中新增 使用帳號 Link
            linkUserName = kendo.template(that._templates.userNameLink.replace(/userNameText/, that.options.user_name_text).replace(/userNameIcon/, that.options.user_name_icon));
            that.UserName = $(linkUserName(that.options));
            that.element.find("div[class='InfoSection']").append(that.UserName).append("&nbsp;");

            //在InfoSection div中新增 系統時間 Link
            linkApDate = kendo.template(that._templates.apDateLink.replace(/apDateText/, that.options.ap_date_text).replace(/apDateIcon/, that.options.ap_date_icon));
            that.ApDate = $(linkApDate(that.options));
            that.element.find("div[class='InfoSection']").append(that.ApDate).append("&nbsp;");

            //在InfoSection div中新增 語系 Button
            linkApLanguage = kendo.template(that._templates.apLanguageLink.replace(/apLanguageUrl/, that.options.ap_language_url));
            that.ApLanguage = $(linkApLanguage(that.options));
            that.element.find("div[class='InfoSection']").append(that.ApLanguage).append("&nbsp;");

            //在InfoSection div中新增 首頁 Button
            linkApHome = kendo.template(that._templates.apHomeLink.replace(/apHomeUrl/, that.options.apHomeUrl));
            that.ApHome = $(linkApHome(that.options));
            that.element.find("div[class='InfoSection']").append(that.ApHome).append("&nbsp;");

            //在InfoSection div中新增 登出 Button
            linkApLogOut = kendo.template(that._templates.apLogOutLink.replace(/apLogOutUrl/, that.options.apLogOutUrl));
            that.ApLogOut = $(linkApLogOut(that.options));
            that.element.find("div[class='InfoSection']").append(that.ApLogOut);

        },

        //Template
        _templates: {
            bannerDiv: "<div role='group' class='k-pane k-scrollable header' />",
            apNameDiv: "<div class='pane-content pull-left'><a href = 'apNameUrl'><h1 class='logo'>apNameText</h1></a></div>",
            InfoSectionDiv: "<div class='InfoSection' />",
            userNameLink: "<a href='' title='使用帳號' tabindex='-1'><i class = 'userNameIcon'></i>userNameText</a>",
            apDateLink: "<a href='' title='系統時間' tabindex='-1'><i class='apDateIcon'></i>apDateText</a>",
            apLanguageLink: "<a class='btn btn-Top' href = 'apLanguageUrl' title='台灣' tabindex='-1'><i class='icon-globe icon-white'></i>語系</a>",
            apHomeLink: "<a class='btn btn-Top' href = 'apHomeUrl' title='首頁' tabindex='-1'><i class='icon-home icon-white'></i>首頁</a>",
            apLogOutLink: "<a class='btn btn-Top' href = 'apLogOutUrl' title='登出' tabindex='-1'><i class='icon-off icon-white'></i>登出</a>"
        },

    });

    ui.plugin(GSSBanner);

})($);