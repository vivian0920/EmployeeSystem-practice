<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Top.aspx.cs" Inherits="Pub_Top" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>系統主頁面 TOP</title>
</head>
<body>
    <div class="header" id="Top">
        <div class="logo">
            <a href="index.htm">
                <img alt="台北富邦銀行" src="IMG/logo.png" />
            </a>
            <span>徵授信管理系統</span>
        </div>
        <div class="toplink">
            <span class="user"><i class="fa fa-user"></i>陳小芳 (Mary Chen) </span>
            <a class="line03" href="#">系統登出</a>
        </div>
        <div>
            <ul id="Top_menu" data-role="bestmenu"></ul>
        </div>
        <div class="shortcut">
            <div class="links">
                <span><a href="#"><i class="fa fa-flag"></i>快速連結</a></span>
                <span><a href="#"><i class="fa fa-book"></i>快速連結</a></span>
                <span><a href="#"><i class="fa fa-comments"></i>快速連結</a></span>
                <span><a href="#"><i class="fa fa-newspaper-o"></i>快速連結</a></span>
                <span><a href="#"><i class="fa fa-camera"></i>快速連結</a></span>
                <span><a href="#"><i class="fa fa-pie-chart"></i>快速連結</a></span>
            </div>
        </div>

    </div>

    <!--用這種寫法是避免, 檔案放在不同資料夾時, 會造成JS讀不到的問題-->
    <script src="JS/Pub/Top.js" type="text/javascript"></script>
</body>
</html>
