
//功能: 單選按鈕下拉選單 RadioDropDownList 
//描述: 資料點選
//歷程: 1. 2014/08/20   1.00   Ada Wang   Create

/**
 * @class BestRadioDropDownList
 */

(function ($, undefined) {

    var kendo = window.kendo,
    ui = kendo.ui,
    widget = ui.Widget,
    ns = ".kendoRadioDropDownList",
    className = "kendoRadioDropDownList",
    proxy = $.proxy;

    var GSSRadioDropDownList = widget.extend({

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
            that._procTemplate(element.id);

        },

        options: {

            /**
             * @property {string} name 物件名稱
             * @default BestRadioDropDownList
             * @MemberOf BestRadioDropDownList
             */
            name: "BestRadioDropDownList",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestRadioDropDownList
             * @desc Y:控制項皆為必填<br/>
                     N:控制項皆非必填
             */
            required_mode: ControlDefaultsObject.RadioDropDownList.required_mode || "N",

            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestRadioDropDownList
             */
            dataSource: null,

            //RadioButtonList設定
            /**
             * @property {string} rbl_text_field TextField欄位名稱
             * @default banktypetext
             * @MemberOf BestRadioDropDownList
             */
            rbl_text_field: ControlDefaultsObject.RadioDropDownList.rbl_text_field || "banktypetext",

            /**
            * @property {string} rbl_value_field ValueField欄位名稱
            * @default banktypevalue
            * @MemberOf BestRadioDropDownList
            */
            rbl_value_field: ControlDefaultsObject.RadioDropDownList.rbl_value_field || "banktypevalue",

            //DropDownList設定
            /**
             * @property {string} ddl_text_field TextField欄位名稱
             * @default banktext
             * @MemberOf BestRadioDropDownList
             */
            ddl_text_field: ControlDefaultsObject.RadioDropDownList.ddl_text_field || "banktext",

            /**
            * @property {string} ddl_value_field ValueField欄位名稱
            * @default bankvalue
            * @MemberOf BestRadioDropDownList
            */
            ddl_value_field: ControlDefaultsObject.RadioDropDownList.ddl_value_field || "bankvalue",

            /**
             * @property {string} ddl_field_suffix 後綴詞
             * @default null
             * @MemberOf BestRadioDropDownList
             */
            ddl_field_suffix: ControlDefaultsObject.RadioDropDownList.ddl_field_suffix || null,

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestRadioDropDownList
             */
            is_escape_confirm: ControlDefaultsObject.RadioDropDownList.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestRadioDropDownList
             */
            is_change: ControlDefaultsObject.RadioDropDownList.is_change || false,

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestRadioDropDownList
             * @desc Y:兩個控制項皆為唯讀<br/>
                     1:RadioButtonList唯讀,DropDownList非唯讀<br/>
                     2:RadioButtonList非唯讀,DropDownList唯讀<br/>
                     N:兩個控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.RadioDropDownList.readonly_mode || "N",

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestRadioDropDownList
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestRadioDropDownList
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestRadioDropDownList
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestRadioDropDownList
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestRadioDropDownList
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值 DropDownList Text
         * @memberof BestRadioDropDownList
         * @method DDLSelectedText
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得DropDownList Text
         * @example
         * 取值:element.BestRadioDropDownList().DDLSelectedText();
         */
        DDLSelectedText: function (setValue) {
            var that = this,
                objDDL = that.DropDownList.data("kendoBestDropDownList");

            return objDDL.Btext();
        },

        /**
         * @desc 設/取值 DropDownList Value
         * @memberof BestRadioDropDownList
         * @method DDLSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得DropDownList Value
         * @example
         * 取值:element.BestRadioDropDownList().DDLSelectedValue();
         * 設值:element.BestRadioDropDownList().DDLSelectedValue(setValue);
         */
        DDLSelectedValue: function (setValue) {
            var that = this,
                objDDL = that.DropDownList.data("kendoBestDropDownList");

            if (setValue == null) {
                return objDDL.Bvalue();
            }

            if (setValue != null) {
                objDDL.Bvalue(setValue);
            }

            that._SetTextBoxValue();

        },

        /**
         * @desc 設/取值 TextBox 資料
         * @memberof BestRadioDropDownList
         * @method TextValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox Value
         * @example
         * 取值:element.BestRadioDropDownList().TextValue();
         * 設值:element.BestRadioDropDownList().TextValue(setValue);
         */
        TextValue: function (setValue) {
            var that = this,
                objTxt = that.TextBox.data("kendoBestTextBox");

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
         * @desc 取值 RadioButtonList Text
         * @memberof BestRadioDropDownList
         * @method RBLSelectedText
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得RadioButtonList Text
         * @example
         * 取值:element.BestRadioDropDownList().RBLSelectedText();
         */
        RBLSelectedText: function (setValue) {
            var that = this,
                objRBL = that.RadioButtonList.data("kendoBestRadioButtonList");

            return objRBL.SelectedText();
        },

        /**
         * @desc 設/取值 RadioButtonList Value
         * @memberof BestRadioDropDownList
         * @method RBLSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得RadioButtonList Value
         * @example
         * 取值:element.BestRadioDropDownList().RBLSelectedValue();
         * 設值:element.BestRadioDropDownList().RBLSelectedValue(setValue);
         */
        RBLSelectedValue: function (setValue) {
            var that = this,
                objRBL = that.RadioButtonList.data("kendoBestRadioButtonList");

            if (setValue == null) {
                return objRBL.SelectedValue();
            }

            if (setValue != null) {
                objRBL.SelectedValue(setValue);
            }

            that._procDropDownListEditable();

        },

        /**
         * @desc 唯讀處理
         * @memberof BestRadioDropDownList
         * @method Breadonly
         * @param {boolean} readonly 設定值(可不傳)
         * @example
         * 唯讀:element.BestRadioDropDownList().Breadonly();
         * 取消唯讀:element.BestRadioDropDownList().Breadonly(false);
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
         * @memberof BestRadioDropDownList
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
         * @memberof BestRadioDropDownList
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
         * @memberof BestRadioDropDownList
         * @method BsetOptions
         * @example
         * 設定options: element.BsetOptions({ readonly_mode: "2" });
         */
        BsetOptions: function (options) {

            var that = this;

            widget.fn.setOptions.call(that, options);

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

            if (that.RBLSelectedValue().length > 0 || that.TextValue().length > 0 || that.DDLSelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this,
                objRBL = that.RadioButtonList.data("kendoBestRadioButtonList"),
                objDDL = that.DropDownList.data("kendoBestDropDownList"),
                objTXT = that.TextBox.data("kendoBestTextBox"),
                isKeyInVal = false;

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":

                    if (!objRBL._chkReadOnlyStatus() && that.RBLSelectedValue().length > 0) {

                        switch (that.RBLSelectedValue()[0]) {

                            case "own": //本行
                                isKeyInVal = true;
                                break;

                            case "other":   //他行

                                if ((!objTXT._chkReadOnlyStatus() && that.TextValue().length > 0)
                                    && (!objDDL._chkReadOnlyStatus() && that.DDLSelectedValue().length > 0)) {
                                    isKeyInVal = true;
                                }

                                break;

                        }

                    }

                    break;
                case "N":   //所有皆非必填
                    return true;

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

        //處理RadioButtonList給值後DropDownList的狀態
        _procDropDownListEditable: function () {
            var that = this,
                 objRBL = that.RadioButtonList.data("kendoBestRadioButtonList"),
                 objDDL = that.DropDownList.data("kendoBestDropDownList"),
                 objTXT = that.TextBox.data("kendoBestTextBox");

            switch (objRBL.SelectedValue()[0]) {

                case "own": //本行

                    //唯讀textbox及dropdownlist
                    objTXT.Breadonly();
                    objTXT.Bvalue("");
                    objDDL.Breadonly();
                    objDDL.Bvalue("");

                    break;

                case "other": //他行

                    //開啟textbox及dropdownlist
                    objTXT.Breadonly(false);
                    objDDL.Breadonly(false);

                    break;
            }
        },

        _SetTextBoxValue: function () {

            var that = this;

            that.TextValue(that.DDLSelectedValue());

        },

        //處理ReadonlyMode
        _procReadonlyMode: function (readonlyMode) {

            var that = this,
                strReadonlyMode = readonlyMode === undefined ? that.options.readonly_mode.toString() : readonlyMode,
                radioButtonListReadOnlyMode = "",
                dropDownListReadOnlyMode = "",
                objRBL = that.RadioButtonList.data("kendoBestRadioButtonList"),
                objDDL = that.DropDownList.data("kendoBestDropDownList"),
                objTXT = that.TextBox.data("kendoBestTextBox");

            switch (strReadonlyMode) {
                case "Y":   //Both Readonly
                    radioButtonListReadOnlyMode = "Y";
                    dropDownListReadOnlyMode = "Y";
                    break;
                case "1":   //radioButtonList Readonly; dropDownList Not Readonly
                    radioButtonListReadOnlyMode = "Y";
                    dropDownListReadOnlyMode = "N";
                    break;
                case "2":   //radioButtonList Not Readonly; dropDownList Readonly
                    radioButtonListReadOnlyMode = "N";
                    dropDownListReadOnlyMode = "Y";
                    break;
                case "N":   //Both Not Readonly
                    radioButtonListReadOnlyMode = "N";
                    dropDownListReadOnlyMode = "N";
                    break;

            }

            //設定radioButtonList的唯讀
            objRBL.BsetOptions({
                readonly_mode: radioButtonListReadOnlyMode
            });

            if (radioButtonListReadOnlyMode == "Y") {
                objRBL.Breadonly();
            }
            else {
                objRBL.Breadonly(false);
            }

            //設定dropDownList的唯讀
            objDDL.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            objTXT.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            if (dropDownListReadOnlyMode == "Y") {
                objDDL.Breadonly();
                objTXT.Breadonly();
            }
            else {
                objDDL.Breadonly(false);
                objTXT.Breadonly(false);
            }

        },

        _procTemplate: function (elmentID) {
            var that = this,
                rblTemplate = "<span id='" + elmentID + "' />",
                inputTemplate = "<input style='width:100px;'/>",
                listTemplate = "<input class='inner'/>";

            var rblData = that.options.dataSource[0];
            var ddlData = that.options.dataSource[1];


            //新增 RadioButtonList
            that.RadioButtonList = $(rblTemplate);

            //依照DataSource重new一個kendo.data.DataSource
            this.options.dataSource = new kendo.data.DataSource({ data: rblData });
            that.element.append(that.RadioButtonList);
            that.RadioButtonList.addClass(className);
            that.RadioButtonList.on("change.ChangeSelectedValue" + ns, proxy(that._procDropDownListEditable, that));
            that.RadioButtonList.on("change" + ns, proxy(that._blur, that));

            that.RadioButtonList.kendoBestRadioButtonList({
                dataSource: that.options.dataSource,
                text_field: that.options.rbl_text_field,
                value_field: that.options.rbl_value_field
            });

            //新增 TextBox
            that.TextBox = $(inputTemplate);

            that.element.append(that.TextBox);
            that.TextBox.addClass(className);
            that.TextBox.on("blur" + ns, proxy(that._blur, that));
            that.TextBox.kendoBestTextBox();

            //新增 DropDownList
            that.DropDownList = $(listTemplate);
            that.element.append(that.DropDownList);
            that.DropDownList.addClass(className);
            that.DropDownList.on("change.SetTextBoxValue" + ns, proxy(that._SetTextBoxValue, that));
            that.DropDownList.on("change" + ns, proxy(that._blur, that));

            //將參數設至GSSDropDownList
            that.DropDownList.kendoBestDropDownList({
                dataSource: ddlData,
                text_field: that.options.ddl_text_field,
                value_field: that.options.ddl_value_field,
                suffix: that.options.ddl_field_suffix
            });

            if (that.options.is_escape_confirm) {
                that.RadioButtonList.on("change", proxy(that._chadnge, that));
                that.TextBox.on("change", proxy(that._change, that));
                that.DropDownList.on("change", proxy(that._change, that));
            }

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

    ui.plugin(GSSRadioDropDownList);

})(jQuery);