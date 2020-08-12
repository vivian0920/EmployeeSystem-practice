/// <reference path="../Common/StringFormatObject.js" />
/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />

//功能: 擴充KendoGrid功能 - 表格DataGrid
//描述: 群組叢集表格資料顯示
//歷程: 1. 2014/07/07   1.00   Ben_Tsai   Create

// wrap the widget in a closure. Not necessary in doc ready, but a good practice
(function ($) {

    // shorten references to variables. this is better for uglification 
    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget;

    // declare the custom input widget by extenting the very base kendo widget
    var GssDataGrid = Widget.extend({

        // define the init function which is called by the base widget
        init: function (element, options) {

            // cache a reference to this
            var that = this
                , initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //處理disabled/readonly
            var objelement = $(element)
                , readonly = objelement.attr("readonly");

            if (readonly) {
                objelement.attr("disabled", "disabled");
            }            

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            Widget.fn.init.call(this, element, options);

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            name: "BestGroupAggregateDataGrid",
            childName: "Grid",

            //DataSource Setting
            createUri: "",
            readUri: "",
            updateUri: "",
            destroyUri: "",
            schemaModelId: "",
            schemaModelFields: {},
            serverSorting: false,        //排序功能是否回Server
            serverPaging: true,         //資料是否每頁回Server問
            serverFiltering: true,      //欄位搜尋功能是否回Server
            pageSize: 5,                  //每頁幾筆
            queryParameters: {},     //資料的查詢參數
            aggregate: [],           //定義欄位計算功能 "average", "count", "max", "min" and "sum"
            group: [],               //定義群組欄位計算功能

            //Grid Setting
            columnDefine: [],          //定義資料表顯示的欄位
            dataSource: null,
            editable: false,             //是否允許編輯
            filterable: true,             //是否允許欄位搜尋
            reorderable: true,          //是否允許自行排序欄位顯示順序
            resizable: true,           //是否允許調整欄位寬度

            pageable: true,             //是否允許分頁
            pageSizes: true,            //是否顯示每頁筆數下拉選單, 修改預設值[5, 10, 20]的方式可傳入: [2, 4, 6]
            buttonCount: 5,            //預設分頁按鈕顯示5頁, 超過用...
            pageMode: "n",              //分頁模式: n表示顯示數字按鈕組(numeric); i表示顯示直接輸入頁碼(input)

            sortable: true,              //是否允許排序
            mulitSortable: true,        //是否允許多個欄位排序
            gridCaption: "",             //表格的表頭名稱
            gridUnit: "",                //表格的資料單位
            checkable: false,            //是否允許勾選功能
            check_box_header: false,       //是否允許全部勾選功能
            radioable: false,             //是否允許點選功能

            //作業欄位屬性設定
            action_control: "",

            inital: false,               //設定是否初始化(不取得資料,僅呈現Grid及header, footer等相關設定)

            dataBoundFN: null               //Grid完成後,客製化執行的function
        },
        
        enable: function (enable) {
            var that = this;

            enable = (enable === undefined) ? true : enable;

            //enable為true,於element加上disabled的屬性
            if (enable) {
                that.element.attr("disabled", false);
            }

            //enable為false,於element移除disabled的屬性
            if (!enable) {
                that.element.attr("disabled", true);
            }

            that._create();
        },

        readonly: function (readonly) {
            var that = this;

            readonly = (readonly === undefined) ? true : readonly;

            //readonly為true,於element加上readonly的屬性
            if (readonly) {
                that.element.attr("readonly", true);
            }

            //readonly為false,於element移除readonly的屬性
            if (!readonly) {
                that.element.attr("readonly", false);
            }

            that._create();
        },

        //refresh
        refresh: function () {
            var that = this;
            //執行_create();
            that._create();
        },

        setOptions: function (options) {
            var that = this;

            //重新設定Options資料
            Widget.fn.setOptions.call(that, options);

            //執行_create();
            that._create();
        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this;

            // set the initial toggled state
            that.toggle = true;

            //一律不允許拖拉欄位達到群組功能
            that.options.groupable = false;

            //製作表格
            that.element.kendoBestDataGrid(that.options);

        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssDataGrid);

})(jQuery);