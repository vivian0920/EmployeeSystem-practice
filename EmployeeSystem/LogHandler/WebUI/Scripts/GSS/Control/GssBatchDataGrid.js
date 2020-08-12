//功能: 擴充KendoGrid功能 - BatchDataGrid
//描述: 列上編輯, 新增的資料表
//歷程: 1. 2014/12/23   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget;

    var GssBatchDataGrid = Widget.extend({

        init: function (element, options) {

            // cache a reference to this
            var that = this
                , initOptions = {},
                defaultOptions = $.extend({}, that.options);

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

        options: {

            name: "BestBatchDataGrid",

            //DataSource Setting
            createUri: "",
            readUri: "",
            updateUri: "",
            destroyUri: "",
            schemaModelId: "",
            schemaModelFields: {},
            serverSorting: false,        //排序功能是否回Server
            serverPaging: true,          //資料是否每頁回Server問
            serverFiltering: true,       //欄位搜尋功能是否回Server
            pageSize: 5,                 //每頁幾筆
            queryParameters: {},         //資料的查詢參數
            batch: true,                 //是否允許暫存編輯資料

            //Grid Setting
            columnDefine: [],            //定義資料表顯示的欄位
            dataSource: null,
            editable: true,              //是否允許編輯
            filterable: true,            //是否允許欄位搜尋
            reorderable: true,           //是否允許自行排序欄位顯示順序
            resizable: true,             //是否允許調整欄位寬度

            pageable: true,             //是否允許分頁
            pageSizes: true,            //是否顯示每頁筆數下拉選單, 修改預設值[5, 10, 20]的方式可傳入: [2, 4, 6]
            buttonCount: 5,             //預設分頁按鈕顯示5頁, 超過用...
            pageMode: "n",              //分頁模式: n表示顯示數字按鈕組(numeric); i表示顯示直接輸入頁碼(input)

            sortable: true,              //是否允許排序
            mulitSortable: true,         //是否允許多個欄位排序
            gridCaption: "",             //表格的表頭名稱
            gridUnit: "",                //表格的資料單位
            tooltipable: false,           //是否column的提示訊息功能
            toolbar: [],                 //是否顯示工具列
            inital: false               //設定是否初始化(不取得資料,僅呈現Grid及header, footer等相關設定)

        },

        refresh: function () {

            var that = this;

            that._create();

        },

        _create: function () {

            //TODO: 
            //1. 需確認使用頻率是否很多
            //2. 需要重新客製化kendo的toolbar按鈕功能, 因為其cancel未確實進DB砍資料, save時卻會真的存回DB

            // cache a reference to this
            var that = this;

            // set the initial toggled state
            that.toggle = true;

            //一律需要暫存, 可編輯, 顯示工具列
            that.options.batch = true;
            that.options.editable = true;
            that.options.toolbar = [
                { name: "create", text: "新增", imageClass: "k-i-custom" },
                { name: "save", text: "儲存" },
                { name: "cancel", text: "取消" }
            ];

            //製作表格
            that.element.kendoBestDataGrid(that.options);

        }

    });

    ui.plugin(GssBatchDataGrid);

})(jQuery);
