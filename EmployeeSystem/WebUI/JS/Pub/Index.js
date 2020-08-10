/// <reference path="Scripts/jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="Scripts/GSS/Common/ValidateControlObject.js" />
/// <reference path="Scripts/GSS/PageRedirectObject.js" />

$(function () {
    //產生錯誤訊息視窗, 並且設定為不可任意移動
    //ValidateControlObject.MessageDiologSetting($("#MessageDialog"), false);

    var objPage = $("#Template_Vertical");
    //分割視窗
    objPage.height(BaseObject.WindowHeight);

    //載入初始頁
    SharedMethodObject.Page.InitPage();
});