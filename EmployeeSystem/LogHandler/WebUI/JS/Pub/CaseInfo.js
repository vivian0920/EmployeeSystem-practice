/// <reference path="../../Scripts/jQuery/jquery-1.11.1.min.js" />
/// <reference path="../../Scripts/GSS/Control/Core/GssBreadcrumb.js" />


$(function () {

    var objPage = $("#" + BaseObject.PageNM + BaseObject.NowLevel);

    //#region 產生麵包屑
    
    //#endregion

    //#region 設定Control
    //案件資訊
    objPage.find("#CaseInfo_Storage").BestPanelBar({
        isDefinedCollapse: true,
        collapseHeightRate: 0.3,
        isFixdTop: true
    });

    $("#CaseInfo_Storage .k-content").css("display", "block");
    //#endregion    

    $("#CaseInfo").AutoBindControl();

    //#region 設定Event
    
    //#endregion

    //#region Private Method

    //#endregion

});