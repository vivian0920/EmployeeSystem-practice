/**
 * @class BestTextAreaBox
 */

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget,
        ns = ".BestTextAreaBox",
        className = "BestTextAreaBox",
        proxy = $.proxy;


    var GSSTextAreaBox = widget.extend({

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

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestTextAreaBox
             * @MemberOf BestTextAreaBox
             */
            name: "BestTextAreaBox",
            /**
             * @property {string} suffix 後綴詞
             * @default string.empty
             * @MemberOf BestTextAreaBox
             */
            suffix: ControlDefaultsObject.TextAreaBox.suffix || null,
            /**
             * @property {string} mode 資料模式
             * @default None
             * @MemberOf BestTextAreaBox
             */
            mode: ControlDefaultsObject.TextAreaBox.mode || "None",
            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default string.empty
             * @MemberOf BestTextAreaBox
             */
            placeholder: ControlDefaultsObject.TextAreaBox.placeholder || null,
            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestTextAreaBox
             */
            special_character: ControlDefaultsObject.TextAreaBox.special_character || true,
            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestTextAreaBox
             * @desc 當special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            allow_special_character: ControlDefaultsObject.TextAreaBox.allow_special_character || "",
            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestTextAreaBox
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.TextAreaBox.case_format || "None",
            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestTextAreaBox
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.TextAreaBox.half_full_width || "None",            
            /**
             * @property {object} dataSource 資料物件(快捷鈕)
             * @default null
             * @MemberOf BestTextAreaBox
             */
            dataSource: {},

            //window設定
            /**
             * @property {string} title 另開視窗的Title設定
             * @default New Window
             * @MemberOf BestTextAreaBox
             */
            title: ControlDefaultsObject.TextAreaBox.title || "New Window",
            /**
             * @property {string} width 另開視窗的寬度設定
             * @default 600px
             * @MemberOf BestTextAreaBox
             */
            width: ControlDefaultsObject.TextAreaBox.width || "600px",
            /**
             * @property {array} actions 另開視窗允許的動作
             * @default ["Minimize","Maximize","Close"]
             * @MemberOf BestTextAreaBox
             * @desc 允許動作的設定,可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-actions)
             */
            actions: ControlDefaultsObject.TextAreaBox.actions || [
                "Minimize",
                "Maximize",
                "Close"
            ],
            /**
             * @property {boolean} modal 是否lock原視窗
             * @default true
             * @MemberOf BestTextAreaBox
             */
            modal: ControlDefaultsObject.TextAreaBox.modal || true,
            /**
             * @property {object} position 設定視窗呈現位置
             * @default {top: 100, left: 250}
             * @MemberOf BestTextAreaBox
             * @desc 其設定可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-position)
             */
            position: ControlDefaultsObject.TextAreaBox.position || {
                top: 100,
                left: 250
            },
            iframe: ControlDefaultsObject.TextAreaBox.iframe || false,
            /**
             * @property {object} parameter 傳入視窗的參數物件
             * @default null
             * @MemberOf BestTextAreaBox
             */
            parameter: null,
            result: null,

            //TextAreaBox 設定
            /**
             * @property {boolean} allow_window 是否開啟視窗
             * @default true
             * @MemberOf BestTextAreaBox
             */
            allow_window: ControlDefaultsObject.TextAreaBox.allow_window || true,
            /**
             * @property {boolean} allow_window_text_only 是否允許輸入或只能透過視窗選取
             * @default true
             * @MemberOf BestTextAreaBox
             * @desc true:能允許輸入或視窗選取<br/>false:僅可透過視窗選取
             */
            allow_window_text_only: ControlDefaultsObject.TextAreaBox.allow_special_character || true,
            /**
             * @property {string} text_mode 視窗選取的文字,採用取代或附加的方式
             * @default replace
             * @MemberOf BestTextAreaBox
             * @desc replace:取代文字<br/>append:附加文字
             */
            text_mode: ControlDefaultsObject.TextAreaBox.text_mode || "replace",
            /**
             * @property {string} window_url 另開視窗的網址
             * @default null
             * @MemberOf BestTextAreaBox
             */
            window_url: ControlDefaultsObject.TextAreaBox.window_url, //預設開啟的window直接從ControlDefaultsObject做設定
            /**
             * @property {string} text_field 設定dataSource裡的Text Field
             * @default text
             * @MemberOf BestTextAreaBox
             */
            text_field: ControlDefaultsObject.TextAreaBox.text_field || "text",
            /**
             * @property {string} value_field 設定dataSource裡的Value Field
             * @default value
             * @MemberOf BestTextAreaBox
             */
            value_field: ControlDefaultsObject.TextAreaBox.value_field || "value",
            /**
             * @property {int} rows TextArea的列數
             * @default 5
             * @MemberOf BestTextAreaBox
             */
            rows: ControlDefaultsObject.TextAreaBox.rows || "5",
            /**
             * @property {string} textarea_width TextArea寬度設定
             * @default 200
             * @MemberOf BestTextAreaBox
             */
            textarea_width: ControlDefaultsObject.TextAreaBox.textarea_width || "200",
            /**
             * @property {boolean} allow_short_cut 是否產生快捷按鈕
             * @default false
             * @MemberOf BestTextAreaBox
             */
            allow_short_cut: ControlDefaultsObject.TextAreaBox.allow_short_cut || false,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTextAreaBox
             */
            is_escape_confirm: ControlDefaultsObject.TextAreaBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTextAreaBox
             */
            is_change: ControlDefaultsObject.TextAreaBox.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestTextAreaBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestTextAreaBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestTextAreaBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestTextAreaBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestTextAreaBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestTextAreaBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestTextAreaBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },       

        /**
        * @desc 唯讀處理
        * @MemberOf BestTextAreaBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestTextAreaBox().Breadonly();
        * 取消唯讀:element.BestTextAreaBox().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly;

            //readonly為false
            if (!isReadonly) {
                //非唯讀狀態, 則要依據readonly_mode回到初始狀態
                switch (that.options.readonly_mode.toString()) {
                    case "Y":   //唯讀
                        isReadonly = true;
                        break;
                    case "N":   //非唯讀
                        isReadonly = false;
                        break;
                }
            }

            //執行是否可編輯處理
            that.TextBox.BestTextBox().Breadonly(readonly);

            if (that.options.allow_short_cut) {
                that.quickButton.BestQuickButton().Breadonly(readonly);
            }

            if (that.showWindowButton != null) {
                if (isReadonly) {
                    that.showWindowButton.hide();
                } else {
                    that.showWindowButton.show();
                }
            }

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestTextAreaBox
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
         * @desc 設定控制項的options
         * @memberof BestTextAreaBox
         * @method BsetOptions
         * @example
         * 設定options: element.BsetOptions({ readonly_mode: "2" });
         */
        BsetOptions: function (options) {

            var that = this;

            widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設/取值 TextAreaBox value
         * @memberof BestTextAreaBox
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 TextAreaBox Value
         * @example
         * 取值:element.BestTextAreaBox().Bvalue();
         * 設值:element.BestTextAreaBox().Bvalue(setValue);
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
         * @desc 設定游標在控制項上
         * @memberof BestTextAreaBox
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            //取得data-role含有best,且具有required,但非含有readonly,disabled的control
            that.element.find("[data-role*=best]:not([readonly=true],[readonly=readonly],[disabled]):first").focus();

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
            var that = this;

            //有放大鏡功能
            if (that.options.allow_window) {
                if (that.Bvalue().length > 0) {
                    return true;
                } else {
                    return false;
                }
            }

            if (!that.options.allow_window) {
                if (!that.TextBox.BestTextBox()._chkReadOnlyStatus() && that.Bvalue().length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
            
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

        //放大鏡綁定click事件
        _showWindowClick: function () {
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
            $.fn.BestWindow(optionsWindow);
            //設定 Parameter
            $.fn.BestWindow().parameter(that.options.parameter);
            //open window
            $.fn.BestWindow().open();
        },

        //Template
        _procTemplate: function () {
            var that = this,
                input = "<textarea/>",
                imageButton = "<button type='button'></button>",
                quickButton="<span/>"
                optionsBase = {};           //基礎設定檔

            //新增TextArea
            that.TextBox = $(input);
            that.element.append(that.TextBox);               
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
            optionsBase.is_target = false;
            that.TextBox.kendoBestTextBox(optionsBase);

            that.TextBox.addClass(className);
            that.TextBox.removeClass("best-textbox");

            //TextArea行數及寬度
            that.TextBox.attr('rows', that.options.rows);
            that.TextBox.width(that.options.textarea_width);

            //新增button(放大鏡)
            if (that.options.allow_window) {

                that.showWindowButton = $(imageButton);

                that.showWindowButton.BestButton({
                    icon: "search",
                    is_target: false
                })

                that.element.append(that.showWindowButton);

                that.showWindowButton.css('vertical-align', 'top');

                that.showWindowButton.click(function (e) {
                    //綁定click事件
                    that._showWindowClick();
                });
            }

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.append("&nbsp;" + that.options.suffix);
            };

            //製作快速鍵
            if (that.options.allow_short_cut) {
                that.quickButton = $(quickButton);
                that.quickButton.BestQuickButton({
                    dataSource: that.options.dataSource,
                    text_field: that.options.text_field,
                    value_field: that.options.value_field,
                    fn: function (text, value) {

                        that.TextBox.BestTextBox().Bvalue(text);

                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                        }

                        if (that.options.is_escape_confirm) {
                            that._change();
                        }
                    }
                });

                that.quickButton.css('vertical-align', 'top');
                that.element.append("&nbsp;").append(that.quickButton);
            }
            
        }
    });

    ui.plugin(GSSTextAreaBox);

    //===================================== Private Method  =====================================
    function ProcReadonly(obj) {
        /// <summary>
        /// 處理element是否唯讀
        /// </summary>

        //初始就唯讀情況
        //1. 依據唯讀模式設定控制項唯讀
        //2. 受整頁唯讀控管
        if (obj.options.readonly_mode == "Y" || obj.options.readonly_status) {
            obj.Breadonly(true);
        }

    }

    function ProcRequired(obj) {
        /// <summary>
        /// 處理element是否必填
        /// </summary>

        //設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算必填狀態)
        if (obj.options.required_mode != "N") {
            obj.Brequired(true);
        }
    }

    //===================================== Private Method  =====================================

})($);