/// <reference path="../Common/StringFormatObject.js" />
/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Common/SharedMethodObject.js" />

//功能: 擴充KendoGrid功能 - 表格DataGrid
//描述: 表格資料顯示
//歷程: 1. 2014/05/29   1.00   Ben_Tsai   Create

// wrap the widget in a closure. Not necessary in doc ready, but a good practice
(function ($) {

    // shorten references to variables. this is better for uglification 
    var kendo = window.kendo
        , ui = kendo.ui
        , Widget = ui.Widget
        , nowPage = 1
        , gridCheckAllClass = "gridCheckAll"
        , gridCheckItemClass = "gridCheckItems"
        , gridRadioHeadClass = "gridRadioHead"
        , gridRadioItemClass = "gridRadioItems"
        , gridRadioGroupName = "gridRadioGroup"
        , gridCommandClass = "gridCommandColumn"
        , hasCheckAll = false
        , hasTooptip = false
        , inputCheckboxHtmlCode = ""
        , dataBoundFN
        , delimiter = ','
        , gridInitWidth = 0;

    // declare the custom input widget by extenting the very base kendo widget
    var GssDataGrid = Widget.extend({

        // define the init function which is called by the base widget
        init: function (element, options) {

            // cache a reference to this
            var that = this
                , initOptions = {}
                , defaultOptions = $.extend({}, that.options);

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

            dataBoundFN = that.options.dataBoundFN;

            //處理Datatype
            that._procDatatype();

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            name: "BestDataGrid",
            childName: "Grid",

            //DataSource Setting
            createUri: "",
            readUri: "",
            updateUri: "",
            destroyUri: "",
            schemaModelId: "",
            schemaModelFields: {},
            serverSorting: true,        //排序功能是否回Server
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
            filterable: false,             //是否允許欄位搜尋
            groupable: false,            //是否允許拖拉欄位達到群組功能
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
            check_box_header_text: "選取",    //勾選所要顯示的header
            radioable: false,             //是否允許點選功能
            radio_button_header_text: "點選",    //點選所要顯示的header
            tooltipable: true,           //是否column的提示訊息功能
            toolbar: [],                 //是否顯示工具列

            inital: false,               //設定是否初始化(不取得資料,僅呈現Grid及header, footer等相關設定)

            dataBoundFN: null,               //Grid完成後,客製化執行的function

            selectData: [],              //記錄己選取的資料物件
            selectDataKey: '',           //記錄己選取的Key字串
            currentPath: ""              //目前功能軌跡

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

        setOptions: function (options) {
            var that = this;

            //重新設定Options資料
            Widget.fn.setOptions.call(that, options);

            dataBoundFN = that.options.dataBoundFN;

        },

        getSelectData: function () {
            return this.options.selectData;
        },

        //refresh
        refresh: function () {
            var that = this;

            //重新BindGrid
            that._create();
        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this
                //分頁屬性設定
                , pageableAttr = that.options.pageable ?
                    {
                        pageSizes: that.options.pageSizes,
                        buttonCount: that.options.buttonCount,
                        input: that.options.pageMode == "i" ? true : false,
                        numeric: that.options.pageMode == "n" ? true : false,
                        messages: {
                            page: "請輸入頁碼",
                            of: "之 {0}",
                            display: "目前 {0}-{1} 筆 , 總共 {2} 筆",
                            empty: "無資料",
                            itemsPerPage: "每頁筆數",
                            first: "第一頁",
                            next: "下一頁",
                            previous: "上一頁",
                            last: "最後一頁",
                            morePages: "更多頁碼"
                        }
                    } : false
                //群組屬性設定
                , groupableAttr = that.options.groupable ?
                    {
                        messages: {
                            empty: "<font class=\"text-info\">請將群組欄位拖拉至此...</font>"
                        }
                    } : false
                //排序屬性設定
                , sortableAttr = that.options.sortable ?
                    {
                        mode: that.options.mulitSortable ? "multiple" : "single"
                    } : false
                //搜尋屬性設定
                , filterableAttr = that.options.filterable ?
                    {
                        messages: {
                            info: "請輸入查詢條件： ",
                            and: "And",
                            or: "Or",
                            filter: "搜尋",
                            clear: "取消"
                        },
                        operators: {
                            string: {
                                eq: "等於",
                                neq: "不等於",
                                contains: "包含",
                                doesnotcontain: "不包含"
                            },
                            number: {
                                eq: "等於",
                                neq: "不等於",
                                contains: "包含",
                                doesnotcontain: "不包含"
                            },
                            date: {
                                eq: "等於",
                                neq: "不等於",
                                contains: "包含",
                                doesnotcontain: "不包含"
                            }
                        }
                    } : false;

            // set the initial toggled state
            that.toggle = true;

            //Step1: 設定資料來源
            if (that.options.inital) {
                that.options.dataSource = new kendo.data.DataSource({});
            }
            else if (that.options.dataSource == null || that.options.dataSource.data.length == 0 || that.options.readUri.length != 0) {
                //1. 未設定dataSource
                //2. 若dataSource的length不為0, 則表示在外面有自行定義資料來源, 則不重新讀取資料
                //3. 有設定資料原路徑, 表示需要透過ajax取得
                that._setDataSource();
            }

            //Step2: 設定資料表格表頭名稱及單位
            if (that.GridCaption == null) {
                if (that.options.gridCaption.length != 0 || that.options.gridUnit.length != 0) {

                    if (that.options.gridCaption.length != 0) {
                        that.options.gridCaption = that.options.gridCaption + ": ";
                    }

                    if (that.options.gridUnit.length != 0) {
                        that.options.gridUnit = "單位: " + that.options.gridUnit;
                    }

                    var template = kendo.template(that._templates.gridCaptionUnit);
                    that.GridCaption = template(that.options);
                    that.element.append(that.GridCaption);

                }
            }

            //Step3: 設定資料表格

            //若有勾選功能, 則新增checkbox欄位
            if (that.element.find("." + gridCheckAllClass).length == 0) {
                if (that.options.checkable) {

                    //一律新增在最前面
                    that.options.columnDefine.unshift({
                        headerTemplate: "<span class='" + gridCheckAllClass + "'>" + that.options.check_box_header_text + "</span>",  //欄位表頭
                        template: "<span class='" + gridCheckItemClass + "'></span>",       //欄位內容
                        width: "45px",
                        filterable: false,
                        sortable: false,
                        attributes: {
                            "class": "text-center"
                        },
                        headerAttributes: {
                            style: "text-align: center;"
                        }
                    });

                }
            }

            //若有點選功能, 則新增radiobutton欄位
            if (that.element.find("." + gridRadioHeadClass).length == 0) {
                if (that.options.radioable) {

                    that.options.columnDefine.unshift({
                        headerTemplate: "<span class='" + gridRadioHeadClass + "'>" + that.options.radio_button_header_text + "</span>",            //欄位表頭
                        template: "<input class='" + gridRadioItemClass + "' type='radio' name='" + gridRadioGroupName + "' />",   //欄位內容
                        width: "45px",
                        filterable: false,
                        sortable: false,
                        attributes: {
                            "class": "text-center"
                        },
                        headerAttributes: {
                            style: "text-align: center;"
                        }
                    });

                }
            }

            //處理Command欄位(根據各Command所設定的action_control來處理)
            var aryDestoryColumn = [],
                objNewOptions = $.extend(true, [], that.options.columnDefine);

            $.each(objNewOptions, function (index, column) {

                //僅針對command欄位進行處理
                if (column.command != null) {

                    var isShowColumn = true,
                        aryDestoryCommand = [];

                    $.each(column.command, function (command_index, command_column) {
                        //判斷是否有設定action_control
                        if (command_column.action_control != null) {

                            //判斷column是否要呈現
                            isShowColumn = ChkColumnShow(that, command_column.action_control);

                            //判斷icon是否要呈現;若為不呈現時,需把command_index存入aryDestoryCommand
                            if (!ChkColumnIconShow(that, command_column.action_control)) {
                                aryDestoryCommand.push(command_index);
                            }
                        }
                    })

                    //若aryDestoryCommand有資料,則需代表該欄位需移除
                    if (aryDestoryCommand.length > 0) {
                        //先反轉陣列中的順序
                        aryDestoryCommand = aryDestoryCommand.reverse();

                        for (var i = 0; i < aryDestoryCommand.length; i++) {
                            column.command.splice(aryDestoryCommand[i], 1);
                        }
                    }

                    //若column不呈現時,需把該欄位序號存入aryDestoryColumn中;
                    if (!isShowColumn) {
                        aryDestoryColumn.push(index);
                    }

                }
            });

            //若aryDestoryColumn有資料,則需代表該欄位需移除
            if (aryDestoryColumn.length > 0) {
                //先反轉陣列中的順序
                aryDestoryColumn = aryDestoryColumn.reverse();

                //根據aryDestoryColumn來刪除that.options.columnDefine資料
                for (var i = 0; i < aryDestoryColumn.length; i++) {
                    objNewOptions.splice(aryDestoryColumn[i], 1);
                }
            }

            //暫存 作業欄位設定值, 是否需要全勾選, checkbox html code, 是否允許tooltip
            hasCheckAll = that.options.check_box_header;
            inputCheckboxHtmlCode = that._templates.inputCheckbox;
            hasTooptip = that.options.tooltipable;

            //建立資料表
            if (that.Grid != null) that.Grid.remove();
            that.Grid = $(that._templates.div);

            that.Grid.kendoGrid({

                columns: objNewOptions,
                editable: that.options.editable,
                pageable: pageableAttr,
                sortable: sortableAttr,
                filterable: filterableAttr,
                groupable: groupableAttr,
                reorderable: that.options.reorderable,
                resizable: that.options.resizable,
                dataSource: that.options.dataSource,
                toolbar: that.options.toolbar,

                //資料表格bind完成後觸發的事件
                dataBound: that._gridDataBound,
                columnResize: that._gridColumnResize,
                selectDataKey: that.options.selectDataKey,
                selectData: that.options.selectData,
                schemaModelId: that.options.schemaModelId

            });

            that.element.append(that.Grid);

            ////若有開啟全部勾選屬性, 註冊全選按鈕事件
            //if (hasCheckAll) {

            //    that.checkAll = $(inputCheckboxHtmlCode).addClass(gridCheckAllClass);

            //    that.checkAll.click(function (e) {

            //        var isCheckAll = this.checked;

            //        //選取時,需透過AJAX取得所有資料,並存入options.selectData中
            //        if (isCheckAll) {

            //            $(that.element).block({
            //                message: "<div ><img src=\"CSS/KendoUI/Uniform/loading_2x.gif\" /></div>",
            //                css: { border: "0" }
            //            });

            //            //先清空資料
            //            that.options.selectData = [];

            //            //回AJAX取得所有資料並存入options.selectData中
            //            $.ajax({
            //                contentType: "application/json; charset=utf-8",
            //                type: "POST",
            //                datatype: "json",
            //                url: that.options.readUri,
            //                data: SharedMethodObject.Ajax.SetGridParameter(that.options, { GetAllData: true }),
            //                success: function (result) {
            //                    //檢測Token是否正常;正常才往下進行
            //                    if (SharedMethodObject.Ajax.ProcessAjxaxSuccess(result)) {
            //                        //將取得的資料存入options.selectData中
            //                        for (index = 0; result.d.Data.length > index; index++) {
            //                            that.options.selectData.push(result.d.Data[index]);
            //                            that.options.selectDataKey += result.d.Data[index][that.options.schemaModelId] + delimiter;
            //                        }

            //                        //將selectDataKey寫回Kendo的Grid
            //                        that.element.data("kendoGrid").setOptions({
            //                            selectDataKey: that.options.selectDataKey,
            //                            selectData: that.options.selectData
            //                        });
            //                    }
            //                },
            //                error: function (result) {
            //                    //處理Ajax失敗
            //                    SharedMethodObject.Ajax.ProcessAjaxError(result);
            //                },
            //                complete: function () {
            //                    $(that.element).unblock();
            //                }
            //            });
            //        }

            //        //取消全選時,需清空options.selectData資料
            //        if (!isCheckAll) {
            //            that.options.selectData = [];
            //        }

            //        //將畫面各checkbox 根據isCheckAll 來設定是否勾選
            //        that.element.find("." + gridCheckItemClass).each(function (e, t) {
            //            this.checked = isCheckAll;
            //        });

            //    });

            //    //取代畫面上暫時的temp, 變成真正的checkbox
            //    that.element.find("." + gridCheckAllClass).parent().html(that.checkAll);

            //}

            //暫存目前的table寬度, 在之後resize需要使用
            gridInitWidth = that.element.find("table:first").width();

        },

        _gridDataBound: function (e) {

            var that = this
                , checkAllObj = that.thead.find("." + gridCheckAllClass)
                , nowDataAry = [];

            //that.options.dataSource如果今天是用ajax取得那data會是一個function, 如果是由外面設定好傳進來的那就會是Object
            if (that.options.dataSource != null) {
                if (typeof that.options.dataSource.data === "function") {
                    nowDataAry = that.options.dataSource.data();
                }
                else {
                    nowDataAry = that.options.dataSource.data;
                }
            }

            //取代畫面上暫時的temp, 並且將欄位中每個checkbox加上click事件
            that.element.find("." + gridCheckItemClass).each(function (e, t) {

                that.checkItem = $(inputCheckboxHtmlCode).addClass(gridCheckItemClass);

                //檢查該筆資料是否己被存入options.selectData中,若有,則勾選;反之,不勾選
                if (that.options.selectDataKey.length > 0) {
                    if (that.options.selectDataKey.indexOf(nowDataAry[e][that.options.schemaModelId] + delimiter) != -1) {
                        that.checkItem.prop("checked", true);
                    }
                }

                //設定checkbox click事件
                that.checkItem.click(function (e) {

                    var tr = $(e.target).closest("tr")
                        , data = that.dataItem(tr);

                    //勾選資料
                    if (e.target.checked) {

                        //將資料存入options.selectData中
                        that.options.selectData.push(data);

                        //將key值存到options.selectDataKey
                        that.options.selectDataKey += data[that.options.schemaModelId] + delimiter;

                        //若選取資料筆數等於Grid Total筆數,則需自動勾全勾選
                        if (that.options.selectData.length == that.options.dataSource.total()) {
                            $(checkAllObj).prop("checked", true);
                        }

                    }

                    //不勾選資料
                    if (!e.target.checked) {

                        //將options.selectData中,移除該筆資料
                        that.options.selectData.splice(data, 1);

                        //將options.selectDataKey移除該key值
                        that.options.selectDataKey = that.options.selectDataKey.replace(data[that.options.schemaModelId] + delimiter, '');

                        //判斷是否已全勾選,若全勾選,則需移除全勾選
                        if ($(checkAllObj).prop("checked")) {
                            $(checkAllObj).prop("checked", false);
                        }

                    }

                });

                //取代畫面上暫時的temp, 變成真正的checkbox
                $(this).parent().html(that.checkItem);

            });

            //取代畫面上暫時的temp, 並且將欄位中每個Radio加上click事件
            that.element.find("." + gridRadioItemClass).each(function (index, item) {

                //檢查該筆資料是否己被存入options.selectData中,若有,則勾選;反之,不勾選
                if (that.options.selectData.length > 0) {
                    if (that.options.selectData[0][that.options.schemaModelId] == nowDataAry[index][that.options.schemaModelId]) {
                        $(this).attr("checked", true);
                    }
                }

                //設定Radio click事件
                $(this).click(function (e) {

                    var tr = $(e.target).closest("tr")
                        , data = that.dataItem(tr);

                    //選取資料
                    if (e.target.checked) {

                        //將options.selectData清空
                        that.options.selectData = [];

                        //將資料存入options.selectData中
                        that.options.selectData.push(data);

                    }
                });

            });

            //產生tooltip控制項
            if (hasTooptip) {

                //處理資料表thead部分
                that.thead.find("tr>th").each(function () {

                    var thisTh = $(this)
                        , thisThCell = thisTh.find("a:last")
                        , objTooltip = $("<span title='" + thisThCell.text() + "'>" + thisThCell.text() + "</span>");

                    objTooltip.kendoBestTooltip();

                    thisThCell.empty().append(objTooltip);

                });

            }

            //處理資料表tbody部分
            that.tbody.find('tr').each(function () {

                var rowDataSource = that.dataItem(this)             //取得目前這一列的datasource
                    , thisRow = $(this)
                    , bindColumnName = ""
                    , thisControl = null;

                thisRow.find("td").each(function (index, item) {

                    var thisCol = $(this)
                        , templateControl = thisCol.find("[data-role]");

                    if (thisCol.children().length != 0) {
                        //表示圖示或控制項欄位, 則不處理tooltip, 只有文字類的才需要處理
                        return;
                    }

                    if (templateControl.length > 0) {
                        //表格預設就帶出控制項

                        //取得控制項資料來源欄位
                        bindColumnName = templateControl.attr("data-bind");

                        //依據不同的data-role產生不同的控制項
                        thisControl = SelectControlObject.SelectControl(templateControl);

                        thisControl.Bvalue(rowDataSource[bindColumnName]);

                    }
                    else if (hasTooptip) {
                        //產生tooltip控制項

                        var objTooltip = $("<span title='" + thisCol.text() + "'>" + thisCol.text() + "</span>");

                        objTooltip.kendoBestTooltip();

                        thisCol.empty().append(objTooltip);
                    }

                });

            });

            //執行外部傳入的DataBound事件
            if (dataBoundFN != null) {
                dataBoundFN(that);
            }

        },

        _gridColumnResize: function (e) {

            var that = this
                , objTable = that.element.find("table");

            objTable.width(gridInitWidth);

        },

        //根據datatype設定template事件,若外部有設定template則不處理datatype
        _procDatatype: function () {
            var that = this,
                options = that.options,
                columnDefine = options.columnDefine,
                datatype = {};

            for (var i = 0; i < columnDefine.length; i++) {
                var obj = columnDefine[i];

                if (obj.command === undefined) {
                    //template無設定時,方處理datatype
                    if (obj.template === undefined) {
                        if (obj.datatype !== undefined) {
                            switch (obj.datatype.mode) {
                                case "Currency":
                                    var decimals = obj.datatype.decimals || 0,
                                        carry_method = obj.datatype.carry_method || "Round",
                                        unit = obj.datatype.unit || 1,
                                        format = "\\#,\\#";

                                    if (decimals > 0) {
                                        format = format + "." + ("\\#".repeat(decimals));
                                    }

                                    obj.template = "#: kendo.toString(StringFormatObject.Numeric.Currency(data." + obj.field + ", " + decimals + ", '" + carry_method + "', " + unit + "), '" + format + "') #";
                                    obj.groupHeaderTemplate = obj.title + ": " + obj.template.replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-right" };

                                    break;

                                case "Percent":
                                    var decimals = obj.datatype.decimals || 0,
                                        carry_method = obj.datatype.carry_method || "Round",
                                        format = "\\#";

                                    if (decimals > 0) {
                                        format = format + "." + ("\\#".repeat(decimals));
                                    }

                                    obj.template = "#: kendo.toString(StringFormatObject.Numeric.Percent(data." + obj.field + ", " + decimals + ", '" + carry_method + "'), '" + format + "') #";
                                    obj.groupHeaderTemplate = obj.title + ": " + obj.template.replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-right" };

                                    break;

                                case "Date":
                                    var dateFormat = obj.datatype.format || "yyyy/MM/dd"
                                        , isTWYear = obj.datatype.is_tw_year || false

                                    obj.template = "#: StringFormatObject.DateTime.FormatDate(data." + obj.field + ", '" + dateFormat + "', " + isTWYear + ") #";
                                    obj.groupHeaderTemplate = obj.title + ": " + obj.template.replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-left" };

                                    break;

                                case "MonthYear":
                                    var dateFormat = obj.datatype.format || "yyyy/MM"
                                        , isTWYear = obj.datatype.is_tw_year || false

                                    obj.template = "#: StringFormatObject.DateTime.FormatDate(data." + obj.field + ", '" + dateFormat + "', " + isTWYear + ") #";
                                    obj.groupHeaderTemplate = obj.title + ": " + obj.template.replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-left" };

                                    break;

                                case "Year":
                                    var dateFormat = obj.datatype.format || "yyyy"
                                        , isTWYear = obj.datatype.is_tw_year || false

                                    obj.template = "#: StringFormatObject.DateTime.FormatDate(data." + obj.field + ", '" + dateFormat + "', " + isTWYear + ") #";
                                    obj.groupHeaderTemplate = obj.title + ": " + obj.template.replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-left" };

                                    break;

                                case "Time":
                                    var isTwelveHour = obj.datatype.is_twelve_hour || false

                                    obj.template = "#: StringFormatObject.DateTime.FormatTime(data." + obj.field + ", " + isTwelveHour + ") #";
                                    obj.groupHeaderTemplate = obj.title + ": " + obj.template.replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-left" };

                                    break;

                                case "DateTime":
                                    var dateFormat = obj.datatype.format || "yyyy/MM/dd"
                                        , isTWYear = obj.datatype.is_tw_year || false
                                        , isTwelveHour = obj.datatype.is_twelve_hour || false

                                    obj.template = "#: StringFormatObject.DateTime.FormatDate(data." + obj.field + ", '" + dateFormat + "', " + isTWYear + ") #"
                                        + "&nbsp;&nbsp;&nbsp;"
                                        + "#: StringFormatObject.DateTime.FormatTime(data." + obj.field + ", " + isTwelveHour + ") #";
                                    obj.groupHeaderTemplate = obj.title + ": "
                                        + obj.template.replace("data." + obj.field, "value").replace("data." + obj.field, "value");
                                    obj.attributes = { "class": "text-left" };

                                    break;

                            }
                        }
                    }
                }
            }
        },

        _setDataSource: function () {

            var that = this;

            that.options.dataSource = new kendo.data.DataSource({

                serverSorting: that.options.serverSorting,
                serverPaging: that.options.serverPaging,
                serverFiltering: that.options.serverFiltering,
                pageSize: that.options.pageSize,
                schema: {
                    //對應WebService資料回應格式, data內是存在依據model格式的資料, total是總筆數
                    data: "d.Data",
                    total: "d.TotalCount",
                    model: {
                        id: that.options.schemaModelId,
                        //定義欄位格式type: {number|string|boolean|date} default is string
                        fields: that.options.schemaModelFields
                    }
                },
                batch: that.options.batch,
                aggregate: that.options.aggregate,
                group: that.options.group,

                transport: {
                    create: {
                        url: that.options.createUri,
                        contentType: "application/json; charset=utf-8",
                        type: "POST"
                    },
                    read: {
                        url: that.options.readUri,
                        contentType: "application/json; charset=utf-8",
                        type: "POST"
                    },
                    update: {
                        url: that.options.updateUri,
                        contentType: "application/json; charset=utf-8",
                        type: "POST"

                    },
                    destroy: {
                        url: that.options.destroyUri,
                        contentType: "application/json; charset=utf-8",
                        type: "POST"
                    },
                    parameterMap: function (data, operation) {

                        if (operation != "read") {
                            // web service method parameters need to be send as JSON. The Create, Update and Destroy methods have a "products" parameter.

                            //alert(operation);

                            //TODO: 針對不同新增刪除修改進行動作

                            return JSON.stringify({ products: data.models });
                        }
                        else {

                            //TODO: 待確認是否 為所有分頁資料都勾選 或者是 當頁全勾選
                            ////判斷業馬是否等於目前頁碼, 不是表示換頁, 須調整相關參數及物件
                            //if (nowPage != data.page) {

                            //    nowPage = data.page;

                            //    //清空全勾選的header checkbox
                            //    if (that.options.checkable) that.checkAll[0].checked = false;

                            //}

                            return SharedMethodObject.Ajax.SetGridParameter(that.options, data);

                        }

                    }
                },
                requestEnd: function (e) {
                    var response = e.response;

                    //檢核Token是否正確
                    if (SharedMethodObject.Ajax.ProcessAjxaxSuccess(response)) {
                        //若查無資料,則需呈現訊息
                        if (response.d.Data != null) {
                            if (response.d.Data.length == 0) {
                                alert(MessageObject.NoData);
                            }
                        }
                    }
                }
            });

        },

        _templates: {
            gridCaptionUnit: "<div class='gridCaption'><div class='pull-left'>#: gridCaption #</div><div class='pull-right'>#: gridUnit #</div></div>",
            inputCheckbox: "<input type='checkbox' />",
            inputRadiobutton: "<input type='radio' />",
            div: "<div></div>"
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssDataGrid);

    //===================================== Private Method For Grid =====================================

    //根據action_control來判斷column是否呈現
    function ChkColumnShow(objGrid, strActionControl) {
        var pageRW = objGrid.element.attr("readonly") || objGrid.element.attr("disabled");

        switch (strActionControl) {

            case "ColumnHiddenOnWritable":

                //整頁W, Column隱藏; 若整頁R, Column顯示
                if (pageRW != null) {
                    return true;
                }
                else {
                    return false;
                }
                break;

            case "ColumnHiddenOnReadOnly":

                //整頁W, Column顯示; 若整頁R, Column隱藏
                if (pageRW != null) {
                    return false;
                }
                else {
                    return true;
                }
                break;

            default:
                return true;
                break;

        }
    }

    //根據action_control來判斷icon是否呈現
    function ChkColumnIconShow(objGrid, strActionControl) {
        var pageRW = objGrid.element.attr("readonly") || objGrid.element.attr("disabled");

        switch (strActionControl) {

            case "ColumnHiddenOnWritable":

                //整頁W, Icon隱藏; 若整頁R, Icon顯示
                if (pageRW != null) {
                    return true;
                }
                else {
                    return false;
                }
                break;

            case "IconHiddenOnWritable":

                //整頁W, Icon隱藏; 若整頁R, Icon顯示
                if (pageRW != null) {
                    return true;
                }
                else {
                    return false;
                }
                break;

            case "ColumnHiddenOnReadOnly":

                //整頁W, Icon顯示; 若整頁R, Icon隱藏
                if (pageRW != null) {
                    return false;
                }
                else {
                    return true;
                }
                break;

            case "IconHiddenOnReadOnly":

                //整頁W, Icon顯示; 若整頁R, Icon隱藏
                objCommandColumn.show();

                if (pageRW != null) {
                    return false;
                }
                else {
                    return true;
                }
                break;

            default:
                return true;
                break;

        }
    }
    //===================================== Private Method For Grid =====================================

})(jQuery);