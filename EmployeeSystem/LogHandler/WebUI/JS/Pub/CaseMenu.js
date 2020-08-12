/// <reference path="../../../Scripts/jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="../../../Scripts/GSS/BaseCommonObject.js" />
/// <reference path="../../../Scripts/GSS/KendoPanelBarObject.js" />

//功能: 系統主頁面 Left
//描述: 功能選單
//歷程: 1. 2014/04/22   1.00   Ben_Tsai   Create

$(function () {

    var nowPageObject = $("#" + BaseObject.PageNM + BaseObject.NowLevel);
    var MenuBarObject = nowPageObject.find("#CaseMenu_MenuBar");

    //Block UI Setting (開啟)
    MenuBarObject.block({
        message: "<table class=\"divLoadingImg\"><tr><td><img src=\"CSS/KendoUI/Uniform/loading_2x.gif\" /></td></tr></table>",
        css: { border: "0" }
    });

    //Block UI Setting (關閉)
    MenuBarObject.unblock();

    MenuBarObject.BestPanelBarForFuncMenu({
        ajaxUrl: BaseObject.ServiceUrl + "/RuleEngineWebService.asmx/DeleteReRule",
        ajaxParameterData: {}
    });

    nowPageObject.data("kendoSplitter").bind("collapse", ShowSplitterIconList);
    nowPageObject.data("kendoSplitter").bind("expand", HideSplitterIconList);

    //設定Splitter收合後要顯示的Icon列
    function ShowSplitterIconList() {
        nowPageObject.find(".b-splitter-icon-list").css("z-index", "1");
    }

    //設定Splitter收合後要顯示的Icon列
    function HideSplitterIconList() {
        nowPageObject.find(".b-splitter-icon-list").css("z-index", "0");
    }

});