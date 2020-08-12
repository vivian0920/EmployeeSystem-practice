
/**
 * @class BestTextBoxPopUp
 */

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget,
        ns = ".kendoTextBoxPopUp",
        className = "kendoTextBoxPopUp",
        proxy = $.proxy,
        quickClass = "quickClass";

    var GSSTextBoxPopUp = widget.extend({

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
             * @property {string} name 物件名稱
             * @default BestTextBoxPopUp
             * @MemberOf BestTextBoxPopUp
             */
            name: "BestTextBoxPopUp",

            /**
             * @property {string} suffix 後綴詞
             * @default string.empty
             * @MemberOf BestTextBoxPopUp
             */
            suffix: ControlDefaultsObject.TextBoxPopUp.suffix || null,

            /**
            * @property {string} mode 資料模式
            * @default None
            * @MemberOf BestTextBoxPopUp
            */
            mode: ControlDefaultsObject.TextBoxPopUp.mode || "None",

            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default string.empty
             * @MemberOf BestTextBoxPopUp
             */
            placeholder: ControlDefaultsObject.TextBoxPopUp.placeholder || null,

            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestTextBoxPopUp
             */
            special_character: ControlDefaultsObject.TextBoxPopUp.special_character || true,

            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestTextBoxPopUp
             * @desc 當special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            allow_special_character: ControlDefaultsObject.TextBoxPopUp.allow_special_character || "",

            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestTextBoxPopUp
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.TextBoxPopUp.case_format || "None",

            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestTextBoxPopUp
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.TextBoxPopUp.half_full_width || "None",

            /**
             * @property {object} dataSource 資料物件(快捷鈕)
             * @default null
             * @MemberOf BestTextBoxPopUp
             */
            dataSource: null,

            //window設定
            /**
             * @property {string} title 另開視窗的Title設定
             * @default New Window
             * @MemberOf BestTextBoxPopUp
             */
            title: ControlDefaultsObject.TextBoxPopUp.title || "New Window",

            /**
             * @property {string} width 另開視窗的寬度設定
             * @default 600px
             * @MemberOf BestTextBoxPopUp
             */
            width: ControlDefaultsObject.TextBoxPopUp.width || "600px",

            /**
             * @property {array} actions 另開視窗允許的動作
             * @default ["Minimize","Maximize","Close"]
             * @MemberOf BestTextBoxPopUp
             * @desc 允許動作的設定,可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-actions)
             */
            actions: ControlDefaultsObject.TextBoxPopUp.actions || [
                "Minimize",
                "Maximize",
                "Close"
            ],

            /**
             * @property {boolean} modal 是否lock原視窗
             * @default true
             * @MemberOf BestTextBoxPopUp
             */
            modal: ControlDefaultsObject.TextBoxPopUp.modal || true,

            /**
             * @property {object} position 設定視窗呈現位置
             * @default {top: 100, left: 250}
             * @MemberOf BestTextBoxPopUp
             * @desc 其設定可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-position)
             */
            position: ControlDefaultsObject.TextBoxPopUp.position || {
                top: 100,
                left: 250
            },

            iframe: ControlDefaultsObject.TextBoxPopUp.iframe || false,

            /**
             * @property {object} parameter 傳入視窗的參數物件
             * @default null
             * @MemberOf BestTextBoxPopUp
             */
            parameter: null,
            result: null,

            //TextBoxPopUp 設定
            /**
             * @property {boolean} is_window_enabled 是否開啟視窗
             * @default true
             * @MemberOf BestTextBoxPopUp
             */
            is_window_enabled: ControlDefaultsObject.TextBoxPopUp.is_window_enabled || true,

            /**
             * @property {string} text_mode 視窗選取的文字,採用取代或附加的方式
             * @default replace
             * @MemberOf BestTextBoxPopUp
             * @desc replace:取代文字<br/>append:附加文字
             */
            text_mode: ControlDefaultsObject.TextBoxPopUp.text_mode || "replace",

            /**
             * @property {string} window_url 另開視窗的網址
             * @default null
             * @MemberOf BestTextBoxPopUp
             */
            window_url: ControlDefaultsObject.TextBoxPopUp.window_url || "",

            /**
             * @property {string} text_field 設定dataSource裡的Text Field
             * @default text
             * @MemberOf BestTextBoxPopUp
             */
            text_field: ControlDefaultsObject.TextBoxPopUp.text_field || "text",

            /**
             * @property {string} value_field 設定dataSource裡的Value Field
             * @default value
             * @MemberOf BestTextBoxPopUp
             */
            value_field: ControlDefaultsObject.TextBoxPopUp.value_field || "value",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTextBoxPopUp
             */
            is_escape_confirm: ControlDefaultsObject.TextBoxPopUp.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTextBoxPopUp
             */
            is_change: ControlDefaultsObject.TextBoxPopUp.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestTextBoxPopUp
             */
            is_target: true,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestTextBoxPopUp
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestTextBoxPopUp
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestTextBoxPopUp
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestTextBoxPopUp
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestTextBoxPopUp
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestTextBoxPopUp
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 設/取值 TextBox value
         * @memberof BestTextBoxPopUp
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 TextBox Value
         * @example
         * 取值:element.BestTextBoxPopUp().Bvalue();
         * 設值:element.BestTextBoxPopUp().Bvalue(setValue);
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
        * @memberof BestTextBoxPopUp
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.Breadonly();
        * 取消唯讀:elemen.Breadonly(false);
        */
        Breadonly: function (readonly) {

            var that = this
                , isReadonly = readonly === undefined ? true : readonly
                , objTxt = that.TextBox.data("kendoBestTextBox");

            if (isReadonly) {
                that._procReadonlyMode("Y");
            }
            else {
                that._procReadonlyMode();
            }

            //設定控制項唯讀狀態
            that.options.readonly_status = isReadonly;

            //放大鏡按鈕
            if (that.options.is_window_enabled) {

                if (isReadonly) {
                    that.showWindowButton.hide();
                }
                else {
                    that.showWindowButton.show();
                }

            }

            //快速查詢按鈕
            if (that.options.dataSource == null) return false;    //無快速查詢按鈕, 則不執行下面程式

            if (isReadonly) {
                that.element.find("." + quickClass).hide();
            }
            else {
                that.element.find("." + quickClass).show();
            }

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestTextBoxPopUp
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
         * @memberof TextBoxPopUp
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
         * @memberof TextBoxPopUp
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

            if (that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this
               , isKeyInVal = false;

            if (that.options.is_window_enabled) {
                if (that.Bvalue().length > 0) isKeyInVal = true;
            }
            else {
                //控制項非唯讀狀態且有輸入資料
                if (!that._chkReadOnlyStatus() && that.Bvalue().length > 0) isKeyInVal = true;
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
                textBoxReadOnlyMode = "",
                objTxt = that.TextBox.data("kendoBestTextBox");

            switch (strReadonlyMode) {
                case "Y":
                    textBoxReadOnlyMode = "Y";
                    break;

                case "N":
                    textBoxReadOnlyMode = "N";
                    break;

            }

            //設定textbox的唯讀
            objTxt.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt.Breadonly();
            }
            else {
                objTxt.Breadonly(false);
            }

        },

        //放大鏡綁定click事件
        _showWindowClick: function (strElementID) {

            var that = this,
                optionsWindow = {};

            optionsWindow.title = that.options.title;
            optionsWindow.content = that.options.window_url;
            optionsWindow.fn = function (data) {

                //依text_mode判斷 TextBox中的值，需使用取代(Replace)或附加(Append)
                if (that.options.text_mode != null) {
                    switch (that.options.text_mode.toString().toLowerCase()) {
                        case "replace":
                            that.Bvalue(data.text);
                            break;

                        case "append":
                            var txtValue = that.Bvalue();

                            if ((txtValue.length != 0) && (data.text.length != 0)) {
                                that.Bvalue(txtValue + data.text);
                            } else if (txtValue.length == 0) {
                                that.Bvalue(data.text);
                            }
                            break;
                    }
                }
                //在window中，執行setValue時也能觸發textbox的blur事件
                that._blur();

                if (that.options.is_escape_confirm) {
                    that._change();
                }

            };

            //設定 Options
            var objWindows = $.fn.BestWindow(optionsWindow);
            //設定 Parameter
            objWindows.parameter(that.options.parameter);
            //open window
            objWindows.open();

        },

        //Template
        _procTemplate: function (strElementID) {

            var that = this,
                optionsBase = {},           //基礎設定檔
                inputTemplate = "<input />",
                imageButtonTemplate = "<button type='button'></button>";

            //新增TextBox
            that.TextBox = $(inputTemplate);
            that.element.append(that.TextBox);
            that.TextBox.addClass(className);
            that.TextBox.on("blur" + ns, proxy(that._blur, that));

            if (that.options.is_escape_confirm) {
                that.TextBox.on("change" + ns, proxy(that._change, that));
            }

            optionsBase.placeholder = that.options.placeholder;
            optionsBase.mode = that.options.mode;
            optionsBase.special_character = that.options.special_character;
            optionsBase.allow_special_character = that.options.allow_special_character;
            optionsBase.case_format = that.options.case_format;
            optionsBase.half_full_width = that.options.half_full_width;
            optionsBase.suffix = that.options.suffix;
            optionsBase.is_target = false;

            that.TextBox.kendoBestTextBox(optionsBase);

            //依據唯讀模式調整控制項
            that._procReadonlyMode();

            //初始就唯讀情況(受整頁唯讀控管)
            if (that.options.readonly_status) {
                that.Breadonly(true);
            }

            //設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算有必填存在的狀態)
            if (that.options.required_mode != "N") {
                that.Brequired(true);
            }

            //新增button(放大鏡)
            if (that.options.is_window_enabled) {

                that.showWindowButton = $(imageButtonTemplate);

                that.showWindowButton.BestButton({
                    icon: "search",
                    is_target: false
                });

                that.showWindowButton.click(function (e) {
                    //綁定click事件
                    that._showWindowClick();
                });

                that.element.append(that.showWindowButton);

            }

            //快速查詢按鈕
            if (that.options.dataSource != null) {

                that._createButton();

            }

        },

        //依DataSource長快速查詢按鈕
        _createButton: function () {

            var that = this;

            //先清空之前的快速查詢按鈕
            that.element.find("." + quickClass).empty();

            //有幾個快速查詢資料就產生幾個快速查詢按鈕
            for (var i = 0; i < that.options.dataSource.length; i++) {

                //依據template產生物件
                that.quickButton = $(that._templates.quickButton);

                that.quickButton.BestButton({
                    value: that.options.dataSource[i][that.options.value_field],
                    text: that.options.dataSource[i][that.options.text_field]
                });

                //綁定快速按鈕事件，將點選按鈕的值放入textbox中
                that.quickButton.click(function (e) {

                    //依據不同的快速查詢按鈕取得不同的資料(在此的this為當下所按下的那個快速查詢按鈕)
                    var btnThis = $(this);

                    that._quickClick(btnThis);

                });

                //動態產生快速查詢按鈕
                that.element.append(that.quickButton);

            }

        },

        _quickClick: function (btnThis) {

            var that = this
                , realValue = btnThis.BestButton().Bvalue();

            that.element.data("kendo" + that.options.name).Bvalue(realValue);

            if (that.options.is_escape_confirm) {
                that._change();
            }

        },

        //快速查詢按鈕TAEMPLATES
        _templates: {
            quickButton: "<button type='button' class='" + quickClass + "'></button>"
        }

    });

    ui.plugin(GSSTextBoxPopUp);

})($);