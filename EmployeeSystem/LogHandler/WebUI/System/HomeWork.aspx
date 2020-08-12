<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HomeWork.aspx.cs" Inherits="System_HomeWork" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <div><h1>Input</h1></div>
    <div >
             <div id="input" style="margin-left:100px;">
                 <h4>員工1</h4>
                <div>
                    <label style="float:left;margin-right:50px">請輸入姓名:</label>
                    <input type="text" name="employeeName" id="employeeName1" data-role="besttextbox" data-placeholder="請輸入" />
                </div>
                 <div>
                    <label style="float:left;margin-right:50px">請輸入員編:</label>
                    <input type="text" name="employeeId" id="employeeId1" data-role="besttextbox" data-mode="AlphaNumeric" data-placeholder="請輸入"/>
                </div>
                 <div style="margin-bottom:10px">
                    <label style="float:left; margin-left:15px ;margin-right:50px">到職日期:</label>
                    <input type="text"name="hireDate" id="hireDate1"  data-role="bestdatepicker" data-is_tw_year="true"/>
                </div>
            </div>
    </div>
    <div id="buttons" style="margin-left:100px" >
                    <button class="btn btn-light"id="insertConditionButton">增加輸入欄位</button>
                    <button class="btn btn-light"id="deleteConditionButton">刪除輸入欄位</button>
                    <button class="btn btn-light" id="clearButton" onclick="clearAll()">清空所有欄位</button>
                    <button class="btn btn-light" id="searchButton" onclick="search()">查詢</button>
                    <button class="btn btn-primary" id="insertButton">新增員工</button>
     </div>
    <div><h1 >Data</h1></div>
    <div id="searchResultGrid" data-role='bestdatagrid' ></div>
   
</body>
</html>
<script src="JS/System/HomeWork.js" type="text/javascript"></script>