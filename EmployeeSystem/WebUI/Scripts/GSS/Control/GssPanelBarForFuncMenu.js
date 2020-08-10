//功能: 擴充KendoMenu功能 - 功能清單區域收合PanelBar
//描述: 區域收合
//歷程: 1. 2014/12/26   1.00   Ben_Tsai   Create

(function ($) {

    var kendo = window.kendo
        , ui = kendo.ui
        , KendoPanelBar = ui.PanelBar;

    /**
     * @classdesc 擴充KendoMenu功能 - 區域收合PanelBar
     * @class BestPanelBarForFuncMenu
     */
    var GssPanelBarForFuncMenu = KendoPanelBar.extend({

        init: function (element, options) {

            var that = this
                , initOptions = {}
                , defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            //設定資料源
            that._SetDataSource(options);

            // make the base call to initialize this widget
            KendoPanelBar.fn.init.call(this, element, options);

            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            /**
             * @property {string} name Widget的namespace
             * @default BestPanelBarForFuncMenu
             * @MemberOf BestPanelBarForFuncMenu
             */
            name: "BestPanelBarForFuncMenu",

            /**
             * @property {object} dataSource Widget的dataSource
             * @default null
             * @MemberOf BestPanelBarForFuncMenu
             * @desc 包含欄位: text(Bar的名稱), cssClass(套用的CSS), url(點擊後的link), encoded(text是否編碼), content(內容), contentUrl(內容的URL), imageUrl(Bar的圖示路徑), items(子項目)
             */
            dataSource: null,

            /**
             * @property {string} expandMode Widget的開合模式
             * @default multiple
             * @MemberOf BestPanelBarForFuncMenu
             * @desc multiple: 可以開啟多個<br>
                     single: 一次只能開啟一個           
             */
            expandMode: ControlDefaultsObject.PanelBarForFuncMenu.expandMode || "multiple",

            /**
             * @property {string} ajaxUrl ajax取得資料來源的URI
             * @default 空字串
             * @MemberOf BestPanelBarForFuncMenu
             */
            ajaxUrl: "",

            /**
             * @property {object} ajaxParameterData ajax取得資料來源的參數資料
             * @default {}
             * @MemberOf BestPanelBarForFuncMenu
             */
            ajaxParameterData: {}

        },

        _create: function () {

            var that = this
                , elementObj = that.element.data("kendo" + that.options.name)

            //註冊select事件
            elementObj.bind("select", that._select);

            //將畫面移動至點選的item
            if (BaseObject.FuncMenu.SelectedItem.length > 0) {

                window.location.href = "#" + BaseObject.FuncMenu.SelectedItem + "_" + BaseObject.NowLevel;

                //註冊kendo點選的CSS
                $("#" + BaseObject.FuncMenu.SelectedItem + "_" + BaseObject.NowLevel).parent().addClass("k-state-selected");

            }

        },

        _select: function (e) {

            var that = this
                , dataItem = that.options.dataSource;

            //清除畫面上的所有錯誤訊息視窗
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

                //將目前點選的資料記錄下來
                BaseObject.FuncMenu.SelectedItem = dataItem.value;

                //讀取頁面
                SharedMethodObject.Page.LoadContent(dataItem.objData);

            }

        },

        _SetDataSource: function (options) {

            var that = this;

            if (BaseObject.FuncMenu.DataSource == null) {
                //表示暫存資料源不存在

                ////透過AJAX抓取資料
                //$.ajax({
                //    contentType: "application/json; charset=utf-8",
                //    type: "POST",
                //    datatype: "json",
                //    url: options.ajaxUrl,
                //    data: SharedMethodObject.Ajax.SetData(options.ajaxParameterData),
                //    success: function (result) {

                //        //檢測Token是否正常;正常才往下進行
                //        if (SharedMethodObject.Ajax.ProcessAjxaxSuccess(result)) {
                //            options.dataSource = result.d.Data;
                //        }

                //    },
                //    error: function (result) {
                //        //處理Ajax失敗
                //        SharedMethodObject.Ajax.ProcessAjaxError(result);
                //    }
                //});


                //================= test by Ben =========================
                var objMenu = [];

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AutoComplete", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AutoComplete", encoded: false, "value": "AutoComplete", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC007.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CheckBox", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CheckBoxList", encoded: false, "value": "CheckBoxList", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC011.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ComboBox", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ComboBox", encoded: false, "value": "ComboBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC016.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DualComboBox", encoded: false, "value": "DualComboBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC017.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TripleComboBox", encoded: false, "value": "TripleComboBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC018.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextAreaComboBox", encoded: false, "value": "TextAreaComboBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC044.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Date/Time", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DatePicker", encoded: false, "value": "DatePicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC003.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "YearPicker", encoded: false, "value": "YearPicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC021.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MonthYearPicker", encoded: false, "value": "MonthYearPicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC022.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TimePicker", encoded: false, "value": "TimePicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC023.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DateTimePicker", encoded: false, "value": "DateTimePicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC048.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalDatePicker", encoded: false, "value": "IntervalDatePicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC024.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalYearPicker", encoded: false, "value": "IntervalYearPicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC025.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalMonthYearPicker", encoded: false, "value": "IntervalMonthYearPicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC026.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalTimePicker", encoded: false, "value": "IntervalTimePicker", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC027.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DropDownList", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DropDownList", encoded: false, "value": "DropDownList", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC013.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DualDropDownList", encoded: false, "value": "DualDropDownList", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC014.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TripleDropDownList", encoded: false, "value": "TripleDropDownList", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC015.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Table", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DataGrid", encoded: false, "value": "DataGrid", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC004.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MultiHeaderDataGrid", encoded: false, "value": "MultiHeaderDataGrid", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC032.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "GroupAggregateDataGrid", encoded: false, "value": "GroupAggregateDataGrid", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC033.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "BatchDataGrid", encoded: false, "value": "BatchDataGrid", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC045.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextBox", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "NumericTextBox", encoded: false, "value": "NumericTextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC005.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MaskedTextBox", encoded: false, "value": "MaskedTextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC006.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextBox", encoded: false, "value": "TextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC008.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "PhoneTextBox", encoded: false, "value": "PhoneTextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC009.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalTextBox", encoded: false, "value": "IntervalTextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC010.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextBoxPopUp", encoded: false, "value": "TextBoxPopUp", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC028.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "PairTextBoxPopUp", encoded: false, "value": "PairTextBoxPopUp", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC029.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CurrencyTextBox", encoded: false, "value": "CurrencyTextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC030.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CityDistrictZIP", encoded: false, "value": "CityDistrictZIP", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC031.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "LandSiteText", encoded: false, "value": "LandSiteText", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC035.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IdTextBox", encoded: false, "value": "IdTextBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC036.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AddressBoxSimple", encoded: false, "value": "AddressBoxSimple", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC037.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextAreaBox", encoded: false, "value": "TextAreaBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC038.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AddressBoxFull", encoded: false, "value": "AddressBoxFull", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC039.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "RadioButton", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                            { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "RadioButtonList", encoded: false, "value": "RadioButtonList", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC012.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Window", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                             { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Window", encoded: false, "value": "Window", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC019.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Button", encoded: false, "value": null, "expanded": true
                                        , "items": [
                                             { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ValidateButton", encoded: false, "value": "ValidateButton", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC034.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                        ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Application", encoded: false, "value": null, "expanded": true
                                    , "items": [
                                         { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "RadioDropDownList", encoded: false, "value": "RadioDropDownList", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC040.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                    ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MultiSelect", encoded: false, "value": null, "expanded": true
                                    , "items": [
                                         { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MultiSelect", encoded: false, "value": "MultiSelect", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC041.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                    ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ListBox", encoded: false, "value": null, "expanded": true
                                    , "items": [
                                         { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ListBox", encoded: false, "value": "ListBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC042.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                         { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DualListBox", encoded: false, "value": "DualListBox", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC043.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                    ]
                });

                objMenu.push({
                    "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TabStrip", encoded: false, "value": null, "expanded": true
                                    , "items": [
                                         { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TabStrip", encoded: false, "value": "TabStrip", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC046.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } },
                                         { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TabStrip-NoDataSource", encoded: false, "value": "TabStrip-NoDataSource", "expanded": true, "items": null, "objData": { template: "B", level: 1, center: { URI: "System/DC047.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" }, left: { URI: "Pub/CaseMenu.aspx", pageRW: "R", Width: "16%", Collapsible: true, Resizable: true, DisplayMode: "D" } } }
                                    ]
                });

                options.dataSource = objMenu;

                //================= test by Ben =========================


            }
            else {
                //取得暫存資料源
                options.dataSource = BaseObject.FuncMenu.DataSource;
            }

            //將dataSource的text加上span控制項, 方便之後的動態點選使用
            DataSourceAddSpanControl(options.dataSource);

            //將目前dataSource設定至暫存資料源
            BaseObject.FuncMenu.DataSource = options.dataSource;

        }

    });

    ui.plugin(GssPanelBarForFuncMenu);

    //============================================== Private Method ==============================================

    function DataSourceAddSpanControl(dataSource) {
        /// <summary>
        /// 將dataSource的text加上span控制項, 方便之後作為頁籤滾動使用
        /// </summary>
        /// <param name="dataSource">資料來源</param>

        var nowDataItem = null;

        for (var i = 0; i < dataSource.length; i++) {

            nowDataItem = dataSource[i];

            //將dataSource的text加上span控制項
            if (nowDataItem.value != null) {

                //若已經有span控制項的話, 則用取代的方式
                if (nowDataItem.text.indexOf("span") != -1) {
                    nowDataItem.text = nowDataItem.text.replace(nowDataItem.value + "_" + BaseObject.PreLevel, nowDataItem.value + "_" + BaseObject.NowLevel);
                }
                else {
                    nowDataItem.text = "<span id='" + nowDataItem.value + "_" + BaseObject.NowLevel + "'>" + nowDataItem.text + "</span>";
                }

            }

            if (nowDataItem.items != null && nowDataItem.items.length > 0) {
                //遞迴執行
                DataSourceAddSpanControl(nowDataItem.items);
            }

        }

    }

})(jQuery);