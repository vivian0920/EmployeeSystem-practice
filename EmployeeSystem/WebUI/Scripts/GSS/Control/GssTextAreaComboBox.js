/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestTextAreaComboBox
 */

(function () {
    var kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget;

    var GSSTextAreaComboBox = widget.extend({
        //Init事件
        init: function (element, options) {
            var that = this,
                initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            widget.fn.init.call(that, element, options);

            that._create(element.id);
            that._readonly();
        },
        options: {
            /**
             * @property {Array} dataSource 資料來源
             * @default null
             * @MemberOf BestTextAreaComboBox
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestTextAreaComboBox
             * @MemberOf BestTextAreaComboBox
             */
            name: 'BestTextAreaComboBox',
            /**
             * @property {string} text_field 設定dataSource裡的Text Field
             * @default text
             * @MemberOf BestTextAreaComboBox
             */
            text_field: ControlDefaultsObject.TextAreaComboBox.text_field || "text",
            /**
             * @property {string} value_field 設定dataSource裡的Value Field
             * @default value
             * @MemberOf BestTextAreaComboBox
             */
            value_field: ControlDefaultsObject.TextAreaComboBox.value_field || "value",
            /**
             * @property {string} suffix 後綴詞
             * @default string.empty
             * @MemberOf BestTextAreaComboBox
             */
            suffix: ControlDefaultsObject.TextAreaComboBox.suffix || null,
            /**
             * @property {boolean} allow_short_cut 是否產生快捷按鈕
             * @default false
             * @MemberOf BestTextAreaComboBox
             */
            allow_short_cut: ControlDefaultsObject.TextAreaComboBox.allow_short_cut || false,
            //ComboBox 設定
            /**
             * @property {string} placeholder 設定ComboBox的提示訊息
             * @default string.empty
             * @MemberOf BestTextAreaComboBox
             */
            combobox_placeholder: ControlDefaultsObject.TextAreaComboBox.combobox_placeholder || "請選擇",
            /**
             * @property {String} 要顯示那些資料
             * @default ""
             * @MemberOf BestTextAreaComboBox
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            active_filter: ControlDefaultsObject.TextAreaComboBox.active_filter || null,
            /**
             * @property {String} filter ComboBox內建資料篩選方式
             * @default contains
             * @MemberOf BestTextAreaComboBox
             */
            filter: ControlDefaultsObject.TextAreaComboBox.filter || "contains",
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該DropDownList是否可選取，若設定為False也不會產生DataActiveFlag=N的快捷按鈕
             * @default False
             * @MemberOf BestTextAreaComboBox
             * @desc True:可以選擇 DataActiveFlag=N的選項<br/>False:不能選擇DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.TextAreaComboBox.allow_inactive_item || false,
            /**
             * @property {Boolean} is_webservice 資料來源是否從webService
             * @default false
             * @MemberOf BestTextAreaComboBox
             */
            is_webservice: ControlDefaultsObject.TextAreaComboBox.is_webservice || false,
            //TextAreaBox 設定
            /**
             * @property {string} mode 資料模式
             * @default None
             * @MemberOf BestTextAreaComboBox
             */
            mode: ControlDefaultsObject.TextAreaComboBox.mode || "None",
            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default string.empty
             * @MemberOf BestTextAreaComboBox
             */
            textareabox_placeholder: ControlDefaultsObject.TextAreaComboBox.textareabox_placeholder || null,
            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestTextAreaComboBox
             */
            special_character: ControlDefaultsObject.TextAreaComboBox.special_character || true,
            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestTextAreaComboBox
             * @desc 當special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            allow_special_character: ControlDefaultsObject.TextAreaComboBox.allow_special_character || "",
            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestTextAreaComboBox
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.TextAreaComboBox.case_format || "None",
            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestTextAreaComboBox
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.TextAreaComboBox.half_full_width || "None",
            //window設定
            /**
             * @property {string} title 另開視窗的Title設定
             * @default New Window
             * @MemberOf BestTextAreaComboBox
             */
            title: ControlDefaultsObject.TextAreaComboBox.title || "New Window",
            /**
             * @property {string} width 另開視窗的寬度設定
             * @default 600px
             * @MemberOf BestTextAreaComboBox
             */
            width: ControlDefaultsObject.TextAreaComboBox.width || "600px",
            /**
             * @property {array} actions 另開視窗允許的動作
             * @default ["Minimize","Maximize","Close"]
             * @MemberOf BestTextAreaComboBox
             * @desc 允許動作的設定,可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-actions)
             */
            actions: ControlDefaultsObject.TextAreaComboBox.actions || [
                "Minimize",
                "Maximize",
                "Close"
            ],
            /**
             * @property {boolean} modal 是否lock原視窗
             * @default true
             * @MemberOf BestTextAreaComboBox
             */
            modal: ControlDefaultsObject.TextAreaComboBox.modal || true,
            /**
             * @property {object} position 設定視窗呈現位置
             * @default {top: 100, left: 250}
             * @MemberOf BestTextAreaComboBox
             * @desc 其設定可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-position)
             */
            position: ControlDefaultsObject.TextAreaComboBox.position || {
                top: 100,
                left: 250
            },
            iframe: ControlDefaultsObject.TextAreaComboBox.iframe || false,
            /**
             * @property {object} parameter 傳入視窗的參數物件
             * @default null
             * @MemberOf BestTextAreaComboBox
             */
            parameter: ControlDefaultsObject.TextAreaComboBox.parameter || null,
            result: ControlDefaultsObject.TextAreaComboBox.result || null,

            /**
             * @property {boolean} allow_window 是否開啟視窗
             * @default true
             * @MemberOf BestTextAreaComboBox
             */
            allow_window: ControlDefaultsObject.TextAreaComboBox.allow_window || false,            
            /**
             * @property {string} text_mode 視窗選取的文字,採用取代或附加的方式
             * @default replace
             * @MemberOf BestTextAreaComboBox
             * @desc replace:取代文字<br/>append:附加文字
             */
            text_mode: ControlDefaultsObject.TextAreaComboBox.text_mode || "replace",
            /**
             * @property {string} window_url 另開視窗的網址
             * @default null
             * @MemberOf BestTextAreaComboBox
             */
            window_url: ControlDefaultsObject.TextAreaComboBox.window_url, //預設開啟的window直接從ControlDefaultsObject做設定
            /**
             * @property {int} rows TextArea的列數
             * @default 5
             * @MemberOf BestTextAreaComboBox
             */
            rows: ControlDefaultsObject.TextAreaComboBox.rows || "5",
            /**
             * @property {string} textarea_width TextArea寬度設定
             * @default 200
             * @MemberOf BestTextAreaComboBox
             */
            textarea_width: ControlDefaultsObject.TextAreaComboBox.textarea_width || "200",
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTextAreaComboBox
             */
            is_escape_confirm: ControlDefaultsObject.TextAreaComboBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTextAreaComboBox
             */
            is_change: ControlDefaultsObject.TextAreaComboBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestTextAreaBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestTextAreaComboBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestTextAreaComboBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestTextAreaComboBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestTextAreaComboBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestTextAreaComboBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestTextAreaComboBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },
        //產生物件
        _create: function (elmentID) {
            var that = this,
               template,
               dataSource = that.options.dataSource;
               
            //取得span template，給上ID
            template = kendo.template(that._templates.span.replace('idname', elmentID + "_Temp"));
            that.TextAreaBox = $(template(that.options));
            //將參數設至GSSTextAreaBox
            that.element.append(that.TextAreaBox);
            that.TextAreaBox.kendoBestTextAreaBox({
                suffix: that.options.suffix,
                mode: that.options.mode,
                placeholder: that.options.textareabox_placeholder,
                special_character: that.options.special_character,
                allow_special_character: that.options.allow_special_character,
                case_format: that.options.case_format,
                half_full_width: that.options.half_full_width,
                title: that.options.title,
                width: that.options.width,
                actions: that.options.actions,
                modal: that.options.modal,
                position: that.options.position,
                iframe: that.options.iframe,
                parameter: that.options.parameter,
                result: that.options.result,
                allow_window: that.options.allow_window,
                text_mode: that.options.text_mode,
                allow_window_text_only: that.options.allow_window_text_only,
                window_url: that.options.window_url,
                rows: that.options.rows,
                textarea_width: that.options.textarea_width,
                is_escape_confirm: that.options.is_escape_confirm,
                is_change: that.options.is_change
            })

            that._btnOrder();

            //取得inupt template
            template = kendo.template(that._templates.input);
            that.ComboBox = $(template(that.options));

            //依照DataSource重new一個kendo.data.DataSource
            that.options.dataSource = dataSource;

            //將參數設至GSSComboBox
            that.element.find("div[id$='_Temp']").append(that.ComboBox);
            that.ComboBox.kendoBestComboBox({
                dataSource: that.options.dataSource,
                text_field: that.options.text_field,
                value_field: that.options.value_field,
                allow_shortcut: that.options.allow_short_cut,
                suffix: that.options.suffix,
                placeholder: that.options.combobox_placeholder,
                active_filter: that.options.active_filter,
                filter: that.options.filter,
                allow_inactive_item: that.options.allow_inactive_item,
                is_webservice: that.options.is_webservice,
                is_escape_confirm: that.options.is_escape_confirm,
                is_change: that.options.is_change
            })
        },

        //長出按鈕
        _btnOrder: function () {
            var that = this;
            //按鈕-左移
            template = kendo.template(that._templates.leftButton);
            that.leftButton = $(template(that.options));
            
            //綁定按鈕-左移click事件
            that.leftButton.click(function (e) {
                that._leftClick();
            });
            
            //先找到TextAreaBox在加上BTN
            that.element.find("div[id$='_Temp']").append(that.leftButton);
        },

        //按鈕左移事件
        _leftClick: function () {
            var that = this,
                kendoBestTextAreaBox = that.TextAreaBox.data("kendoBestTextAreaBox"),
                kendoBestComboBox = that.ComboBox.data("kendoBestComboBox");

            var strComboBoxText = kendoBestComboBox.Btext();

            //依text_mode判斷 TextBox中的值，需使用取代(Replace)或附加(Append)
            if (that.options.text_mode != null) {
                switch (that.options.text_mode.toString().toLowerCase()) {
                    case "replace":
                        kendoBestTextAreaBox.Bvalue(strComboBoxText);
                        break;

                    case "append":
                        var txtValue = kendoBestTextAreaBox.Bvalue();

                        if ((txtValue.length != 0) && (strComboBoxText.length != 0)) {
                            kendoBestTextAreaBox.Bvalue(txtValue + "\n" + strComboBoxText);
                        } else if (txtValue.length == 0) {
                            kendoBestTextAreaBox.Bvalue(strComboBoxText);
                        }
                        break;
                }
            }
            if (this.options.is_escape_confirm) {
                this.options.is_change = true;
            }
        },

        //設定唯讀處理
        _readonly: function () {
            var that = this;
            var disabled = that.element.is("[disabled]")
            var readonly = that.element.is("[readonly]")

            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(readonly);
            }

        },
        readonly: function (readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly
            });
        },

        enable: function (enable) {
            this._editable({
                disable: enable = enable === undefined ? true : enable
            });
        },

        //處理是否可編輯
        _editable: function (options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                objTextAreaBox = that.TextAreaBox.data("kendoBestTextAreaBox"),
                objComboBox = that.ComboBox.data("kendoBestComboBox");
            if (readonly !== undefined) {
                objTextAreaBox.Breadonly(readonly);
                objComboBox.Breadonly(readonly);
            }
        },

        /**
         * @desc 取得TextAreaComboBox的ComboBox所選取的值
         * @memberof BestTextAreaComboBox
         * @method ComboBoxValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取TextAreaComboBox的ComboBox所選取的值
         * @example
         * 取值:element.BestTextAreaComboBox().ComboBoxValue();
         * 設值:element.BestTextAreaComboBox().ComboBoxValue(setValue);
         */
        ComboBoxValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.ComboBox.data("kendoBestComboBox").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.ComboBox.data("kendoBestComboBox").Bvalue(setValue);
            }
        },

        /**
         * @desc 取得TextAreaComboBox的ComboBox所選取的文字
         * @memberof BestTextAreaComboBox
         * @method ComboBoxText
         * @param {String} setText 設定文字(可不傳)
         * @return {String} 取TextAreaComboBox的ComboBox所選取的文字
         * @example
         * 取值:element.BestTextAreaComboBox().ComboBoxText();
         * 設值:element.BestTextAreaComboBox().ComboBoxText(setText);
         */
        ComboBoxText: function (setText) {
            var that = this;
            //取值
            if (setText == null) {
                return that.ComboBox.data("kendoBestComboBox").Btext();
            }
            //設值
            if (setText != null) {
                return that.ComboBox.data("kendoBestComboBox").Btext(setText);
            }
        },

        /**
         * @desc 取得TextAreaComboBox的TextAreaBox所選取的值
         * @memberof BestTextAreaComboBox
         * @method TextAreaValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取TextAreaComboBox的TextAreaBox所選取的值
         * @example
         * 取值:element.BestTextAreaComboBox().TextAreaValue();
         * 設值:element.BestTextAreaComboBox().TextAreaValue(setValue);
         */
        TextAreaValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.TextAreaBox.data("kendoBestTextAreaBox").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.TextAreaBox.data("kendoBestTextAreaBox").Bvalue(setValue);
            }
        },

        //快速查詢按鈕TAEMPLATES
        _templates: {
            input: "<input id='BestComboBox' style='vertical-align:top'/>'",
            span: "<div id='Bestidname'/>'",
            leftButton: "<input type='button' id='Bleft' value='←' style='vertical-align:top;width:15px'/>"
        }
    });

    ui.plugin(GSSTextAreaComboBox);
})(jQuery);