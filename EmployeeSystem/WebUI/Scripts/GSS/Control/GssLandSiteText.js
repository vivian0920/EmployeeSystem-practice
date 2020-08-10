/**
 * @class BestLandSiteText
 */

/// <reference path="../Data/ControlDefaultsObject.js" />
(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         ns = ".kendoLandSiteText",
         className = "kendoLandSiteText",
         proxy = $.proxy;

    var GSSLandSiteText = widget.extend({
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

            //當is_escape_confirm為true時,需替element bind上_change事件
            if (that.options.is_escape_confirm) {
                that.element.on("change"), proxy(that._change, that);
            }

        },

        //設定options
        options: {

            /**
             * @property {string} name 物件
             * @default BestLandSiteText
             * @MemberOf BestLandSiteText
             */
            name: "BestLandSiteText",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestLandSiteText
             * @desc Y:TripleDropDownList & TextBox皆必填<br/>
                     N:TripleDropDownList & TextBox皆非必填
             */
            required_mode: ControlDefaultsObject.LandSiteText.required_mode || "N",

            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestLandSiteText
             */
            dataSource: null,

            //TripleDDL
            /**
             * @property {string} first_text_field FirstField的TextField欄位名稱
             * @default citytext
             * @MemberOf BestLandSiteText
             */
            first_text_field: ControlDefaultsObject.LandSiteText.first_text_field || "citytext",

            /**
             * @property {string} first_value_field FirstField的ValueField欄位名稱
             * @default cityvalue
             * @MemberOf BestLandSiteText
             */
            first_value_field: ControlDefaultsObject.LandSiteText.first_value_field || "cityvalue",

            /**
             * @property {string} first_field_suffix FirstField的後綴詞設定
             * @default 縣市
             * @MemberOf BestLandSiteText
             */
            first_field_suffix: ControlDefaultsObject.LandSiteText.first_field_suffix || "縣市",

            /**
             * @property {string} second_text_field SecondField的TextField欄位名稱
             * @default districttext
             * @MemberOf BestLandSiteText
             */
            second_text_field: ControlDefaultsObject.LandSiteText.second_text_field || "districttext",

            /**
             * @property {string} second_value_field SecondField的ValueField欄位名稱
             * @default districtvalue
             * @MemberOf BestLandSiteText
             */
            second_value_field: ControlDefaultsObject.LandSiteText.second_value_field || "districtvalue",

            /**
             * @property {string} second_cascadefrom_field 連動SecondField資料的欄位名稱
             * @default null
             * @MemberOf BestLandSiteText
             */
            second_cascadefrom_field: ControlDefaultsObject.LandSiteText.second_cascadefrom_field || null,

            /**
             * @property {string} second_field_suffix SecondField的後綴詞設定
             * @default 鄉鎮市區 郵遞區號
             * @MemberOf BestLandSiteText
             */
            second_field_suffix: ControlDefaultsObject.LandSiteText.second_field_suffix || "鄉鎮市區 郵遞區號",

            /**
             * @property {string} third_text_field thirdField的TextField欄位名稱
             * @default landnotext
             * @MemberOf BestLandSiteText
             */
            third_text_field: ControlDefaultsObject.LandSiteText.third_text_field || "landnotext",

            /**
             * @property {string} third_value_field thirdField的ValueField欄位名稱
             * @default landnovalue
             * @MemberOf BestLandSiteText
             */
            third_value_field: ControlDefaultsObject.LandSiteText.third_value_field || "landnovalue",

            /**
             * @property {string} third_cascadefrom_field 連動thirdField資料的欄位名稱
             * @default null
             * @MemberOf BestLandSiteText
             */
            third_cascadefrom_field: ControlDefaultsObject.LandSiteText.third_cascadefrom_field || null,

            /**
             * @property {string} third_field_suffix thirdField的後綴詞設定
             * @default null
             * @MemberOf BestLandSiteText
             */
            third_field_suffix: ControlDefaultsObject.LandSiteText.third_field_suffix || null,

            //TextBox(第四格)

            /**
             * @property {string} fourth_suffix TextBox(第四格)的後綴詞設定
             * @default 段
             * @MemberOf BestLandSiteText
             */
            fourth_suffix: ControlDefaultsObject.LandSiteText.fourth_suffix || "段",

            /**
             * @property {string} fourth_mode 設定TextBox(第四格)的文字模式
             * @default Chinese
             * @MemberOf BestLandSiteText
             */
            fourth_mode: ControlDefaultsObject.LandSiteText.fourth_mode || "Chinese",

            /**
             * @property {string} fourth_placeholder 設定TextBox(第四格)的提示訊息
             * @default null
             * @MemberOf BestLandSiteText
             */
            fourth_placeholder: ControlDefaultsObject.LandSiteText.fourth_placeholder || null,

            /**
             * @property {string} fourth_special_character TextBox(第四格)是否允許填入特殊字元
             * @default true
             * @MemberOf BestLandSiteText
             */
            fourth_special_character: ControlDefaultsObject.LandSiteText.fourth_special_character || true,

            /**
             * @property {string} fourth_allow_special_character TextBox(第四格)是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestLandSiteText
             * @desc 當fourth_allow_special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            fourth_allow_special_character: ControlDefaultsObject.LandSiteText.fourth_allow_special_character || "",

            /**
             * @property {string} fourth_case_format 設定TextBox(第四格)是否轉大小寫
             * @default None
             * @MemberOf BestLandSiteText
             * @desc None:無<br/>
                     Upper:轉大寫<br/>
                     Lower:轉小寫
             */
            fourth_case_format: ControlDefaultsObject.LandSiteText.fourth_case_format || "None",

            /**
            * @property {string} fourth_half_full_width 設定TextBox(第四格)是否轉半全形
            * @default None
            * @MemberOf BestLandSiteText
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            fourth_half_full_width: ControlDefaultsObject.LandSiteText.fourth_half_full_width || "None",

            //TextBox(第五格)

            /**
             * @property {string} fifth_suffix TextBox(第五格)的後綴詞設定
             * @default 小段
             * @MemberOf BestLandSiteText
             */
            fifth_suffix: ControlDefaultsObject.LandSiteText.fifth_suffix || "小段",

            /**
             * @property {string} fifth_mode 設定TextBox(第五格)的文字模式
             * @default Chinese
             * @MemberOf BestLandSiteText
             */
            fifth_mode: ControlDefaultsObject.LandSiteText.fifth_mode || "Chinese",

            /**
             * @property {string} fifth_placeholder 設定TextBox(第五格)的提示訊息
             * @default null
             * @MemberOf BestLandSiteText
             */
            fifth_placeholder: ControlDefaultsObject.LandSiteText.fifth_placeholder || null,

            /**
             * @property {string} fifth_special_character TextBox(第五格)是否允許填入特殊字元
             * @default true
             * @MemberOf BestLandSiteText
             */
            fifth_special_character: ControlDefaultsObject.LandSiteText.fifth_special_character || true,

            /**
             * @property {string} fifth_allow_special_character TextBox(第五格)是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestLandSiteText
             * @desc 當fifth_allow_special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            fifth_allow_special_character: ControlDefaultsObject.LandSiteText.fifth_allow_special_character || "",

            /**
             * @property {string} fifth_case_format 設定TextBox(第五格)是否轉大小寫
             * @default None
             * @MemberOf BestLandSiteText
             * @desc None:無<br/>
                     Upper:轉大寫<br/>
                     Lower:轉小寫
             */
            fifth_case_format: ControlDefaultsObject.LandSiteText.fifth_case_format || "None",

            /**
             * @property {string} fifth_half_full_width 設定TextBox(第五格)是否轉半全形
             * @default None
             * @MemberOf BestLandSiteText
             * @desc None:無<br/>
                     Half:轉半形<br/>
                     Full:轉全形
             */
            fifth_half_full_width: ControlDefaultsObject.LandSiteText.fifth_half_full_width || "None",

            //MaskedTextBox(第六格)

            /**
             * @property {string} sixth_suffix MaskedTextBox(第六格)的後綴詞設定
             * @default 地號
             * @MemberOf BestLandSiteText
             */
            sixth_suffix: ControlDefaultsObject.LandSiteText.sixth_suffix || "地號",

            /**
             * @property {string} sixth_format_type MaskedTextBox(第六格)的資料模式
             * @default LandNo
             * @MemberOf BestLandSiteText
             * @desc Phone:電話<br/>
                     PhoneExt:電話含分機<br/>
                     Mobile:手機<br/>
                     CreditCard:信用卡<br/>
                     LandNo:地號<br/>
                     BuildNo:建號
             */
            sixth_format_type: ControlDefaultsObject.LandSiteText.sixth_format_type || "LandNo",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestLandSiteText
             */
            is_escape_confirm: ControlDefaultsObject.LandSiteText.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestLandSiteText
             */
            is_change: ControlDefaultsObject.LandSiteText.is_change || false,

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestLandSiteText
             * @desc Y:所有控制項皆唯讀<br/>
                     1:TripleDropDownList唯讀,TextBox接非唯讀<br/>
                     N:所有控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.LandSiteText.readonly_mode || "N",

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestLandSiteText
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestLandSiteText
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestLandSiteText
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestLandSiteText
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestLandSiteText
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },

        /**
         * @desc 取值 First DropDownList Text
         * @memberof BestLandSiteText
         * @method firstSelectedText
         * @return {string} 取得First DropDownList Text
         * @example
         * 取值:element.BestLandSiteText().firstSelectedText();
         */
        firstSelectedText: function () {
            var that = this,
                objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.FirstSelectedText();
        },

        /**
         * @desc 設/取值 First DropDownList Value
         * @memberof BestLandSiteText
         * @method firstSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得First DropDownList Value
         * @example
         * 取值:element.BestLandSiteText().firstSelectedValue();
         * 設值:element.BestLandSiteText().firstSelectedValue(setValue);
         */
        firstSelectedValue: function (setValue) {
            var that = this,
                objDDL = that.element.data("kendoBestTripleDropDownList");

            if (setValue == null) {
                return objDDL.FirstSelectedValue();
            }

            if (setValue != null) {
                objDDL.FirstSelectedValue(setValue);
            }

        },

        /**
         * @desc 取值 Second DropDownList Text
         * @memberof BestLandSiteText
         * @method secondSelectedText
         * @return {string} 取得Second DropDownList Text
         * @example
         * 取值:element.BestLandSiteText().secondSelectedText();
         */
        secondSelectedText: function () {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.MiddleSelectedText();
        },

        /**
         * @desc 設/取值 Second DropDownList Value
         * @memberof BestLandSiteText
         * @method secondSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Second DropDownList Value
         * @example
         * 取值:element.BestLandSiteText().secondSelectedValue();
         * 設值:element.BestLandSiteText().secondSelectedValue(setValue);
         */
        secondSelectedValue: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            if (setValue == null) {
                return objDDL.MiddleSelectedValue();
            }

            if (setValue != null) {
                objDDL.MiddleSelectedValue(setValue);
            }

        },

        /**
         * @desc 取值 Third DropDownList Text
         * @memberof BestLandSiteText
         * @method thirdSelectedText
         * @return {string} 取得Third DropDownList Text
         * @example
         * 取值:element.BestLandSiteText().thirdSelectedText();
         */
        thirdSelectedText: function () {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.LastSelectedText();
        },

        /**
         * @desc 設/取值 Third DropDownList Value
         * @memberof BestLandSiteText
         * @method thirdSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Third DropDownList Value
         * @example
         * 取值:element.BestLandSiteText().thirdSelectedValue();
         * 設值:element.BestLandSiteText().thirdSelectedValue(setValue);
         */
        thirdSelectedValue: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            if (setValue == null) {
                return objDDL.LastSelectedValue();
            }

            if (setValue != null) {
                objDDL.LastSelectedValue(setValue);
            }

        },

        /**
         * @desc 設/取值 Fourth TextBox
         * @memberof BestLandSiteText
         * @method FourthValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestLandSiteText().FourthValue();
         * 設值:element.BestLandSiteText().FourthValue(setValue);
         */
        FourthValue: function (setValue) {
            var that = this, objTxt_fourth = that.FourthTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_fourth.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_fourth.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 Fifth TextBox
         * @memberof BestLandSiteText
         * @method FifthValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestLandSiteText().FifthValue();
         * 設值:element.BestLandSiteText().FifthValue(setValue);
         */
        FifthValue: function (setValue) {
            var that = this, objTxt_fifth = that.FifthTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_fifth.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_fifth.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 Sixth MaskedTextBox
         * @memberof BestLandSiteText
         * @method SixthValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestLandSiteText().SixthValue();
         * 設值:element.BestLandSiteText().SixthValue(setValue);
         */
        SixthValue: function (setValue) {
            var that = this, objMask_sixth = that.SixthMaskedTextBox.data("kendoBestMaskedTextBox");

            //取值
            if (setValue == null) {
                return objMask_sixth.Bvalue();
            }

            //設值
            if (setValue != null) {
                objMask_sixth.Bvalue(setValue);
            }

        },

        /**
         * @desc 唯讀處理
         * @memberof BestLandSiteText
         * @method Breadonly
         * @param {boolean} readonly 設定值(可不傳)
         * @example
         * 唯讀:element.BestLandSiteText().Breadonly();
         * 取消唯讀:element.BestLandSiteText().Breadonly(false);
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
         * @memberof BestLandSiteText
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
         * @memberof BestLandSiteText
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
         * @memberof BestLandSiteText
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
         * @memberof BestLandSiteText
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
                objTripleDDL = that.element.data("kendoBestTripleDropDownList"),
                objFourthTXT = that.FourthTextBox.data("kendoBestTextBox"),
                objFifthTXT = that.FifthTextBox.data("kendoBestTextBox"),
                objSixthMTXT = that.SixthMaskedTextBox.data("kendoBestMaskedTextBox");

            if (isLock) {
                that.element.find(".k-icon").addClass("k-loading");
                objTripleDDL.Breadonly();
                objFourthTXT.Breadonly();
                that.FourthTextBox.after(loadingIcon);
                objFifthTXT.Breadonly();
                that.FifthTextBox.after(loadingIcon);
                objSixthMTXT.Breadonly();
                that.SixthMaskedTextBox.after(loadingIcon);
            }
            else {
                that.element.find(".k-icon").removeClass("k-loading");
                objTripleDDL.Breadonly(false);
                objFourthTXT.Breadonly(false);
                objFifthTXT.Breadonly(false);
                objSixthMTXT.Breadonly(false);
                that.element.find(".b-lock").remove();
            }

        },

        //處理可編輯事件(三個DropDownList onchange時觸發 _blur)
        _bindDropDownList: function () {

            this.element.find("input[data-role=bestdropdownlist]")
                .on("change.Observable", proxy(this._blur, this));

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

            if (that.firstSelectedValue().length > 0
                        || that.secondSelectedValue().length > 0
                        || that.thirdSelectedValue().length > 0
                        || that.FourthValue().length > 0
                        || that.FifthValue().length > 0
                        || that.SixthValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this,
                isKeyInVal = false,
                objDDL = that.element.data("kendoBestTripleDropDownList"),
                objFourthTXT = that.FourthTextBox.data("kendoBestTextBox"),
                objFifthTXT = that.FifthTextBox.data("kendoBestTextBox"),
                objSixthMTXT = that.SixthMaskedTextBox.data("kendoBestMaskedTextBox");

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":   //所有皆必填

                    isKeyInVal = objDDL._chkRequired();

                    if (isKeyInVal) {

                        if ((!objFourthTXT._chkReadOnlyStatus() && that.FourthValue().length > 0)
                            && (!objFifthTXT._chkReadOnlyStatus() && that.FifthValue().length > 0)
                            && (!objSixthMTXT._chkReadOnlyStatus() && that.SixthValue().length > 0)) {
                            isKeyInVal = true;
                        }
                        else {
                            isKeyInVal = false;
                        }

                    }

                    break;

                case "N":   //所有皆非必填
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

        //處理ReadonlyMode
        _procReadonlyMode: function (readonlyMode) {

            var that = this,
                strReadonlyMode = readonlyMode === undefined ? that.options.readonly_mode.toString() : readonlyMode,
                dropDownListReadOnlyMode = "",
                textBoxReadOnlyMode = "",
                objTripleDDL = that.element.data("kendoBestTripleDropDownList"),
                objFourthTXT = that.FourthTextBox.data("kendoBestTextBox"),
                objFifthTXT = that.FifthTextBox.data("kendoBestTextBox"),
                objSixthMTXT = that.SixthMaskedTextBox.data("kendoBestMaskedTextBox");

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

            //設定TripleDropDownList的唯讀
            objTripleDDL.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            if (dropDownListReadOnlyMode == "Y") {
                objTripleDDL.Breadonly();
            }
            else {
                objTripleDDL.Breadonly(false);
            }

            //設定Fourth TextBox的唯讀
            objFourthTXT.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objFourthTXT.Breadonly();
            }
            else {
                objFourthTXT.Breadonly(false);
            }

            //設定Fifth TextBox的唯讀
            objFifthTXT.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objFifthTXT.Breadonly();
            }
            else {
                objFifthTXT.Breadonly(false);
            }

            //設定Sixth MaskedTextBox的唯讀
            objSixthMTXT.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objSixthMTXT.Breadonly();
            }
            else {
                objSixthMTXT.Breadonly(false);
            }

        },

        //Template
        _procTemplate: function () {
            var that = this,
                inputTemplate = "<input style='width:60px;'/>",
                maskTemplate = "<input style='width:85px;'/>";

            //將參數設至GSSTripleDropDownList
            that.element.kendoBestTripleDropDownList({
                dataSource: that.options.dataSource,
                first_text_field: that.options.first_text_field,
                first_value_field: that.options.first_value_field,
                first_field_suffix: that.options.first_field_suffix,
                middle_text_field: that.options.second_text_field,
                middle_value_field: that.options.second_value_field,
                middle_cascadefrom_field: that.options.second_cascadefrom_field,
                middle_field_suffix: that.options.second_field_suffix,
                last_text_field: that.options.third_text_field,
                last_value_field: that.options.third_value_field,
                last_cascadefrom_field: that.options.third_cascadefrom_field,
                last_field_suffix: that.options.third_field_suffix,
                required_mode: that.options.required_mode,   
                is_target: false
            });

            //調整TripleDropDownList大小
            that.element.find("span[class='k-widget k-dropdown k-header']").width(110);
            that._bindDropDownList();

            //新增 TextBox(第四格)
            that.FourthTextBox = $(inputTemplate);
            that.element.append(that.FourthTextBox);
            that.FourthTextBox.addClass(className);
            that.FourthTextBox.on("blur" + ns, proxy(that._blur, that));
            that.FourthTextBox.kendoBestTextBox({
                suffix: that.options.fourth_suffix,
                mode: that.options.fourth_mode,
                placeholder: that.options.fourth_placeholder,
                special_character: that.options.fourth_special_character,
                allow_special_character: that.options.fourth_allow_special_character,
                case_format: that.options.fourth_case_format,
                half_full_width: that.options.fourth_half_full_width,
                is_target: false
            });

            //新增 TextBox(第五格)
            that.FifthTextBox = $(inputTemplate);
            that.element.append(that.FifthTextBox);
            that.FifthTextBox.addClass(className);
            that.FifthTextBox.on("blur" + ns, proxy(that._blur, that));
            that.FifthTextBox.kendoBestTextBox({
                suffix: that.options.fifth_suffix,
                mode: that.options.fifth_mode,
                placeholder: that.options.fifth_placeholder,
                special_character: that.options.fifth_special_character,
                allow_special_character: that.options.fifth_allow_special_character,
                case_format: that.options.fifth_case_format,
                half_full_width: that.options.fifth_half_full_width,
                is_target: false
            });

            //新增 MaskedTextBox(第六格)
            that.SixthMaskedTextBox = $(maskTemplate);
            that.element.append(that.SixthMaskedTextBox);
            that.SixthMaskedTextBox.addClass(className);
            that.SixthMaskedTextBox.on("blur" + ns, proxy(that._blur, that));
            that.SixthMaskedTextBox.kendoBestMaskedTextBox({
                suffix: that.options.sixth_suffix,
                format_type: that.options.sixth_format_type,
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

    ui.plugin(GSSLandSiteText);

})($);