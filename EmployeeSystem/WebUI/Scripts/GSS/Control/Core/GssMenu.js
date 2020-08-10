/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../Common/StringFormatObject.js" />

//功能: 擴充KendoMenu功能 - 功能選單Menu
//描述: 功能選單
//歷程: 1. 2014/07/16   1.00   Ben_Tsai   Create

// wrap the widget in a closure. Not necessary in doc ready, but a good practice
(function ($) {

    // shorten references to variables. this is better for uglification 
    var kendo = window.kendo
        , ui = kendo.ui
        , KendoMenu = ui.Menu;

    /**
     * @classdesc 擴充KendoMenu功能 - 功能選單Menu
     * @class BestMenu
     */
    var GssMenu = KendoMenu.extend({

        // define the init function which is called by the base widget
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
            KendoMenu.fn.init.call(this, element, options);

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestMenu
             * @MemberOf BestMenu
             */
            name: "BestMenu",

            /**
             * @property {string} orientation menu生成方式: 水平(horizontal), 垂直(vertical)
             * @default vertical
             * @MemberOf BestMenu
             */
            orientation: ControlDefaultsObject.Menu.orientation || "vertical",

            /**
             * @property {bool} openOnClick 是否點選後才展開
             * @default false
             * @MemberOf BestMenu
             */
            openOnClick: ControlDefaultsObject.Menu.openOnClick || false,

            /**
             * @property {string} sub_page_location 讀取子頁面的div區塊
             * @default Center
             * @MemberOf BestMenu
             */
            sub_page_location: ControlDefaultsObject.Menu.sub_page_location || "Center",

            /**
             * @property {object} now_page_obj 目前頁面的div object
             * @default null
             * @MemberOf BestMenu
             */
            now_page_obj: null,

            /**
             * @property {bool} fixed_top menu水平時是否固定在top位置
             * @default false
             * @MemberOf BestMenu
             */
            fixed_top: ControlDefaultsObject.Menu.fixed_top || false,

            /**
             * @property {bool} is_tw_year 固定menu在top位置時是否為不透明
             * @default false
             * @MemberOf BestMenu
             */
            is_opacity: ControlDefaultsObject.Menu.is_opacity || false,

            /**
             * @property {object} dataSource Widget的dataSource
             * @default null
             * @MemberOf BestMenu
             * @desc 包含欄位: text(功能名稱), value(功能ID), level(層級), imageUrl(圖示路徑), items(子項目), url(功能路徑), parameters(功能參數)
             */
            dataSource: null,

            /**
             * @property {bool} is_scroller menu水平時是否允許滑動方式呈現
             * @default true
             * @MemberOf BestMenu
             */
            is_scroller: ControlDefaultsObject.Menu.is_scroller || true,

            /**
             * @property {string} scroller_type menu滑動方式呈現時, 如何觸發滑動事件
             * @default click-50
             * @MemberOf BestMenu
             * @desc 前面表示觸發滑動的事件, 目前設定為click後觸發滑動; 後面的數字50表示每次卷軸所要滑動的比例, 目前設定為50%
             */
            scroller_type: ControlDefaultsObject.Menu.scroller_type || "click-50",

            /**
             * @property {string} scroller_theme menu滑動方式呈現, 所要套用的CSS
             * @default buttons-out
             * @MemberOf BestMenu
             */
            scroller_theme: ControlDefaultsObject.Menu.scroller_theme || "buttons-out"

        },

        _create: function () {

            var that = this
                , elementObj = that.element.data("kendo" + that.options.name)
                , parentObj = that.element.parents("div[id*='Center']");

            //註冊select事件
            elementObj.bind("select", that._select);

            //menu水平呈現
            if (that.options.orientation == "horizontal") {

                //menu固定在top位置
                if (that.options.fixed_top) {

                    //將div註冊scroll bar事件
                    parentObj.on("scroll", $.proxy(that._scroll, that));

                }
                else {

                    //menu以滑動方式呈現
                    if (that.options.is_scroller) {

                        var objScroller = that.element.parent();

                        objScroller.mThumbnailScroller({
                            type: that.options.scroller_type,
                            theme: that.options.scroller_theme
                        });

                        //因為menu的需求, 所以要暫時開啟overflow屬性
                        objScroller.find(".mTSWrapper").css("overflow", "visible");
                        objScroller.find(".mTSContainer").css("overflow", "visible");

                    }

                }

            }

        },

        _select: function (e) {

            var that = this
                , dataItem = that.options.dataSource
                , location = that.options.sub_page_location
                , nowPageObject = that.options.now_page_obj == null ? $(document) : that.options.now_page_obj;

            //先關閉畫面上的錯誤訊息視窗
            ErrorDialogObservableObject.EmptyErrorDialog();

            //Step1: 取得目前點選的層級index
            var item = $(e.item);
            var index = item.parentsUntil(".k-menu", ".k-item").map(function () {
                return $(this).index();
            }).get().reverse();

            index.push(item.index());

            //Step2: 取得所點選的item其dataSource中的資料

            //index為一個object, 0位置存放父項目index, 1位置存放子項目index ...以此類推
            for (var i = -1, len = index.length; ++i < len;) {
                dataItem = dataItem[index[i]];
                dataItem = i < len - 1 ? dataItem.items : dataItem;
            }

            if (dataItem.value != null) {

                //設定頁面層級
                if (dataItem.value == "LMC/LM120100C00.ASP") {

                    //dataItem.value在此先訂為DC002.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC002.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }
                else if (dataItem.value == "F009") {
                    SharedMethodObject.Page.LoadContent(dataItem.objData);
                }
                else if (dataItem.value == "B001") {
                    SharedMethodObject.Page.LoadContent(dataItem.objData);
                }
                else if (dataItem.value == "LMC/LM430100C00.ASP") {
                    location.href = "Case/CaseQuery.aspx";
                }
                else if (dataItem.value == "DatePicker") {

                    //dataItem.value在此先訂為DC003.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC003.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                } else if (dataItem.value == "DataGrid") {

                    //dataItem.value在此先訂為DC004.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC004.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                } else if (dataItem.value == "NumericTextBox") {

                    //dataItem.value在此先訂為DC005.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC005.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                } else if (dataItem.value == "MaskedTextBox") {

                    //dataItem.value在此先訂為DC006.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC006.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                } else if (dataItem.value == "AutoComplete") {

                    //dataItem.value在此先訂為DC007.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC007.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                } else if (dataItem.value == "TextBox") {

                    //dataItem.value在此先訂為DC008.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC008.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                } else if (dataItem.value == "PhoneTextBox") {

                    //dataItem.value在此先訂為DC009.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC009.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "IntervalTextBox") {

                    //dataItem.value在此先訂為DC010.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC010.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "CheckBoxList") {

                    //dataItem.value在此先訂為DC011.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "System/D/C/DC011.aspx";
                    PageLevelObject.Center.PageRW[BaseObject.NowLevel] = "R";
                    PageRedirectObject.LoadContent("A");

                }

                else if (dataItem.value == "RadioButtonList") {

                    //dataItem.value在此先訂為DC012.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "System/D/C/DC012.aspx";
                    PageLevelObject.Center.PageRW[BaseObject.NowLevel] = "R";
                    PageRedirectObject.LoadContent("A");

                }

                else if (dataItem.value == "DropDownList") {

                    //dataItem.value在此先訂為DC013.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC013.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "DualDropDownList") {

                    //dataItem.value在此先訂為DC014.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC014.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "TripleDropDownList") {

                    //dataItem.value在此先訂為DC015.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC015.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "ComboBox") {

                    //dataItem.value在此先訂為DC016.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC016.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "DualComboBox") {

                    //dataItem.value在此先訂為DC017.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC017.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "TripleComboBox") {

                    //dataItem.value在此先訂為DC018.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC018.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "TextAreaComboBox") {

                    //dataItem.value在此先訂為DC044.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC044.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "Window") {

                    //dataItem.value在此先訂為DC019.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC019.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "YearPicker") {

                    //dataItem.value在此先訂為DC021.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC021.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "MonthYearPicker") {

                    //dataItem.value在此先訂為DC022.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC022.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "TimePicker") {

                    //dataItem.value在此先訂為DC023.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC023.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "IntervalDatePicker") {

                    //dataItem.value在此先訂為DC024.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC024.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "IntervalYearPicker") {

                    //dataItem.value在此先訂為DC025.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC025.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "IntervalMonthYearPicker") {

                    //dataItem.value在此先訂為DC026.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC026.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "IntervalTimePicker") {

                    //dataItem.value在此先訂為DC027.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC027.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "TextBoxPopUp") {

                    //dataItem.value在此先訂為DC028.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC028.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "PairTextBoxPopUp") {

                    //dataItem.value在此先訂為DC029.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC029.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "CurrencyTextBox") {

                    //dataItem.value在此先訂為DC030.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC030.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "CityDistrictZIP") {

                    //dataItem.value在此先訂為DC031.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC031.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "MultiHeaderDataGrid") {

                    //dataItem.value在此先訂為DC032.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC032.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "GroupAggregateDataGrid") {

                    //dataItem.value在此先訂為DC033.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC033.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "ValidateButton") {

                    //dataItem.value在此先訂為DC034.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC034.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "LandSiteText") {

                    //dataItem.value在此先訂為DC035.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC035.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "IdTextBox") {

                    //dataItem.value在此先訂為DC036.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC036.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "AddressBoxSimple") {

                    //dataItem.value在此先訂為DC037.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC037.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "TextAreaBox") {

                    //dataItem.value在此先訂為DC038.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC038.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "AddressBoxFull") {

                    //dataItem.value在此先訂為DC039.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC039.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "RadioDropDownList") {

                    //dataItem.value在此先訂為DC040.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC040.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "MultiSelect") {

                    //dataItem.value在此先訂為DC041.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC041.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "ListBox") {

                    //dataItem.value在此先訂為DC042.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC042.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_Center"), "Center");

                }

                else if (dataItem.value == "DualListBox") {

                    //dataItem.value在此先訂為DC043.aspx
                    PageLevelObject.Center.URI[BaseObject.NowLevel] = "DC043.aspx";
                    PageRedirectObject.LoadSubPage(nowPageObject.find("#Template" + PageLevelObject.Template[BaseObject.NowLevel] + "_" + location), location);

                }
                //TODO: test by ben ===============================================================

            }

        },

        _scroll: function () {

            var that = this
                , parentObj = that.element.parents("div[id*='Center']")
                , topDivHeight = that.element.parents("div[id*='Vertical']").find("div[id*='Top']").height();

            if (parentObj.scrollTop() > 10) {

                that.element.css("position", "fixed");
                that.element.css("top", topDivHeight + 4);
                that.element.css("width", parentObj.width() - 20);

                //需要透明
                if (!that.options.is_opacity) {

                    that.element.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "0.4").css("opacity", "0.4");

                    //滑鼠聚焦則變深
                    that.element.on("mouseover.FixedMenu", $.proxy(function () {
                        that.element.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "1").css("opacity", "1");
                    }, that));

                    //滑鼠離開則淡出
                    that.element.on("mouseleave.FixedMenu", $.proxy(function () {
                        that.element.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "0.4").css("opacity", "0.4");
                    }, that));

                }

            }
            else {

                that.element.css("position", "absolute");
                that.element.css("top", "0");
                that.element.css("width", "100%");
                that.element.parent().css("height", that.element.height());

                //需要透明
                if (!that.options.is_opacity) {

                    that.element.css("filter", "alpha(Opacity=100, Style=0)").css("-moz-opacity", "1").css("opacity", "1");
                    that.element.off("mouseover.FixedMenu");
                    that.element.off("mouseleave.FixedMenu");

                }

            }

        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssMenu);

})(jQuery);