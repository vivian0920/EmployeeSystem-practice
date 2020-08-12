/// <reference path="../Data/ControlDefaultsObject.js" />

/**
 * @class BestCurrencyTextBox
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         ns = ".kendoCurrencyTextBox",
         className = "kendoCurrencyTextBox",
         proxy = $.proxy;

    var GSSCurrencyTextBox = widget.extend({

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

            if (that.options.is_escape_confirm) {
                that.element.on("change" + ns, proxy(that._change, that));
            }

        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestCurrencyTextBox
             * @MemberOf BestCurrencyTextBox
             */
            name: "BestCurrencyTextBox",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestCurrencyTextBox
             * @desc Y:DualDropDownList & NumericTextBox皆必填<br/>
                     N:DualDropDownList & NumericTextBox皆非必填
             */
            required_mode: ControlDefaultsObject.CurrencyTextBox.required_mode || "N",

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestCurrencyTextBox
             * @desc Y:兩個控制項皆為唯讀<br/>
                     1:第一個DropDownList唯讀,第二個TextBox非唯讀<br/>
                     2:第一個DropDownList非唯讀,第二個TextBox唯讀<br/>
                     N:兩個控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.CurrencyTextBox.readonly_mode || "N",

            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestCurrencyTextBox
             */
            dataSource: null,

            //DropDownList設定
            /**
             * @property {string} text_field TextField欄位名稱
             * @default text
             * @MemberOf BestCurrencyTextBox
             */
            text_field: ControlDefaultsObject.CurrencyTextBox.text_field || "text",

            /**
             * @property {string} value_field ValueField欄位名稱
             * @default value
             * @MemberOf BestCurrencyTextBox
             */
            value_field: ControlDefaultsObject.CurrencyTextBox.value_field || "value",

            //NumericTextBox設定
            /**
             * @property {string} mode TextBox資料模式
             * @default Currency
             * @MemberOf BestCurrencyTextBox
             */
            mode: ControlDefaultsObject.CurrencyTextBox.mode || "Currency",

            /**
             * @property {string} suffix 後綴詞
             * @default null
             * @MemberOf BestCurrencyTextBox
             */
            suffix: ControlDefaultsObject.CurrencyTextBox.suffix || null,

            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default null
             * @MemberOf BestCurrencyTextBox
             */
            placeholder: ControlDefaultsObject.CurrencyTextBox.placeholder || null,

            /**
             * @property {string} unit 單位
             * @default [Percent]為100<br/>[Currency]為1000<br/>[Number]為1
             * @MemberOf BestCurrencyTextBox
             */
            unit: ControlDefaultsObject.CurrencyTextBox.unit || null,

            /**
             * @property {string} format 資料格式
             * @default null
             * @MemberOf BestCurrencyTextBox
             */
            format: ControlDefaultsObject.CurrencyTextBox.format || null,

            /**
             * @property {int} decimals 小數點位數
             * @default null
             * @MemberOf BestCurrencyTextBox
             */
            decimals: ControlDefaultsObject.CurrencyTextBox.decimals || null,

            /**
             * @property {string} minus_format 負數格式
             * @default Minus
             * @MemberOf BestCurrencyTextBox
             * @desc 內含兩種格式<br/>[Minus]-1<br/>[Parenthesis](1)
             */
            minus_format: ControlDefaultsObject.CurrencyTextBox.minus_format || "Minus",

            /**
             * @property {string} carry_method 小數點進位方式
             * @default Round
             * @MemberOf BestCurrencyTextBox
             * @desc 內含三種格式<br/>[Round]四捨五入<br/>[Floor]無條件捨去<br/>[Ceil]無條件進位
             */
            carry_method: ControlDefaultsObject.CurrencyTextBox.carry_method || "Round",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestCurrencyTextBox
             */
            is_escape_confirm: ControlDefaultsObject.CurrencyTextBox.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestCurrencyTextBox
             */
            is_change: ControlDefaultsObject.CurrencyTextBox.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestPairTextBoxPopUp
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestPairTextBoxPopUp
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestPairTextBoxPopUp
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestPairTextBoxPopUp
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestPairTextBoxPopUp
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 設/取值 DropDownList Text
         * @memberof BestCurrencyTextBox
         * @method SelectedText
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得DropDownList Text
         * @example
         * 取值:element.BestCurrencyTextBox().SelectedText();
         * 設值:element.BestCurrencyTextBox().SelectedText(setValue);
         */
        SelectedText: function (setValue) {
            var that = this, objDDL = that.DropDownList.data("kendoBestDropDownList");

            if (setValue == null) {
                return objDDL.text();
            }

            if (setValue != null) {
                objDDL.text(setValue);
            }
        },

        /**
         * @desc 設/取值 DropDownList Value
         * @memberof BestCurrencyTextBox
         * @method SelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得DropDownList Value
         * @example
         * 取值:element.BestCurrencyTextBox().SelectedValue();
         * 設值:element.BestCurrencyTextBox().SelectedValue(setValue);
         */
        SelectedValue: function (setValue) {
            var that = this, objDDL = that.DropDownList.data("kendoBestDropDownList");

            if (setValue == null) {
                return objDDL.Bvalue();
            }

            if (setValue != null) {
                objDDL.Bvalue(setValue);
            }
        },

        /**
         * @desc 設/取值 TextBox 資料
         * @memberof BestCurrencyTextBox
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox Value
         * @example
         * 取值:element.BestCurrencyTextBox().Bvalue();
         * 設值:element.BestCurrencyTextBox().Bvalue(setValue);
         */
        Bvalue: function (setValue) {
            var that = this, objNTB = that.NumericTextBox.data("kendoBestNumericTextBox");

            //取值
            if (setValue == null) {
                return objNTB.Bvalue();
            }

            //設值
            if (setValue != null) {
                objNTB.Bvalue(setValue);
            }

        },

        /**
         * @desc 唯讀處理
         * @memberof BestCurrencyTextBox
         * @method Breadonly
         * @param {boolean} readonly 設定值(可不傳)
         * @example
         * 唯讀:element.BestCurrencyTextBox().Breadonly();
         * 取消唯讀:element.BestCurrencyTextBox().Breadonly(false);
         */
        Breadonly: function (readonly) {
            
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                objDDL = that.DropDownList.data("kendoBestDropDownList"),
                objNTB = that.NumericTextBox.data("kendoBestNumericTextBox");

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
         * @memberof BestCurrencyTextBox
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
         * @memberof BestCurrencyTextBox
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
         * @memberof BestCurrencyTextBox
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
         * @memberof BestCurrencyTextBox
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
                loadingIcon = '<span class="k-icon k-loading" style="margin-left: -20px; margin-right: 5px; height: 16px;"></span>',
                objFirst = that.DropDownList.data("kendoBestDropDownList"),
                objSecond = that.NumericTextBox.data("kendoBestNumericTextBox");

            if (isLock) {
                that.DropDownList.parent().find(".k-icon").addClass("k-loading");
                objFirst.Breadonly();
                objSecond.Breadonly();
                that.NumericTextBox.after(loadingIcon);
            }
            else {
                that.DropDownList.parent().find(".k-icon").removeClass("k-loading");
                objFirst.Breadonly(false);
                objSecond.Breadonly(false);
                that.element.find(".k-loading").remove();
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

            if (that.SelectedValue().length > 0 || that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this,
                objFirst = that.DropDownList.data("kendoBestDropDownList"),
                objSecond = that.NumericTextBox.data("kendoBestNumericTextBox"),
                isKeyInVal = false;

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":   //DropDownList & NumericTextBox皆必填
                   
                    if (!objFirst._chkReadOnlyStatus() && that.SelectedValue().length == 0) {
                        isKeyInVal = false;
                    }
                    else if (!objSecond._chkReadOnlyStatus() && that.Bvalue().length == 0) {
                        isKeyInVal = false;
                    }
                    else {
                        isKeyInVal = true;
                    }

                    break;

                case "N":   //DropDownList & NumericTextBox皆非必填
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
                numericTextBoxReadOnlyMode = "",
                objFirst = that.DropDownList.data("kendoBestDropDownList"),
                objSecond = that.NumericTextBox.data("kendoBestNumericTextBox");

            switch (strReadonlyMode) {
                case "Y":   //Both Readonly
                    dropDownListReadOnlyMode = "Y";
                    numericTextBoxReadOnlyMode = "Y";
                    break;
                case "1":   //First Readonly Second Not Readonly
                    dropDownListReadOnlyMode = "Y";
                    numericTextBoxReadOnlyMode = "N";
                    break;
                case "2":   //First Not Readonly Second Readonly
                    dropDownListReadOnlyMode = "N";
                    numericTextBoxReadOnlyMode = "Y";
                    break;
                case "N":   //Both Not Readonly
                    dropDownListReadOnlyMode = "N";
                    numericTextBoxReadOnlyMode = "N";
                    break;

            }

            //設定第一個textbox的唯讀
            objFirst.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            if (dropDownListReadOnlyMode == "Y") {
                objFirst.Breadonly();
            }
            else {
                objFirst.Breadonly(false);
            }

            //設定第二個textbox的唯讀
            objSecond.BsetOptions({
                readonly_mode: numericTextBoxReadOnlyMode
            });

            if (numericTextBoxReadOnlyMode == "Y") {
                objSecond.Breadonly();
            }
            else {
                objSecond.Breadonly(false);
            }

        },

        //Template
        _procTemplate: function () {
            var that = this,
                inputTemplate = "<input />";

            //新增 DropDownList
            that.DropDownList = $(inputTemplate);

            //將參數設至GSSDropDownList
            that.element.append(that.DropDownList);

            that.DropDownList.addClass(className);
            that.DropDownList.on("change" + ns, proxy(that._blur, that));

            that.DropDownList.kendoBestDropDownList({
                dataSource: that.options.dataSource,
                text_field: that.options.first_text_field,
                value_field: that.options.first_value_field,
                is_target: false
            });

            //新增 NumericTextBox
            that.NumericTextBox = $(inputTemplate);
            that.element.append(that.NumericTextBox);

            that.NumericTextBox.addClass(className);
            that.NumericTextBox.on("blur" + ns, proxy(that._blur, that));

            that.NumericTextBox.kendoBestNumericTextBox({
                mode: that.options.mode,
                suffix: that.options.suffix,
                placeholder:that.options.placeholder,
                unit: that.options.unit,
                format: that.options.format,
                decimals: that.options.decimals,
                minus_format: that.options.minus_format,
                carry_method: that.options.carry_method,
                is_target: false
            });

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

    ui.plugin(GSSCurrencyTextBox);

})($);
