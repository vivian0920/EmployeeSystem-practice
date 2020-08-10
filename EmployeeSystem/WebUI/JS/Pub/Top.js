/// <reference path="../../../Scripts/jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="../../../Scripts/GSS/BaseCommonObject.js" />

//功能: 系統主頁面 Top
//描述: 系統logo + 使用者個人資訊
//歷程: 1. 2014/04/22   1.00   Ben_Tsai   Create
//      2. 2014/07/14          Sara_Liou  Update(Widget)

$(function () {

    var nowPageObject = $("#Template_Top");

    //================= test by Ben =========================

    var objMenu = [];

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "教育訓練作業", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "作業頁面", "value": "F009", "expanded": true, "items": null, "objData": { template: "A", level: 1, center: { URI: "System/HomeWork.aspx", pageRW: "R", Height: "", Collapsible: false, Resizable: false, DisplayMode: "D" } } }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AutoComplete", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AutoComplete", "value": "AutoComplete", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CheckBox", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CheckBoxList", "value": "CheckBoxList", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ComboBox", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ComboBox", "value": "ComboBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DualComboBox", "value": "DualComboBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TripleComboBox", "value": "TripleComboBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextAreaComboBox", "value": "TextAreaComboBox", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Date/Time", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DatePicker", "value": "DatePicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "YearPicker", "value": "YearPicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MonthYearPicker", "value": "MonthYearPicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TimePicker", "value": "TimePicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DateTimePicker", "value": "DateTimePicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalDatePicker", "value": "IntervalDatePicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalYearPicker", "value": "IntervalYearPicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalMonthYearPicker", "value": "IntervalMonthYearPicker", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalTimePicker", "value": "IntervalTimePicker", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DropDownList", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DropDownList", "value": "DropDownList", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DualDropDownList", "value": "DualDropDownList", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TripleDropDownList", "value": "TripleDropDownList", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Table", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DataGrid", "value": "DataGrid", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MultiHeaderDataGrid", "value": "MultiHeaderDataGrid", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "GroupAggregateDataGrid", "value": "GroupAggregateDataGrid", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextBox", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "NumericTextBox", "value": "NumericTextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MaskedTextBox", "value": "MaskedTextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextBox", "value": "TextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "PhoneTextBox", "value": "PhoneTextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IntervalTextBox", "value": "IntervalTextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextBoxPopUp", "value": "TextBoxPopUp", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "PairTextBoxPopUp", "value": "PairTextBoxPopUp", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CurrencyTextBox", "value": "CurrencyTextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "CityDistrictZIP", "value": "CityDistrictZIP", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "LandSiteText", "value": "LandSiteText", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "IdTextBox", "value": "IdTextBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AddressBoxSimple", "value": "AddressBoxSimple", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "TextAreaBox", "value": "TextAreaBox", "level": 1, "url": null, "expanded": true, "items": null },
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "AddressBoxFull", "value": "AddressBoxFull", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "RadioButton", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "RadioButtonList", "value": "RadioButtonList", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Window", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                 { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Window", "value": "Window", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Button", "value": null, "level": 0, "url": null, "expanded": true
                            , "items": [
                                 { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ValidateButton", "value": "ValidateButton", "level": 1, "url": null, "expanded": true, "items": null }
                            ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "Application", "value": null, "level": 0, "url": null, "expanded": true
                        , "items": [
                             { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "RadioDropDownList", "value": "RadioDropDownList", "level": 1, "url": null, "expanded": true, "items": null }
                        ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MultiSelect", "value": null, "level": 0, "url": null, "expanded": true
                        , "items": [
                             { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "MultiSelect", "value": "MultiSelect", "level": 1, "url": null, "expanded": true, "items": null }
                        ]
    });

    objMenu.push({
        "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ListBox", "value": null, "level": 0, "url": null, "expanded": true
                        , "items": [
                             { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "ListBox", "value": "ListBox", "level": 1, "url": null, "expanded": true, "items": null },
                             { "__type": "DomainObject.DomainObject.DefinedDomainObject.KendoPanelBarObject", "text": "DualListBox", "value": "DualListBox", "level": 1, "url": null, "expanded": true, "items": null }
                        ]
    });

    //================= test by Ben =========================

    nowPageObject.find("#Top_menu").BestMenu({
        dataSource: objMenu,
        sub_page_location: "Center",
        now_page_obj: nowPageObject,
        orientation: "horizontal",
        fixed_top: false
    });

    $("#Top").AutoBindControl();

});