/// <reference path="../../jQuery/jquery-1.9.1-vsdoc.js" />

var SelectControlObject = function () {
	/// <summary>
	/// 根據data-role取得kendo Control
	/// </summary>
    /// <returns type=""></returns>

    function SelectControl(element) {
    	/// <summary>
        /// 根據data-role取得kendo Control
    	/// </summary>
    	/// <param name="obj">element</param>
    	/// <returns type="">kendo object</returns>
        switch (element.attr("data-role")) {
            case "bestphonetextbox":
                return element.BestPhoneTextBox();
                break;
            case "bestintervaltextbox":
                return element.BestIntervalTextBox();
                break;
            case "bestautocomplete":
                return element.BestAutoComplete();
                break;
            case "besttextbox":
                return element.BestTextBox();
                break;
            case "bestnumerictextbox":
                return element.BestNumericTextBox();
                break;
            case "bestmaskedtextbox":
                return element.BestMaskedTextBox();
                break;
            case "bestdatepicker":
                return element.BestDatePicker();
                break;
            case "bestdatetimepicker":
                return element.BestDateTimePicker();
                break;
            case "bestintervaldatepicker":
                return element.BestIntervalDatePicker();
                break;
            case "bestmonthyearpicker":
                return element.BestMonthYearPicker();
                break;
            case "bestintervalmonthyearpicker":
                return element.BestIntervalMonthYearPicker();
                break;
            case "besttimepicker":
                return element.BestTimePicker();
                break;
            case "bestintervaltimepicker":
                return element.BestIntervalTimePicker();
                break;
            case "bestyearpicker":
                return element.BestYearPicker();
                break;
            case "bestintervalyearpicker":
                return element.BestIntervalYearPicker();
                break;
            case "besttextboxpopup":
                return element.BestTextBoxPopUp();
                break;
            case "bestpairtextboxpopup":
                return element.BestPairTextBoxPopUp();
                break;
            case "bestcurrencytextbox":
                return element.BestCurrencyTextBox();
                break;
            case "bestcitydistrictzip":
                return element.BestCityDistrictZIP();
                break;
            case "bestlandsitetext":
                return element.BestLandSiteText();
                break;
            case "bestidtextbox":
                return element.BestIdTextBox();
                break;
            case "bestaddressboxsimple":
                return element.BestAddressBoxSimple();
                break;
            case "bestaddressboxfull":
                return element.BestAddressBoxFull();
                break;
            case "besttextareabox":
                return element.BestTextAreaBox();
                break;
            case "bestradiobuttonlist":
                return element.BestRadioButtonList();
                break;
            case "bestcheckboxlist":
                return element.BestCheckBoxList();
                break;
            case "bestdropdownlist":
                return element.BestDropDownList();
                break;
            case "bestdualdropdownlist":
                return element.BestDualDropDownList();
                break;
            case "besttripledropdownlist":
                return element.BestTripleDropDownList();
                break;
            case "bestcombobox":
                return element.BestComboBox();
                break;
            case "bestdualcombobox":
                return element.BestDualComboBox();
                break;
            case "besttriplecombobox":
                return element.BestTripleComboBox();
                break;
            case "bestradiodropdownlist":
                return element.BestRadioDropDownList();
                break;
            case "bestmultiselect":
                return element.BestMultiSelect();
                break;
            case "bestlistbox":
                return element.BestListBox();
                break;
            case "bestduallistbox":
                return element.BestDualListBox();
                break;
            case "besttextareacombobox":
                return element.BestTextAreaComboBox();
                break;
            case "bestvalidatebutton":
                return element.BestValidateButton();
            case "bestbutton":
                return element.BestButton();
            case "bestfileupload":
                return element.BestFileUpload();
            default:
                return null;
                break;
        }
    }

    return {
        SelectControl: SelectControl
    }
}();