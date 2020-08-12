/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget;

    var GSSMultiHeaderDataGrid = widget.extend({

        //Init事件
        init: function (element, options) {
            var that = this,
                initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            // make the base call to initialize this widget
            widget.fn.init.call(this, element, options);

            that._create();

            that._procHeader();
        },

        options: {
            name: "BestMultiHeaderDataGrid",

            //DataSource Setting
            createUri: "",
            readUri: "",
            updateUri: "",
            destroyUri: "",
            schemaModelId: "",
            schemaModelFields: {},
            headerFormat: null,
            serverPaging: true,         //資料是否每頁回Server問
            pageSize: 5,                  //每頁幾筆
            queryParameters: {},     //資料的查詢參數
            //aggregate: [],           //定義欄位計算功能 "average", "count", "max", "min" and "sum"

            //Grid Setting
            columnDefine: [],          //定義資料表顯示的欄位
            dataSource: null,
            editable: false,             //是否允許編輯

            pageable: true,             //是否允許分頁
            pageSizes: true,            //是否顯示每頁筆數下拉選單, 修改預設值[5, 10, 20]的方式可傳入: [2, 4, 6]
            buttonCount: 5,            //預設分頁按鈕顯示5頁, 超過用...
           
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
            widget.fn.setOptions.call(that, options);

            //執行_create();
            that._create();
        },

        _create: function () {
            var that = this,
                element = that.element,
                options = that.options;

            //於options補上固定設定值
            options.serverSorting=false;
            options.serverFiltering=false;
            options.filterable=false;
            options.groupable=false;
            options.reorderable=false;
            options.resizable=false;
            options.sortable=false;
            options.mulitSortable=false;

            //製作表格
            element.kendoBestDataGrid(options);
        },


        _procHeader: function () {
            var that = this, options = that.options,
                element = that.element,
                columnDefineLength = options.columnDefine.length,
                thead = element.data("kendoGrid").thead,
                headFormatColSpan = 0;

            //headerFormat不為Null且Header為Multiple,方可繼續動作
            if (options.headerFormat != null) {
                //若columnDefineLength等同headerFormat最上層的ColSpan,則使用headerFormat的資料來重製Header,反之,則直接使用原生的Header
                for (var i = 0; i < options.headerFormat.length; i++) {
                    var colspan = options.headerFormat[i].ColSpan || 1;

                    headFormatColSpan += colspan;
                }

                if (headFormatColSpan == columnDefineLength) {
                    //先隱藏原有的tr
                    thead.find("tr").hide();

                    //根據headerFormat重製tr
                    that._makeHeader(thead, options.headerFormat);
                }
            }
        },

        _makeHeader: function (thead, data) {
            var that = this,
                htmlTr = "<tr role='row'></tr>",
                htmlTh = "<th class='k-header' data-role='droptarget'></th>",
                childnode = [];

            if (data != null) {
                thead.append(htmlTr);

                for (var i = 0; i < data.length; i++) {
                    thead.find("tr:last").append(htmlTh);
                    thead.find("th:last").append(data[i].Text);
                    thead.find("th:last").attr("width", data[i].Width);
                    thead.find("th:last").attr("colspan", data[i].ColSpan);
                    thead.find("th:last").attr("rowspan", data[i].RowSpan);
                    thead.find("th:last").attr("style", data[i].Style || "text-align:center");

                    if (data[i].ChildNode !== undefined && data[i].ChildNode.length > 0) {
                        for (var j = 0; j < data[i].ChildNode.length; j++) {
                            childnode.push(data[i].ChildNode[j]);
                        }
                    }
                }

                if (childnode.length > 0) {
                    that._makeHeader(thead, childnode);
                }
            }
        }

    });

    ui.plugin(GSSMultiHeaderDataGrid);

})($);