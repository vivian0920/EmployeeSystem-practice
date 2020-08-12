
//功能: 簡式地址 AddressBoxSimple
//描述: 地址輸入
//歷程: 1. 2014/07/28   1.00   Ada Wang   Create
//      2. 2014/08/14   1.01   Ben_Tsai   Modify 增加focus方法

/**
 * @class BestAddressBoxSimple
 */
(function ($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget,
        ns = ".kendoAddressBoxSimple",
        className = "kendoAddressBoxSimple",
        proxy = $.proxy;

    var GSSAddressBoxSimple = widget.extend({
        
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

        options: {

            /**
             * @property {string} name 物件
             * @default BestAddressBoxSimple
             * @MemberOf BestAddressBoxSimple
             */
            name: "BestAddressBoxSimple",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestAddressBoxSimple
             * @desc Y:TripleDropDownList & TextBox皆必填<br/>
                     N:TripleDropDownList & TextBox皆非必填
             */
            required_mode: ControlDefaultsObject.AddressBoxSimple.required_mode || "N",

            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestAddressBoxSimple
             */
            dataSource: null,

           //TripleDDL 設定
            /**
             * @property {string} first_text_field FirstField的TextField欄位名稱
             * @default citytext
             * @MemberOf BestAddressBoxSimple
             */
            first_text_field: ControlDefaultsObject.AddressBoxSimple.first_text_field || "citytext",

            /**
             * @property {string} first_value_field FirstField的ValueField欄位名稱
             * @default cityvalue
             * @MemberOf BestAddressBoxSimple
             */
            first_value_field: ControlDefaultsObject.AddressBoxSimple.first_value_field || "cityvalue",

            /**
            * @property {string} first_field_suffix FirstField的後綴詞設定
            * @default 縣市
            * @MemberOf BestAddressBoxSimple
            */
            first_field_suffix: ControlDefaultsObject.AddressBoxSimple.first_field_suffix || "縣市",

            /**
             * @property {string} second_text_field SecondField的TextField欄位名稱
             * @default areatext
             * @MemberOf BestAddressBoxSimple
             */
            second_text_field: ControlDefaultsObject.AddressBoxSimple.second_text_field || "areatext",

            /**
             * @property {string} second_value_field SecondField的ValueField欄位名稱
             * @default areavalue
             * @MemberOf BestAddressBoxSimple
             */
            second_value_field: ControlDefaultsObject.AddressBoxSimple.second_value_field || "areavalue",

            /**
             * @property {string} second_field_suffix SecondField的後綴詞設定
             * @default 鄉鎮市區 郵遞區號
             * @MemberOf BestAddressBoxSimple
             */
            second_field_suffix: ControlDefaultsObject.AddressBoxSimple.second_field_suffix || "鄉鎮市區 郵遞區號",

            /**
             * @property {string} second_cascadefrom_field 連動SecondField資料的欄位名稱
             * @default null
             * @MemberOf BestAddressBoxSimple
             */
            second_cascadefrom_field: ControlDefaultsObject.AddressBoxSimple.second_cascadefrom_field || null,

            /**
             * @property {string} third_text_field thirdField的TextField欄位名稱
             * @default ziptext
             * @MemberOf BestAddressBoxSimple
             */
            third_text_field: ControlDefaultsObject.AddressBoxSimple.third_text_field || "ziptext",

            /**
             * @property {string} third_value_field thirdField的ValueField欄位名稱
             * @default zipvalue
             * @MemberOf BestAddressBoxSimple
             */
            third_value_field: ControlDefaultsObject.AddressBoxSimple.third_value_field || "zipvalue",

            /**
             * @property {string} third_field_suffix thirdField的後綴詞設定
             * @default null
             * @MemberOf BestAddressBoxSimple
             */
            third_field_suffix: ControlDefaultsObject.AddressBoxSimple.third_field_suffix || null,

            /**
             * @property {string} third_cascadefrom_field 連動thirdField資料的欄位名稱
             * @default null
             * @MemberOf BestAddressBoxSimple
             */
            third_cascadefrom_field: ControlDefaultsObject.AddressBoxSimple.third_cascadefrom_field || null,

            //TextBox設定
            /**
             * @property {string} fourth_suffix TextBox的後綴詞設定
             * @default null
             * @MemberOf BestAddressBoxSimple
             */
            fourth_suffix: ControlDefaultsObject.AddressBoxSimple.fourth_suffix || null,

            /**
             * @property {string} fourth_placeholder 設定TextBox的提示訊息
             * @default null
             * @MemberOf BestAddressBoxSimple
             */
            fourth_placeholder: ControlDefaultsObject.AddressBoxSimple.fourth_placeholder || null,

            /**
             * @property {string} fourth_mode 設定TextBox的文字模式
             * @default None
             * @MemberOf BestAddressBoxSimple
             */
            fourth_mode: ControlDefaultsObject.AddressBoxSimple.fourth_mode || "None",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestAddressBoxSimple
             */
            is_escape_confirm: ControlDefaultsObject.AddressBoxSimple.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestAddressBoxSimple
             */
            is_change: ControlDefaultsObject.AddressBoxSimple.is_change || false,

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestAddressBoxSimple
             * @desc Y:所有控制項皆唯讀<br/>
                     1:TripleDropDownList唯讀,TextBox接非唯讀<br/>
                     N:所有控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.AddressBoxSimple.readonly_mode || "N",

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestAddressBoxSimple
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestAddressBoxSimple
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestAddressBoxSimple
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestAddressBoxSimple
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestAddressBoxSimple
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值 City DropDownList Text
         * @memberof BestAddressBoxSimple
         * @method CitySelectedText
         * @return {string} 取得City DropDownList Text
         * @example
         * 取值:element.BestAddressBoxSimple().CitySelectedText();
         */
        CitySelectedText: function (setValue) {
            var that = this,
                objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.FirstSelectedText();
        },

        /**
         * @desc 設/取值 City DropDownList Value
         * @memberof BestAddressBoxSimple
         * @method CitySelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得City DropDownList Value
         * @example
         * 取值:element.BestAddressBoxSimple().CitySelectedValue();
         * 設值:element.BestAddressBoxSimple().CitySelectedValue(setValue);
         */
        CitySelectedValue: function (setValue) {
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
         * @desc 取值 Area DropDownList Text
         * @memberof BestAddressBoxSimple
         * @method AreaSelectedText
         * @return {string} 取得Area DropDownList Text
         * @example
         * 取值:element.BestAddressBoxSimple().AreaSelectedText();
         */
        AreaSelectedText: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");
                       
            return objDDL.MiddleSelectedText();
        },

        /**
         * @desc 設/取值 Area DropDownList Value
         * @memberof BestAddressBoxSimple
         * @method AreaSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Area DropDownList Value
         * @example
         * 取值:element.BestAddressBoxSimple().AreaSelectedValue();
         * 設值:element.BestAddressBoxSimple().AreaSelectedValue(setValue);
         */
        AreaSelectedValue: function (setValue) {
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
         * @desc 取值 Zip DropDownList Text
         * @memberof BestAddressBoxSimple
         * @method ZipSelectedText
         * @return {string} 取得Zip DropDownList Text
         * @example
         * 取值:element.BestAddressBoxSimple().ZipSelectedText();
         */
        ZipSelectedText: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.LastSelectedText();
        },

        /**
         * @desc 設/取值 Zip DropDownList Value
         * @memberof BestAddressBoxSimple
         * @method ZipSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Zip DropDownList Value
         * @example
         * 取值:element.BestAddressBoxSimple().ZipSelectedValue();
         * 設值:element.BestAddressBoxSimple().ZipSelectedValue(setValue);
         */
        ZipSelectedValue: function (setValue) {
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
         * @desc 設/取值 Other TextBox
         * @memberof BestAddressBoxSimple
         * @method OtherValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxSimple().OtherValue();
         * 設值:element.BestAddressBoxSimple().OtherValue(setValue);
         */
        OtherValue: function (setValue) {
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
         * @desc 唯讀處理
         * @memberof BestAddressBoxSimple
         * @method Breadonly
         * @param {boolean} readonly 設定值(可不傳)
         * @example
         * 唯讀:element.BestAddressBoxSimple().Breadonly();
         * 取消唯讀:element.BestAddressBoxSimple().Breadonly(false);
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
         * @memberof BestAddressBoxSimple
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
         * @memberof BestAddressBoxSimple
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
         * @memberof BestAddressBoxSimple
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
         * @memberof BestAddressBoxSimple
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
                objTXT = that.FourthTextBox.data("kendoBestTextBox");

            if (isLock) {
                that.element.find(".k-icon").addClass("k-loading");
                objTripleDDL.Breadonly();
                that.FourthTextBox.after(loadingIcon);
                objTXT.Breadonly();
            }
            else {
                that.element.find(".k-icon").removeClass("k-loading");
                objTripleDDL.Breadonly(false);
                objTXT.Breadonly(false);
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

            if (that.CitySelectedValue().lenght > 0
                        || that.AreaSelectedValue().lenght > 0
                        || that.ZipSelectedValue().lenght > 0
                        || that.OtherValue().lenght > 0) {
                return true;
            }else {
                return false;
            }
        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            
            var that = this,
                isKeyInVal = false,
                objTripleDDL = that.element.data("kendoBestTripleDropDownList"),
                objTXT = that.FourthTextBox.data("kendoBestTextBox");

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":   //所有皆必填

                    isKeyInVal = objTripleDDL._chkRequired();

                    if (isKeyInVal) {

                        if (!objTXT._chkReadOnlyStatus() && that.OtherValue().length > 0) {
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
                objTXT = that.FourthTextBox.data("kendoBestTextBox");

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

        _procTemplate: function () {
            var that = this,
                inputTemplate = "<input style='width:500px;'/>";

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

            //新增 TextBox
            that.FourthTextBox = $(inputTemplate);
            that.element.append(that.FourthTextBox);
            that.FourthTextBox.addClass(className);
            that.FourthTextBox.on("blur" + ns, proxy(that._blur, that));
            that.FourthTextBox.kendoBestTextBox({
                suffix: that.options.fourth_suffix,
                mode: that.options.fourth_mode,
                placeholder: that.options.fourth_placeholder,
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

    ui.plugin(GSSAddressBoxSimple);

})(jQuery);