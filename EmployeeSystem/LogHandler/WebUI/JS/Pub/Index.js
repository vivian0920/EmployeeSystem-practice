/// <reference path="Scripts/jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="Scripts/GSS/Common/ValidateControlObject.js" />
/// <reference path="Scripts/GSS/PageRedirectObject.js" />

$(function () {
    //���Ϳ��~�T������, �åB�]�w�����i���N����
    //ValidateControlObject.MessageDiologSetting($("#MessageDialog"), false);

    var objPage = $("#Template_Vertical");
    //���ε���
    objPage.height(BaseObject.WindowHeight);

    //���J��l��
    SharedMethodObject.Page.InitPage();
});