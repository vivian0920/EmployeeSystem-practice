<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CaseMenu.aspx.cs" Inherits="Pub_CaseMenu" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>系統主頁面 Left</title>
</head>
<body>
    <style>
        .divLoadingImg {
            text-align: center;
            height: 400px;
            width: 200px;
            vertical-align: middle;
        }
    </style>
    <div id="CaseMenu">
        <div>
            <ul class="breadcrumb menutitle" style="margin-bottom: 0px; padding-right: 0px;">
                <li class="pull-right"><a id="CaseMenu_FunctionSiteMap" class="btn" href="#" title="功能索引">
                    <i class="icon-list"></i></a></li>
                <li class="pull-right"><a id="CaseMenu_MenuAllOpenClose" class="btn" href="#" title="全部收合">
                    <i class="icon-resize-small"></i></a></li>
                <li class="pull-right"><a id="CaseMenu_MenuPin" class="k-button" href="#" title="鎖定區塊"
                    style="padding-bottom: 3px; padding-top: 4px;"><i class="k-icon k-i-pin"></i></a></li>
            </ul>
        </div>
        <div class="b-splitter-icon-list">
            <a id="CaseMenu_MenuAllOpenClose_Splitter" class="btn" href="#" title="全部收合">
                <i class="icon-resize-small"></i></a>
            <a id="CaseMenu_FunctionSiteMap_Splitter" class="btn" href="#" title="功能索引">
                <i class="icon-list"></i></a>
        </div>
        <div id="CaseMenu_MenuBar">
        </div>
        <br />
    </div>

    <!--用這種寫法是避免, 檔案放在不同資料夾時, 會造成JS讀不到的問題-->
    <script src="JS/Pub/CaseMenu.js" type="text/javascript"></script>
</body>
</html>
