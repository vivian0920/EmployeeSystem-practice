/// <reference path="../Data/BaseCommonObject.js" />


//擴充String的fn
$.extend(String.prototype, {
    //重覆字元
    repeat: function (num) {
        return new Array(num + 1).join(this);
    },

    //左補足指定字元及長度
    padLeft: function (length, sign) {
        if (this.length >= length) {
            return this;
        } else {
            return (sign + this).padLeft(length, sign);
        }
    },

    //右補足指定字元及長度
    padRight: function (length, sign) {
        if (this.length >= length) {
            return this;
        } else {
            return (this + sign).padRight(length, sign);
        }
    },

    //半形轉全形
    halfToFull: function () {
        var temp = "";

        if (this != null) {
            for (var i = 0; i < this.toString().length; i++) {
                var charCode = this.toString().charCodeAt(i);

                if (charCode <= 126 && charCode >= 33) {
                    charCode += 65248;
                } else if (charCode == 32) {    //半形空白轉全形
                    charCode = 12288;
                }

                temp = temp + String.fromCharCode(charCode);
            }
        }

        return temp;
    },

    //全形轉半形
    fullToHalf: function () {
        var temp = "";

        if (this != null) {
            for (var i = 0; i < this.toString().length; i++) {
                var charCode = this.toString().charCodeAt(i);

                if (charCode <= 65374 && charCode >= 65281) {
                    charCode -= 65248;
                } else if (charCode == 12288) {    //半形空白轉全形
                    charCode = 32;
                }

                temp = temp + String.fromCharCode(charCode);
            }
        }

        return temp;
    }
});

//擴充可用FN
$.fn.extend({
    //控管整頁唯讀
    PageRW: function () {
        var that = $(this),
            areaid = that.attr("PageArea"),
            strRW;

        switch (areaid) {
            case "B":
                strRW = PageLevelObject.Bottom.PageRW[BaseObject.NowLevel];
                break;
            case "C":
                strRW = PageLevelObject.Center.PageRW[BaseObject.NowLevel];
                break;
            case "L":
                strRW = PageLevelObject.Left.PageRW[BaseObject.NowLevel];
                break;
            case "R":
                strRW = PageLevelObject.Right.PageRW[BaseObject.NowLevel];
                break;
            case "T":
                strRW = PageLevelObject.Top.PageRW[BaseObject.NowLevel];
                break;
        }

        if (strRW == "R") {
            that.find("[data-role*=best]:not([PageRW=false])").each(function () {
                $(this).attr("data-readonly_status", true);
            })
        }

    },

    //將目標區域內的Control,根據isReadonly來設定是否唯讀
    SetReadonly: function (isReadonly) {
        var that = $(this);

        isReadonly = isReadonly || true;
        //is_target = true ;
        $.each(that.find("[data-role*=best]:not([AreaRW=false])"), function () {
            var objControl = SelectControlObject.SelectControl($(this));
            if (objControl !== undefined) {
                if (objControl.options.is_target === true) {
                    objControl.Breadonly(true)
                }
            }
        });

        $.each(that.find("[data-role*=best]:not([readonly=true],[readonly=readonly],[disabled],[AreaRW=false])"), function () {

            var control = SelectControlObject.SelectControl($(this)),
                id = $(this).attr("id");

            if (control != null) {
                //執行readonly method
                //control.readonly(isReadonly);

                //唯讀時,要把span的*拿掉
                if (isReadonly) {
                    that.find("span[for=" + id + "]").children("span").remove();
                }
            }

        });

    },

    //將目標區域內的Control,根據isRequire來設定是否必填
    SetRequire: function (isRequire) {
        var that = $(this);

        isRequire = isRequire || true;
        $.each(that.find("[data-role*=best]:not([AreaRQ=false],[data-role=bestvalidatebutton],[data-role=bestbutton])"), function () {
            var objControl = SelectControlObject.SelectControl($(this));
            if (objControl !== undefined) {
                //要為目標物且不唯獨
                if (objControl.options.is_target === true && !objControl._chkReadOnlyStatus()) {
                    objControl.BsetOptions({ required_status: true });
                }
            }
        });
    },

    //將目標區域內的Span,根據ControlObject所指定的Control的必填狀態來設定是否加上必填星號
    SetAreaRequireMark: function (isRequire) {
        var that = $(this);

        isRequire = isRequire || true;

        $.each(that, function () {
            if (that[0].tagName === "SPAN") {
                SetRequireMark(isRequire, this);
            } else if (that[0].tagName === "DIV") {
                $.each(that.find("span"), function () {
                    SetRequireMark(isRequire, this);
                });
            }
        })
    },

    //自動bind其中的kendo物件
    AutoBindControl: function (obj) {
        var that = $(this);
        that.find("[data-role*=best][hasbind!=true]").each(function () {
            kendo.bind($(this));
            $(this).HasBind();
        });


    },

    //自動Bind屬性
    AutoBindAttribute: function (obj) {
        var that = $(this);

        that.find("[data-role*=best]").each(function () {
            if (obj.is_escape_confirm != null) {
                $(this).attr("data-is_escape_confirm", obj.is_escape_confirm);
            }
        })
    },

    BestBreadcrumb: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestBreadcrumb(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestBreadcrumb");

    },

    BestNumericTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestNumericTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestNumericTextBox");

    },

    BestMaskedTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestMaskedTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestMaskedTextBox");

    },

    BestAutoComplete: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestAutoComplete(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestAutoComplete");

    },

    BestTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTextBox");

    },

    BestIntervalTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestIntervalTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestIntervalTextBox");
    },

    BestPhoneTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestPhoneTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestPhoneTextBox");
    },

    BestQuickButton: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestQuickButton(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestQuickButton");
    },

    BestWindow: function (obj) {

        //累加開啟視窗數目
        BaseObject.OpenWindowCount += 1;

        var id = BaseObject.OpenWindowID + BaseObject.OpenWindowCount || "OpenWindow" + BaseObject.OpenWindowCount,
            div = "<div id='" + id + "'></div>",
            element;

        $(document.body).append(div);

        element = $("#" + id);

        //設定options
        if (obj != null) {
            element.kendoBestWindow(obj);
        }

        //回傳物件
        return element.data("kendoBestWindow");

    },

    BestDatePicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDatePicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDatePicker");
    },

    BestDateTimePicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDateTimePicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDateTimePicker");
    },

    BestYearPicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestYearPicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestYearPicker");
    },

    BestMonthYearPicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestMonthYearPicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestMonthYearPicker");
    },

    BestTimePicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTimePicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTimePicker");
    },

    BestIntervalDatePicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestIntervalDatePicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestIntervalDatePicker");
    },

    BestIntervalYearPicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestIntervalYearPicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestIntervalYearPicker");
    },

    BestIntervalMonthYearPicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestIntervalMonthYearPicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestIntervalMonthYearPicker");
    },

    BestIntervalTimePicker: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestIntervalTimePicker(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestIntervalTimePicker");
    },

    BestDataGrid: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDataGrid(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDataGrid");
    },

    BestBatchDataGrid: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestBatchDataGrid(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestBatchDataGrid");
    },
    BestTextBoxPopUp: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTextBoxPopUp(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTextBoxPopUp");
    },

    BestPairTextBoxPopUp: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestPairTextBoxPopUp(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestPairTextBoxPopUp");
    },

    BestCurrencyTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestCurrencyTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestCurrencyTextBox");
    },

    BestCityDistrictZIP: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestCityDistrictZIP(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestCityDistrictZIP");
    },

    BestButton: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestButton(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestButton");
    },

    BestValidateButton: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestValidateButton(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestValidateButton");
    },

    BestGroupAggregateDataGrid: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestGroupAggregateDataGrid(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestGroupAggregateDataGrid");
    },

    BestMultiHeaderDataGrid: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestMultiHeaderDataGrid(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestMultiHeaderDataGrid");
    },

    BestCheckBoxList: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestCheckBoxList(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestCheckBoxList");
    },

    BestRadioButtonList: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestRadioButtonList(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestRadioButtonList");
    },

    BestDropDownList: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDropDownList(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDropDownList");
    },

    BestDualDropDownList: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDualDropDownList(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDualDropDownList");
    },

    BestTripleDropDownList: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTripleDropDownList(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTripleDropDownList");
    },

    BestComboBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestComboBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestComboBox");
    },

    BestDualComboBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDualComboBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDualComboBox");
    },

    BestTripleComboBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTripleComboBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTripleComboBox");
    },

    BestTextAreaComboBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTextAreaComboBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTextAreaComboBox");
    },

    BestLandSiteText: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestLandSiteText(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestLandSiteText");
    },

    BestGoTop: function (obj) {

        this.kendoBestGoTop(obj);

        //回傳物件
        return this.data("kendoBestGoTop");
    },

    BestGoBack: function (obj) {

        this.kendoBestGoBack(obj);

        //回傳物件
        return this.data("kendoBestGoBack");
    },

    BestQuickBookmark: function (obj) {

        this.kendoBestQuickBookmark(obj);

        //回傳物件
        return this.data("kendoBestQuickBookmark");
    },

    BestIdTextBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestIdTextBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestIdTextBox");
    },

    BestBanner: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestBanner(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestBanner");
    },

    BestMenu: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestMenu(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestMenu");
    },

    BestAddressBoxSimple: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestAddressBoxSimple(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestAddressBoxSimple");
    },

    BestAddressBoxFull: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestAddressBoxFull(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestAddressBoxFull");
    },

    BestTextAreaBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTextAreaBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTextAreaBox");
    },

    BestFileUpload: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestFileUpload(obj);
            this.HasBind();
        }

        //回傳物件 Upload物件在Select後會發生kendoBestFileUpload找不到，目前先取kendoUpload
        if (this.data("kendoBestFileUpload") === undefined) {
            return this.data("kendoUpload")
        }
        return this.data("kendoBestFileUpload");
    },

    BestRadioDropDownList: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestRadioDropDownList(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestRadioDropDownList");
    },

    BestMultiSelect: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestMultiSelect(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestMultiSelect");
    },

    BestListBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestListBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestListBox");
    },

    BestDualListBox: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestDualListBox(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestDualListBox");
    },

    BestPanelBar: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestPanelBar(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestPanelBar");
    },

    BestPanelBarForFuncMenu: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestPanelBarForFuncMenu(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestPanelBarForFuncMenu");
    },

    BestTabStrip: function (obj) {

        //判斷是否有HasBind屬性,若有,則不再bind;反之,則需自動bind
        if (!this.CheckBindControl()) {
            this.kendoBestTabStrip(obj);
            this.HasBind();
        }

        //回傳物件
        return this.data("kendoBestTabStrip");
    },

    //判斷物件是否已bind
    CheckBindControl: function () {
        if (!this.attr("hasbind")) {
            return false;
        } else {
            return true;
        }
    },

    //物件attr屬性hasbind
    HasBind: function () {
        var that = this;
        that.attr("hasbind", true);

        that.find("[data-role*=best]").each(function () {
            $(this).attr("hasbind", true);
        });
    }
});

//將SPAN加上必填星號Class
function SetRequireMark(isRequire, that) {
    //取得該Span所指的Control
    var objControl = SelectControlObject.SelectControl($("#" + $(that).attr("ControlTarget")));
    //該Control為必填且不唯獨則加上必填星號
    if (objControl._chkRequiredStatus() && !objControl._chkReadOnlyStatus()) {
        if (isRequire) {
            $(that).addClass("requiredMark");
        } else {
            $(that).removeClass("requiredMark");
        }
    }
};