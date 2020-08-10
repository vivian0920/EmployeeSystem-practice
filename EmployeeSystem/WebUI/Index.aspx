<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="CSS/KendoUI/examples-offline.css" rel="Stylesheet" />
    <link href="CSS/KendoUI/kendo.common.min.css" rel="Stylesheet" />
    <link href="CSS/KendoUI/kendo.rtl.min.css" rel="Stylesheet" />
    <link href="CSS/KendoUI/kendo.default.min.css" rel="Stylesheet" />
    <link href="CSS/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="CSS/jQueryUI/base/minified/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="CSS/ThumbnailScroller/jquery.mThumbnailScroller.css" rel="stylesheet" type="text/css" />
    <link href="CSS/GSS/GSSWeb.css" rel="stylesheet" type="text/css" />
    <link href="CSS/GSS/style.css" rel="stylesheet" type="text/css" />
    <link href="CSS/GSS/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!--[if lt IE 9]>
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <%--Plugin--%>
    <script src="Scripts/jQuery/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="Scripts/KendoUI/kendo.dataviz.min.js" type="text/javascript"></script>
    <script src="Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Scripts/KendoUI/cultures/kendo.culture.zh-TW.min.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/jquery.blockUI.min.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/jquery-ui-1.11.0.min.js" type="text/javascript"></script>
    <script src="Scripts/ThumbnailScroller/jquery.mThumbnailScroller.min.js" type="text/javascript"></script>
  

    <%--GSS Common--%>
    <script src="Scripts/GSS/Common/Extend.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Common/StringFormatObject.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Common/SelectControlObject.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Common/SharedMethodObject.js" type="text/javascript"></script>

    <%--GSS Data--%>
    <script src="Scripts/GSS/Data/BaseCommonObject.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Data/ControlDefaultsObject.js" type="text/javascript"></script>

    <%--GSS Control--%>
    <script src="Scripts/GSS/Control/Core/GssMenu.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssPanelBar.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssTooltip.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssGoTop.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssGoBack.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssBreadcrumb.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssDatePicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssMonthYearPicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssTimePicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssIntervalDatePicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssIntervalYearPicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssIntervalMonthYearPicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssIntervalTimePicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssDataGrid.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssYearPicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssNumericTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssMaskedTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssAutoComplete.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssPhoneTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssIntervalTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssCheckBoxList.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssRadioButtonList.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssDropDownList.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssDualDropDownList.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssTripleDropDownList.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssComboBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssDualComboBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssTripleComboBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssWindow.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssTextBoxPopUp.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssPairTextBoxPopUp.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssCurrencyTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssMultiHeaderDataGrid.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssCityDistrictZIP.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssButton.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssGroupAggregateDataGrid.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssValidateButton.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssLandSiteText.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssIdTextBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssAddressBoxSimple.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssTextAreaBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssAddressBoxFull.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssRadioDropDownList.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssMultiSelect.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssListBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssDualListBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssTextAreaComboBox.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssQuickButton.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssBatchDataGrid.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssBanner.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/GssPanelBarForFuncMenu.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssTabStrip.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssFileUpload.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssDateTimePicker.js" type="text/javascript"></script>
    <script src="Scripts/GSS/Control/Core/GssQuickBookmark.js" type="text/javascript"></script>
    
</head>
<body>
    <div id="Template_Vertical" class="k-content b-template" style="overflow: hidden;">
        <div id="Template_Top">
        </div>
        <div id='Template_Content'>
        </div>
    </div>
    <script src="JS/Pub/Index.js" type="text/javascript"></script>
  
</body>
</html>
