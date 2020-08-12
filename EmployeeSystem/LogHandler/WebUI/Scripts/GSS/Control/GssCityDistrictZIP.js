/**
 * @class BestCityDistrictZIP
 */

/// <reference path="../Data/ControlDefaultsObject.js" />
(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         ns = ".kendoCityDistrictZIP",
         className = "kendoCityDistrictZIP",
         proxy = $.proxy;

    var GSSCityDistrictZIP = widget.extend({

        //Init事件
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

        },

        //設定options
        options: {
            /**
             * @property {string} name 物件
             * @default BestCityDistrictZIP
             * @MemberOf BestCityDistrictZIP
             */
            name: "BestCityDistrictZIP",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestCityDistrictZIP
             * @desc Y:DualDropDownList & TextBox皆必填<br/>
                     N:DualDropDownList & TextBox皆非必填
             */
            required_mode: ControlDefaultsObject.CityDistrictZIP.required_mode || "N",

            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestCityDistrictZIP
             */
            dataSource: null,

            //DualDropDownList 使用的設定
            /**
             * @property {string} first_text_field FirstField的TextField欄位名稱
             * @default citytext
             * @MemberOf BestCityDistrictZIP
             */
            first_text_field: ControlDefaultsObject.CityDistrictZIP.first_text_field || "citytext",

            /**
             * @property {string} first_value_field FirstField的ValueField欄位名稱
             * @default cityvalue
             * @MemberOf BestCityDistrictZIP
             */
            first_value_field: ControlDefaultsObject.CityDistrictZIP.first_value_field || "cityvalue",

            /**
             * @property {string} first_field_suffix FirstField的後綴詞設定
             * @default 縣市
             * @MemberOf BestCityDistrictZIP
             */
            first_field_suffix: ControlDefaultsObject.CityDistrictZIP.first_field_suffix || "縣市",

            /**
             * @property {string} second_text_field SecondField的TextField欄位名稱
             * @default districttext
             * @MemberOf BestCityDistrictZIP
             */
            second_text_field: ControlDefaultsObject.CityDistrictZIP.second_text_field || "districttext",

            /**
             * @property {string} second_value_field SecondField的ValueField欄位名稱
             * @default districtvalue
             * @MemberOf BestCityDistrictZIP
             */
            second_value_field: ControlDefaultsObject.CityDistrictZIP.second_value_field || "districtvalue",//影響textbox

            /**
             * @property {string} second_field_suffix SecondField的後綴詞設定
             * @default 鄉鎮市區
             * @MemberOf BestCityDistrictZIP
             */
            second_field_suffix: ControlDefaultsObject.CityDistrictZIP.second_field_suffix || "鄉鎮市區",

            /**
             * @property {string} cascade_from_field 連動SecondField資料的欄位名稱
             * @default null
             * @MemberOf BestCityDistrictZIP
             */
            cascade_from_field: ControlDefaultsObject.CityDistrictZIP.cascade_from_field || null,

            //TextBox 使用的設定
            /**
             * @property {string} mode 設定TextBox的文字模式
             * @default Digit
             * @MemberOf BestCityDistrictZIP
             */
            mode: ControlDefaultsObject.CityDistrictZIP.mode || "Digit",

            /**
             * @property {string} third_suffix 設定TextBox的後綴詞
             * @default null
             * @MemberOf BestCityDistrictZIP
             */
            third_suffix: ControlDefaultsObject.CityDistrictZIP.third_suffix || null,

            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default null
             * @MemberOf BestCityDistrictZIP
             */
            placeholder: ControlDefaultsObject.CityDistrictZIP.placeholder || null,

            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestCityDistrictZIP
             */
            special_character: ControlDefaultsObject.CityDistrictZIP.special_character || true,

            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestCityDistrictZIP
             * @desc 當special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            allow_special_character: ControlDefaultsObject.CityDistrictZIP.allow_special_character || "",

            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestCityDistrictZIP
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.CityDistrictZIP.case_format || "None",

            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestCityDistrictZIP
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.CityDistrictZIP.half_full_width || "None",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestCityDistrictZIP
             */
            is_escape_confirm: ControlDefaultsObject.CityDistrictZIP.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestCityDistrictZIP
             */
            is_change: ControlDefaultsObject.CityDistrictZIP.is_change || false,

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestCityDistrictZIP
             * @desc Y:所有控制項皆唯讀<br/>
                     1:DualDropDownList唯讀,TextBox非唯讀<br/>
                     2:DualDropDownList非唯讀,TextBox唯讀<br/>
                     N:所有控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.CityDistrictZIP.readonly_mode || "N",

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestCityDistrictZIP
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestCityDistrictZIP
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestCityDistrictZIP
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestCityDistrictZIP
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestCityDistrictZIP
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值 First DropDownList Text
         * @memberof BestCityDistrictZIP
         * @method firstSelectedText
         * @return {string} 取得First DropDownList Text
         * @example
         * 取值:element.BestCityDistrictZIP().firstSelectedText();
         * 設值:element.BestCityDistrictZIP().firstSelectedText(setValue);
         */
        firstSelectedText: function () {
            var that = this,
                objDDL = that.element.data("kendoBestDualDropDownList");

            return objDDL.FirstSelectedText();
        },

        /**
         * @desc 設/取值 First DropDownList Value
         * @memberof BestCityDistrictZIP
         * @method firstSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得First DropDownList Value
         * @example
         * 取值:element.BestCityDistrictZIP().firstSelectedValue();
         * 設值:element.BestCityDistrictZIP().firstSelectedValue(setValue);
         */
        firstSelectedValue: function (setValue) {
            var that = this,
                objDDL = that.element.data("kendoBestDualDropDownList");

            if (setValue == null) {
                return objDDL.FirstSelectedValue();
            }

            if (setValue != null) {
                objDDL.FirstSelectedValue(setValue);
            }
        },

        /**
         * @desc 取值 Second DropDownList Text
         * @memberof BestCityDistrictZIP
         * @method secondSelectedText
         * @return {string} 取得Second DropDownList Text
         * @example
         * 取值:element.BestCityDistrictZIP().secondSelectedText();
         * 設值:element.BestCityDistrictZIP().secondSelectedText(setValue);
         */
        secondSelectedText: function () {
            var that = this,
                 objDDL = that.element.data("kendoBestDualDropDownList");

            return objDDL.LastSelectedText();
        },

        /**
         * @desc 設/取值 Second DropDownList Value
         * @memberof BestCityDistrictZIP
         * @method secondSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Second DropDownList Value
         * @example
         * 取值:element.BestCityDistrictZIP().secondSelectedValue();
         * 設值:element.BestCityDistrictZIP().secondSelectedValue(setValue);
         */
        secondSelectedValue: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestDualDropDownList");

            if (setValue == null) {
                return objDDL.LastSelectedValue();
            }

            if (setValue != null) {
                objDDL.LastSelectedValue(setValue);
            }

            that._changeSecondDDL();

        },

        /**
         * @desc 設/取值 TextBox
         * @memberof BestCityDistrictZIP
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestCityDistrictZIP().Bvalue();
         * 設值:element.BestCityDistrictZIP().Bvalue(setValue);
         */
        Bvalue: function (setValue) {
            var that = this, objTxt = that.TextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt.Bvalue(setValue);
            }

        },

        /**
         * @desc 唯讀處理
         * @memberof BestCityDistrictZIP
         * @method Breadonly
         * @param {boolean} readonly 設定值(可不傳)
         * @example
         * 唯讀:element.BestCityDistrictZIP().Breadonly();
         * 取消唯讀:element.BestCityDistrictZIP().Breadonly(false);
         */
        Breadonly: function (readonly) {

            var that = this,
                isReadonly = readonly === undefined ? true : readonly;

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
         * @memberof BestCityDistrictZIP
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

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestCityDistrictZIP
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
         * @memberof BestCityDistrictZIP
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
         * @memberof BestCityDistrictZIP
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
                loadingIcon = '<span class="k-icon k-loading b-lock" style="margin-left: -20px; margin-right: 5px; height: 16px; margin-top: 0px;"></span>',
                objDDL = that.element.data("kendoBestDualDropDownList"),
                objTXT = that.TextBox.data("kendoBestTextBox");

            if (isLock) {
                that.element.find(".k-icon").addClass("k-loading");
                objDDL.Breadonly();
                objTXT.Breadonly();
                that.TextBox.after(loadingIcon);
            }
            else {
                that.element.find(".k-icon").removeClass("k-loading");
                objDDL.Breadonly(false);
                objTXT.Breadonly(false);
                that.element.find(".b-lock").remove();
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

            if (that.firstSelectedValue().length > 0 || that.secondSelectedValue().length > 0 || that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this,
                objDDL = that.element.data("kendoBestDualDropDownList"),
                objTXT = that.TextBox.data("kendoBestTextBox"),
                isKeyInVal = false;

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {
                case "Y":   //DualDropDownList & NumericTextBox皆必填

                    if (!objDDL._chkReadOnlyStatus()
                        && (that.firstSelectedValue().length == 0 || that.secondSelectedValue().length == 0)) {
                        isKeyInVal = false;
                    }
                    else if (!objTXT._chkReadOnlyStatus() && that.Bvalue().length == 0) {
                        isKeyInVal = false;
                    }
                    else {
                        isKeyInVal = true;
                    }

                    break;

                case "N":   //DualDropDownList & NumericTextBox皆非必填
                    isKeyInVal = true;
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

        //處理ReadonlyMode
        _procReadonlyMode: function (readonlyMode) {

            var that = this,
                strReadonlyMode = readonlyMode === undefined ? that.options.readonly_mode.toString() : readonlyMode,
                dropDownListReadOnlyMode = "",
                textBoxReadOnlyMode = "",
                objDDL = that.element.data("kendoBestDualDropDownList"),
                objTXT = that.TextBox.data("kendoBestTextBox");

            switch (strReadonlyMode) {

                case "Y":   //Both Readonly
                    dropDownListReadOnlyMode = "Y";
                    textBoxReadOnlyMode = "Y";
                    break;
                case "1":   //DDL Readonly TXT Not Readonly
                    dropDownListReadOnlyMode = "Y";
                    textBoxReadOnlyMode = "N";
                    break;
                case "2":   //DDL Not Readonly TXT Readonly
                    dropDownListReadOnlyMode = "N";
                    textBoxReadOnlyMode = "Y";
                    break;
                case "N":   //Both Not Readonly
                    dropDownListReadOnlyMode = "N";
                    textBoxReadOnlyMode = "N";
                    break;

            }

            //設定DualDropDownList的唯讀
            objDDL.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            if (dropDownListReadOnlyMode == "Y") {
                objDDL.Breadonly();
            }
            else {
                objDDL.Breadonly(false);
            }

            //設定TextBox的唯讀
            objTXT.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTXT.Breadonly();
            }
            else {
                objTXT.Breadonly(false);
            }

        },

        //second dropdownlist onchange事件
        _changeSecondDDL: function () {
            var that = this,
                objDDL = that.element.data("kendoBestDualDropDownList"),
                objTxt = that.TextBox.data("kendoBestTextBox");

            //依第二個下拉式選單選的值帶入textbox
            objTxt.Bvalue(objDDL.LastSelectedValue());
        },

        //Template
        _procTemplate: function () {
            var that = this,
                txtTemplate = "<input />";

            //產生兩個DropDownList
            that.element.kendoBestDualDropDownList({
                dataSource: that.options.dataSource,
                first_field_suffix: that.options.first_field_suffix,
                first_text_field: that.options.first_text_field,
                first_value_field: that.options.first_value_field,
                last_field_suffix: that.options.second_field_suffix,
                last_text_field: that.options.second_text_field,
                last_value_field: that.options.second_value_field,
                cascade_from_field: that.options.cascade_from_field,
                is_target: false
            });

            //新增 TextBox
            that.TextBox = $(txtTemplate);
            that.element.append(that.TextBox);
            that.TextBox.addClass(className);
            that.TextBox.on("blur" + ns, proxy(that._blur, that));

            that.TextBox.kendoBestTextBox({
                mode: that.options.mode,
                suffix: that.options.third_suffix,
                placeholder: that.options.placeholder,
                special_character: that.options.special_character,
                allow_special_character: that.options.allow_special_character,
                case_format: that.options.case_format,
                half_full_width: that.options.half_full_width,
                is_target: false
            });

            if (that.options.is_escape_confirm) {
                that.element.on("change" + ns, proxy(that._change, that));
            }

            //註冊當第二個DropDownList change後連動TextBox的值
            that.element.find("[role=listbox]:last").on("change.SecondChange", proxy(that._changeSecondDDL, that));

            //依據唯讀模式調整控制項
            that._procReadonlyMode();

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

    ui.plugin(GSSCityDistrictZIP);

})($);