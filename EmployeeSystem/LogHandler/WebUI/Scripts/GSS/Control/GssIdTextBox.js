/// <reference path="../Data/ControlDefaultsObject.js" />

/**
 * @class BestIdTextBox
 */

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
         widget = ui.Widget,
         ns = ".kendoIdTextBox",
         className = "kendoIdTextBox",
         proxy = $.proxy;

    var GSSIdTextBox = widget.extend({

        //init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            widget.fn.init.call(that, element, options);

            //Template
            that._procTemplate();

            if (that.options.is_escape_confirm) {
                that.element.on("change", proxy(that._change, that));
            }

        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestIdTextBox
             * @MemberOf BestIdTextBox
             */
            name: "BestIdTextBox",

            //DropDownList設定
            /**
             * @property {string} text_field TextField欄位名稱
             * @default text
             * @MemberOf BestIdTextBox
             */
            text_field: ControlDefaultsObject.IdTextBox.text_field || "text",

            /**
             * @property {string} value_field ValueField欄位名稱
             * @default value
             * @MemberOf BestIdTextBox
             */
            value_field: ControlDefaultsObject.IdTextBox.value_field || "value",

            /**
             * @property {object} ddlDataSource DropDownList資料物件
             * @default null
             * @MemberOf BestIdTextBox
             */
            ddlDataSource: null,

            //PairTextBoxPopUp設定
            /**
             * @property {string} first_suffix First TextBox的後綴詞
             * @default null
             * @MemberOf BestIdTextBox
             */
            first_suffix: ControlDefaultsObject.IdTextBox.first_suffix || null,

            /**
            * @property {string} second_suffix Second TextBox的後綴詞
            * @default null
            * @MemberOf BestIdTextBox
            */
            second_suffix: ControlDefaultsObject.IdTextBox.second_suffix || null,

            /**
             * @property {string} first_mode First TextBox的資料模式
             * @default AlphaNumeric
             * @MemberOf BestIdTextBox
             */
            first_mode: ControlDefaultsObject.IdTextBox.first_mode || "AlphaNumeric",

            /**
             * @property {string} second_mode Second TextBox的資料模式
             * @default None
             * @MemberOf BestIdTextBox
             */
            second_mode: ControlDefaultsObject.IdTextBox.second_mode || "None",

            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default null
             * @MemberOf BestIdTextBox
             */
            placeholder: ControlDefaultsObject.IdTextBox.placeholder || null,

            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestIdTextBox
             */
            special_character: ControlDefaultsObject.IdTextBox.special_character || true,

            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestIdTextBox
             */
            allow_special_character: ControlDefaultsObject.IdTextBox.allow_special_character || "",

            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestIdTextBox
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.IdTextBox.case_format || "None",

            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestIdTextBox
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.IdTextBox.half_full_width || "None",

            /**
             * @property {string} ptbDataSource PairTextBox的資料物件
             * @default null
             * @MemberOf BestIdTextBox
             */
            ptbDataSource: null,

            /**
             * @property {boolean} is_window_enabled 放大鏡是否要呈現
             * @default true
             * @MemberOf BestIdTextBox
             */
            is_window_enabled: ControlDefaultsObject.IdTextBox.is_window_enabled || true,

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestIdTextBox
             * @desc Y:控制項皆為必填<br/>
                     1:DropDownList必填,PairTextBox非必填<br/>
                     2:DropDownList非必填,PairTextBox必填<br/>
                     3:擇一必填<br/>
                     4:成對填或成對不填<br/>
                     N:控制項皆非必填
             */
            required_mode: ControlDefaultsObject.IdTextBox.required_mode || "N",

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestIdTextBox
             * @desc Y:控制項皆唯讀<br/>
                     1:DropDownList唯讀,PairTextBoxPopup非唯讀<br/>
                     N:控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.IdTextBox.readonly_mode || "N",

            /**
             * @property {boolean} is_dropdownlist_enabled DropDownList是否啟用
             * @default true
             * @MemberOf BestIdTextBox
             */
            is_dropdownlist_enabled: ControlDefaultsObject.IdTextBox.is_dropdownlist_enabled || true,

            /**
             * @property {boolean} is_id_check_enabled 身份是否檢核功能是否啟用
             * @default true
             * @MemberOf BestIdTextBox
             */
            is_id_check_enabled: ControlDefaultsObject.IdTextBox.is_id_check_enabled || true,

            /**
             * @property {boolean} is_id_initial_checked 身份是否檢核功能是否預設勾選
             * @default true
             * @MemberOf BestIdTextBox
             */
            is_id_initial_checked: ControlDefaultsObject.IdTextBox.is_id_initial_checked || true,

            /**
             * @property {string} allow_cust_kind 設定身份檢核方式
             * @default string.empty
             * @MemberOf BestIdTextBox
             * @desc 當is_dropdownlist_enabled為false時,此屬性方可啟用。若需同時檢核多種方式,請使用逗號分隔;EX:DP,FP<br/>檢核方式,如下:<br/>DP:本國個人<br/>DB:本國法人<br/>FP:外國個人<br/>FB:外國法人
             */
            allow_cust_kind: ControlDefaultsObject.IdTextBox.allow_cust_kind || "",

            /**
             * @property {boolean} is_query_data 第二個TextBox是否根據第一個TextBox的值進行查詢
             * @default true
             * @MemberOf BestIdTextBox
             */
            is_query_data: ControlDefaultsObject.IdTextBox.is_query_data || true,

            /**
             * @property {string} window_url 另開視窗的網址
             * @default null
             * @MemberOf BestIdTextBox
             */
            window_url: ControlDefaultsObject.IdTextBox.window_url || "",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestIdTextBox
             */
            is_escape_confirm: ControlDefaultsObject.IdTextBox.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestIdTextBox
             */
            is_change: ControlDefaultsObject.IdTextBox.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestIdTextBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestIdTextBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestIdTextBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestIdTextBox
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestIdTextBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值 DropDownList Text
         * @MemberOf BestIdTextBox
         * @method SelectedText
         * @return {string} 取得DropDownList Text
         * @example
         * 取值:element.BestIdTextBox().SelectedText();
         * 設值:element.BestIdTextBox().SelectedText(setValue);
         */
        SelectedText: function (setValue) {
            var that = this, objDropDownList = that.DropDownList.data("kendoBestDropDownList");
            return objDropDownList.Btext();
        },

        /**
         * @desc 設/取值 DropDownList Value
         * @MemberOf BestIdTextBox
         * @method SelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得DropDownList Value
         * @example
         * 取值:element.BestIdTextBox().SelectedValue();
         * 設值:element.BestIdTextBox().SelectedValue(setValue);
         */
        SelectedValue: function (setValue) {
            var that = this, objDropDownList = that.DropDownList.data("kendoBestDropDownList");

            if (setValue == null) {
                return objDropDownList.Bvalue();
            }

            if (setValue != null) {
                objDropDownList.Bvalue(setValue);
            }
        },

        /**
         * @desc 設/取值 First TextBox Value
         * @MemberOf BestIdTextBox
         * @method FirstValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 First TextBox Value
         * @example
         * 取值:element.BestIdTextBox().FirstValue();
         * 設值:element.BestIdTextBox().FirstValue(setValue);
         */
        FirstValue: function (setValue) {
            var that = this, objPairTextBoxPopUp = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp");

            //取值
            if (setValue == null) {
                return objPairTextBoxPopUp.firstValue();
            }

            //設值
            if (setValue != null) {
                objPairTextBoxPopUp.firstValue(setValue);
            }

        },

        /**
         * @desc 設/取值 Second TextBox Value
         * @MemberOf BestIdTextBox
         * @method SecondValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 Second TextBox Value
         * @example
         * 取值:element.BestIdTextBox().SecondValue();
         * 設值:element.BestIdTextBox().SecondValue(setValue);
         */
        SecondValue: function (setValue) {
            var that = this, objPairTextBoxPopUp = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp");

            //取值
            if (setValue == null) {
                return objPairTextBoxPopUp.secondValue();
            }

            //設值
            if (setValue != null) {
                objPairTextBoxPopUp.secondValue(setValue);
            }

        },

        /**
        * @desc 唯讀處理
        * @memberof BestIdTextBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestIdTextBox().Breadonly();
        * 取消唯讀:element.BestIdTextBox().Breadonly(false);
        */
        Breadonly: function (readonly) {

            var that = this
                , isReadonly = readonly === undefined ? true : readonly;

            if (isReadonly) {
                that._procReadonlyMode("Y");
            }
            else {
                that._procReadonlyMode();
            }

            //設定控制項唯讀狀態
            that.options.readonly_status = isReadonly;

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestIdTextBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 唯讀: element.Brequired();
         * 唯讀: element.Brequired(true);
         * 不唯讀: element.Brequired(false);
         */
        Brequired: function (required) {

            var that = this
                , isRequired = required === undefined ? true : required;

            if (!isRequired) {
                //非必填狀態, 則要依據required_mode回到初始狀態
                if (that.options.required_mode.toString() != "N") isRequired = true;
            }

            //設定控制項必填狀態
            that.options.required_status = isRequired;

            //同步子項目
            that._procRequiredMode();

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestIdTextBox
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            //取得data-role含有best且不唯讀的control
            that.element.find("[data-role*=best]").each(function () {

                var that = $(this);

                //依據不同的data-role產生不同的控制項
                var objControl = SelectControlObject.SelectControl(that);

                if (objControl == null) return;    //控制項不存在, 換下一個

                //判斷唯讀狀態
                if (!objControl._chkReadOnlyStatus()) {
                    objControl.focus();
                    return false;
                }

            });

        },

        /**
         * @desc 設定控制項的options
         * @memberof BestIdTextBox
         * @method BsetOptions
         * @example
         * 設定options: element.BsetOptions({ readonly_mode: "2" });
         */
        BsetOptions: function (options) {

            var that = this;

            widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設定控制項是否鎖定
         * @memberof BestIdTextBox
         * @method Block
         * @param {bool} lock 是否鎖定
         * @example
         * 鎖定: element.Block();
         * 鎖定: element.Block(true);
         * 不鎖定: element.Block(false);
         */
        Block: function (lock) {

            var that = this,
                isLock = lock === undefined ? true : lock,
                objDDL = that.DropDownList.data("kendoBestDropDownList"),
                objPairTXT = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp");

            if (isLock) {
                that.DropDownList.parent().find(".k-icon").addClass("k-loading");
                objDDL.Breadonly();
                objPairTXT.Block();
            }
            else {
                that.DropDownList.parent().find(".k-icon").removeClass("k-loading");
                objDDL.Breadonly(false);
                objPairTXT.Block(false);
            }

        },

        _blur: function () {
            if (this._chkRequired()) {

                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(this.element.attr("id"));
                }

            }
        },

        //change事件
        _change: function () {
            this.options.is_change = true;
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.SelectedValue().length > 0 || that.FirstValue().length > 0 || that.SecondValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this,
                isKeyInVal = false,
                objDDL = that.DropDownList.data("kendoBestDropDownList"),
                objPairTXT = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp");

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":   //First & Second皆必填

                    if (that.options.is_dropdownlist_enabled) {

                        if (!objDDL._chkReadOnlyStatus() && that.SelectedValue().length > 0) {
                            isKeyInVal = true;
                        }

                    }

                    isKeyInVal = objPairTXT._chkRequired() && isKeyInVal;

                    break;

                case "1":   //First 必填 Second非必填

                    if (that.options.is_dropdownlist_enabled) {

                        if (!objDDL._chkReadOnlyStatus() && that.SelectedValue().length == 0) {
                            isKeyInVal = false;
                        }

                    }
                    else {
                        isKeyInVal = true;
                    }

                    break;

                case "2":   //First 非必填 Second必填

                    isKeyInVal = objPairTXT._chkRequired();

                    break;

                case "3":   //First Second 擇一填

                    if (that.options.is_dropdownlist_enabled) {

                        if (!objDDL._chkReadOnlyStatus() && that.SelectedValue().length > 0) {
                            isKeyInVal = true;
                        }

                    }

                    if (!isKeyInVal) {
                        isKeyInVal = objPairTXT._chkRequired();
                    }

                    break;

                case "4":   //First Second 成對填,要填都要填;反之,都不填

                    if (that.options.is_dropdownlist_enabled) {

                        if (objPairTXT._chkRequired()) {

                            if ((that.FirstValue().length > 0 && that.SelectedValue().length > 0)
                                || (that.FirstValue().length == 0 && that.SelectedValue().length == 0)) {
                                isKeyInVal = true;
                            }
                            else {
                                isKeyInVal = false;
                            }

                        }
                        else {
                                isKeyInVal = false;
                        }

                    }
                    else {
                        isKeyInVal = objPairTXT._chkRequired();
                    }

                    break;

                case "N":   //First & Second皆非必填
                    return true;
                    break;
            }

            return isKeyInVal;

        },

        //檢查控制項目前必填狀態, 回傳:true必填, false非必填
        _chkRequiredStatus: function () {

            var that = this
                , isRequired = that.options.required_status;

            if (!isRequired) {
                //當非必填狀態下, 需要額外判斷必填模式
                if (that.options.required_mode != "N") isRequired = true;
            }

            return isRequired;

        },

        //檢查控制項目前唯讀狀態, 回傳:true唯讀, false非唯讀
        _chkReadOnlyStatus: function () {

            var that = this
                , isReadOnly = that.options.readonly_status;

            if (!isReadOnly) {
                //當非唯讀狀態下, 需要額外判斷唯讀模式
                if (that.options.readonly_mode == "Y") isReadOnly = true;
            }

            return isReadOnly;

        },

        //blur事件  是否有勾選檢核
        _checkIsChecked: function () {

            var that = this,
            objCheckBox = that.CheckBox.find("input");

            //當 "是否檢核" 的checkbox 有勾選的情況下
            if (objCheckBox.prop("checked")) {

                if (that.FirstValue().trim().length != 0) { //textbox不是空的情況下
                    that._isMultipleOrSingle();
                }

            }

        },

        //FirstTextBox 需做哪幾種驗證
        //is_dropdownlist_enabled false的情況下，依照allow_cust_kind所設定的值做規則檢核
        //is_dropdownlist_enabled true的情況下，依照dropdownlist所設定的值做規則檢核
        _isMultipleOrSingle: function () {
            var that = this,
            objPairTextBoxPopUp = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp"),
            ptbFirstvalue = that.FirstValue(), //first textbox的值
            ddlSelectedValue = that.SelectedValue(), //dropdownlist 所選的value
            isValid;

            if (that.options.is_dropdownlist_enabled.toString().toLowerCase() == "false") { //未出現dropdownlist，多選的情況

                if (that.options.allow_cust_kind.trim().length == 0) {
                    //allow_cust_kind 預設空白，表示套用所有規則檢核
                    that.options.allow_cust_kind = "DP,DB,FP,FB";
                }

                var kindArray = that.options.allow_cust_kind.split(",");
                var countIsNotVaild = 0;

                for (var i = 0 ; i < kindArray.length; i++) {

                    isValid = that._checkIDValid(ptbFirstvalue, kindArray[i]);

                    if (isValid != false) break; //當符合其中一種驗證跳出
                    countIsNotVaild += 1;
                }

                if (countIsNotVaild == kindArray.length) {
                    alert("ID不符合驗證格式");
                    that.FirstValue("");
                    objPairTextBoxPopUp.focus();
                }

            }
            else { //出現dropdownlist，單選的情況

                isValid = that._checkIDValid(ptbFirstvalue, ddlSelectedValue);

                if (isValid == false) {
                    alert("ID不符合驗證格式");
                    that.FirstValue("");
                    objPairTextBoxPopUp.focus();
                }

            }

        },

        //依傳入的各戶類型，判斷須用何種驗證方式
        //firstvalue (first textbox的值) ; selectedValue (dropdownlist 所選的value)
        _checkIDValid: function (firstvalue, selectedValue) {
            var that = this,
            objDropDownList = that.DropDownList.data("kendoBestDropDownList"),
            isValid;

            switch (selectedValue) {
                case "DP"://身分證
                    isValid = that._validateDomesticPerson(firstvalue);
                    break;
                case "DB"://統編
                    isValid = that._validateDomesticBusiness(firstvalue);
                    break;
                case "FP"://統一證號
                    isValid = that._validateForeignPerson(firstvalue);
                    break;
                case "FB"://OBU境外統編編碼原則
                    isValid = that._validateForeignBusiness(firstvalue);
                    break;
                default:
                    alert("客戶類型錯誤");
                    objDropDownList.focus();
            }

            return isValid;
        },

        //DP 國內個人 ID驗證
        _validateDomesticPerson: function (id) {
            var sum = 0,
                getFirstCharId = id.toUpperCase().charAt(0),
                firstLetterString = "ABCDEFGHJKLMNPQRSTUVXYWZIO",
                letterValue = firstLetterString.indexOf(getFirstCharId) + 10;

            if (id.length != 10) {
                return false;
            } else if (letterValue == 9) {
                return false;
            } else {

                sum = Math.floor(letterValue / 10) + (letterValue % 10 * 9);

                for (var i = 1; i < 9; i++) {
                    sum += id.charAt(i) * (9 - i);
                }

                sum += parseInt(id.charAt(9));

                if (sum % 10 != 0) {
                    return false;
                }

            }
        },

        //DB 國內法人 ID驗證
        _validateDomesticBusiness: function (id) {
            var sum = 0,
                temp = 0,
                ruleNum = new Array(1, 2, 1, 2, 1, 2, 4, 1);

            if (id.length != 8) {
                return false;
            } else {

                for (var i = 0; i < ruleNum.length ; i++) {
                    temp = id.charAt(i) * ruleNum[i];
                    sum += Math.floor(temp / 10) + temp % 10;
                }

                if (!(sum % 10 == 0 || (sum % 10 == 9 && id.charAt(6) == 7))) {
                    return false;
                }
            }
        },

        //FP 國外個人 ID驗證
        _validateForeignPerson: function (id) {
            var sum = 0,
                getFirstCharId = id.toUpperCase().charAt(0),
                getSecondCharId = id.toUpperCase().charAt(1),
                letterString = "ABCDEFGHJKLMNPQRSTUVXYWZIO",
                firstLetterValue = letterString.indexOf(getFirstCharId) + 10,
                secondLetterValue = letterString.indexOf(getSecondCharId) + 10;


            if (id.length != 10) {
                return false;
            } else if ((firstLetterValue == 9) || (secondLetterValue == 9)) {
                return false;
            } else {

                sum = Math.floor(firstLetterValue / 10) + (firstLetterValue % 10 * 9);
                sum += secondLetterValue % 10 * 8;

                for (var i = 1; i < 8; i++) {
                    sum += id.charAt(i + 1) * (8 - i);
                }

                sum += parseInt(id.charAt(9));

                if (sum % 10 != 0) {
                    return false;
                }
            }
        },

        //FB 國外法人 ID驗證
        _validateForeignBusiness: function (id) {
            var sum = 0, i = 0, temp = 0,
                weights, strBan, strValue;

            weights = new Array(1, 2, 1, 2, 1, 2, 4, 1);
            strBan = id.toUpperCase();
            for (i = 0 ; i < 4; i++) {
                strValue = strBan.substr(i, 1);
                if (strValue < "A" || strValue > "Z") {
                    return false;
                }
            }
            for (i = 4 ; i < 8; i++) {
                strValue = strBan.substr(i, 1);
                if (strValue < "0" || strValue > "9") {
                    return false;
                }
            }

            for (i = 0 ; i < 8 ; i++) {
                temp = weights[i] * ((strBan.charCodeAt(i) - 48) % 10)
                sum = sum + temp % 10
                temp = Math.floor(temp / 10)
                sum = sum + temp
            }

            sum = sum % 10
            if (sum == 9 && strBan.substr(6, 1) == "7") {
                return true;
            }

            if (sum == 0) return true;
            else return false;
        },

        //處理ReadonlyMode
        _procReadonlyMode: function (readonlyMode) {

            var that = this,
                strReadonlyMode = readonlyMode === undefined ? that.options.readonly_mode.toString() : readonlyMode,
                dropDownListReadOnlyMode = "",
                textBoxReadOnlyMode = "",
                objDDL = that.DropDownList.data("kendoBestDropDownList"),
                objPairTXT = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp");

            switch (strReadonlyMode) {

                case "Y":   //Both Readonly
                    dropDownListReadOnlyMode = "Y";
                    textBoxReadOnlyMode = "Y";
                    break;
                case "1":   //DDL Readonly TXT Not Readonly
                    dropDownListReadOnlyMode = "Y";
                    textBoxReadOnlyMode = "N";
                    break;
                case "N":   //Both Not Readonly
                    dropDownListReadOnlyMode = "N";
                    textBoxReadOnlyMode = "N";
                    break;

            }

            //設定DropDownList的唯讀
            objDDL.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            if (dropDownListReadOnlyMode == "Y") {
                objDDL.Breadonly();
            }
            else {
                objDDL.Breadonly(false);
            }

            //設定PairTextBox的唯讀
            objPairTXT.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objPairTXT.Breadonly();
            }
            else {
                objPairTXT.Breadonly(false);
            }

            //設定CheckBox的唯讀
            if (textBoxReadOnlyMode == "Y") {
                that.CheckBox.hide();
            }
            else {
                that.CheckBox.show();
            }

        },

        //處理RequiredMode
        _procRequiredMode: function () {

            var that = this,
                objPairTXT = that.PairTextBoxPopUp.data("kendoBestPairTextBoxPopUp");

            objPairTXT.BsetOptions({
                required_mode: that.options.required_mode
            });

        },

        //Template
        _procTemplate: function () {

            var that = this,
                inputTemplate = "<input />",
                divTemplate = "<div class='inner' />",
                inputCheckBoxTemplate = "<span><input type='checkbox'>&nbsp;是否檢核</span>";

            //Step1: 新增 PairTextBoxPopUp
            that.PairTextBoxPopUp = $(divTemplate);
            that.element.append(that.PairTextBoxPopUp);

            that.PairTextBoxPopUp.kendoBestPairTextBoxPopUp({
                dataSource: that.options.ptbDataSource,
                is_query_data: that.options.is_query_data,
                placeholder: that.options.placeholder,
                special_character: that.options.special_character,
                allow_special_character: that.options.allow_special_character,
                case_format: that.options.case_format,
                half_full_width: that.options.half_full_width,
                first_suffix: that.options.first_suffix,
                first_mode: that.options.first_mode,
                second_suffix: that.options.second_suffix,
                second_mode: that.options.second_mode,
                window_url: that.options.window_url,
                is_window_enabled: that.options.is_window_enabled,
                required_mode: that.options.required_mode,
                readonly_mode: that.options.readonly_mode,
                is_target: false
            });

            //Step2: 新增 DropDownList
            that.DropDownList = $(inputTemplate);
            that.PairTextBoxPopUp.prepend(that.DropDownList);

            that.DropDownList.kendoBestDropDownList({
                dataSource: that.options.ddlDataSource,
                text_field: that.options.text_field,
                value_field: that.options.value_field,
                is_target: false
            });

            //控制DropDownList是否顯示
            if (that.options.is_dropdownlist_enabled) {
                that.DropDownList.parent().show();
            }
            else {
                that.DropDownList.parent().hide();
            }

            //Step3: 新增是否檢核
            that.CheckBox = $(inputCheckBoxTemplate);
            that.PairTextBoxPopUp.append(that.CheckBox);

            //依據唯讀模式調整控制項
            that._procReadonlyMode();

            //控制checkbox是否顯示
            if (that.options.is_id_check_enabled) {

                that.CheckBox.show();

                if (that.options.is_id_initial_checked) {
                    that.CheckBox.find("input").attr("checked", "checked");
                }

                //註冊檢測ID事件
                that.PairTextBoxPopUp.on("change.CheckID", proxy(that._checkIsChecked, that));

            }
            else {
                that.CheckBox.hide();
            }

            //初始就唯讀情況(受整頁唯讀控管)
            if (that.options.readonly_status) {
                that.Breadonly(true);
            }

            //設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算有必填存在的狀態)
            if (that.options.required_mode != "N") {
                that.options.required_status = true;
            }

        }
    });

    ui.plugin(GSSIdTextBox);

})($);