<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TestTransactionSample.aspx.cs" Inherits="TestTransactionSample" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button ID="btnSearch" Text="查詢" runat="server" onclick="btnSearch_Click"></asp:Button>
        <asp:TextBox ID="txtToken" runat="server"></asp:TextBox>
    </div>
    </form>
</body>
</html>
