/// <reference path="../Data/ControlDefaultsObject.js" />

/**
 * @class BestPairTextBoxPopUp
 */

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget,
        ns = ".kendoPairTextBoxPopUp",
        className = "kendoPairTextBoxPopUp",
        proxy = $.proxy;

    var GSSPairTextBoxPopUp = widget.extend({

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

        },

        //設定options
        options: {

            /**
             * @property {string} name 物件名稱
             * @default BestPairTextBoxPopUp
             * @MemberOf BestPairTextBoxPopUp
             */
            name: "BestPairTextBoxPopUp",

            /**
             * @property {string} first_suffix First TextBox的後綴詞
             * @default string.empty
             * @MemberOf BestPairTextBoxPopUp
             */
            first_suffix: ControlDefaultsObject.PairTextBoxPopUp.first_suffix || null,

            /**
             * @property {string} second_suffix Second TextBox的後綴詞
             * @default string.empty
             * @MemberOf BestPairTextBoxPopUp
             */
            second_suffix: ControlDefaultsObject.PairTextBoxPopUp.second_suffix || null,

            /**
             * @property {string} first_mode First TextBox的資料模式
             * @default None
             * @MemberOf BestPairTextBoxPopUp
             */
            first_mode: ControlDefaultsObject.PairTextBoxPopUp.first_mode || "None",

            /**
             * @property {string} second_mode Second TextBox的資料模式
             * @default None
             * @MemberOf BestPairTextBoxPopUp
             */
            second_mode: ControlDefaultsObject.PairTextBoxPopUp.second_mode || "None",

            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default null
             * @MemberOf BestPairTextBoxPopUp
             */
            placeholder: ControlDefaultsObject.PairTextBoxPopUp.placeholder || null,

            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestPairTextBoxPopUp
             */
            special_character: ControlDefaultsObject.PairTextBoxPopUp.special_character || true,

            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestPairTextBoxPopUp
             */
            allow_special_character: ControlDefaultsObject.PairTextBoxPopUp.allow_special_character || "",

            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestPairTextBoxPopUp
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.PairTextBoxPopUp.case_format || "None",

            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestPairTextBoxPopUp
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.PairTextBoxPopUp.half_full_width || "None",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestPairTextBoxPopUp
             * @desc Y:兩個TextBox皆為必填<br/>
                     1:第一個TextBox必填,第二個TextBox非必填<br/>
                     2:第一個TextBox非必填,第二個TextBox必填<br/>
                     3:擇一必填<br/>
                     4:成對填或成對不填<br/>
                     N:兩個TextBox皆非必填
             */
            required_mode: ControlDefaultsObject.PairTextBoxPopUp.required_mode || "N",

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestPairTextBoxPopUp
             * @desc Y:兩個TextBox皆為唯讀<br/>
                     1:第一個TextBox唯讀,第二個TextBox非唯讀<br/>
                     2:第一個TextBox非唯讀,第二個TextBox唯讀<br/>
                     N:兩個TextBox皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.PairTextBoxPopUp.readonly_mode || "N",

            //window設定
            /**
             * @property {string} title 另開視窗的Title設定
             * @default New Window
             * @MemberOf BestPairTextBoxPopUp
             */
            title: ControlDefaultsObject.PairTextBoxPopUp.title || "New Window",

            /**
             * @property {string} width 另開視窗的寬度設定
             * @default 600px
             * @MemberOf BestPairTextBoxPopUp
             */
            width: ControlDefaultsObject.PairTextBoxPopUp.width || "600px",

            /**
             * @property {array} actions 另開視窗允許的動作
             * @default ["Minimize","Maximize","Close"]
             * @MemberOf BestPairTextBoxPopUp
             * @desc 允許動作的設定,可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-actions)
             */
            actions: ControlDefaultsObject.PairTextBoxPopUp.actions || [
                "Minimize",
                "Maximize",
                "Close"
            ],

            /**
             * @property {boolean} modal 是否lock原視窗
             * @default true
             * @MemberOf BestPairTextBoxPopUp
             */
            modal: ControlDefaultsObject.PairTextBoxPopUp.modal || true,

            /**
             * @property {object} position 設定視窗呈現位置
             * @default {top: 100, left: 250}
             * @MemberOf BestPairTextBoxPopUp
             * @desc 其設定可參閱Kendo.window的Api文件(http://docs.telerik.com/kendo-ui/api/web/window#configuration-position)
             */
            position: ControlDefaultsObject.PairTextBoxPopUp.position || {
                top: 100,
                left: 250
            },

            iframe: ControlDefaultsObject.PairTextBoxPopUp.iframe || false,

            /**
             * @property {object} parameter 傳入視窗的參數物件
             * @default null
             * @MemberOf BestPairTextBoxPopUp
             */
            parameter: null,
            result: null,

            /**
             * @property {string} window_url 另開視窗的網址
             * @default null
             * @MemberOf BestPairTextBoxPopUp
             */
            window_url: ControlDefaultsObject.PairTextBoxPopUp.window_url || "",

            //PairTextBoxPopUp 設定 
            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestPairTextBoxPopUp
             */
            dataSource: null,

            /**
             * @property {boolean} is_query_data 第二個TextBox是否根據第一個TextBox的值進行查詢
             * @default false
             * @MemberOf BestPairTextBoxPopUp
             */
            is_query_data: ControlDefaultsObject.PairTextBoxPopUp.is_query_data || false,

            /**
             * @property {boolean} is_window_enabled 放大鏡是否要呈現
             * @default true
             * @MemberOf BestPairTextBoxPopUp
             */
            is_window_enabled: ControlDefaultsObject.PairTextBoxPopUp.is_window_enabled || true,

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTextBox
             */
            is_escape_confirm: ControlDefaultsObject.PairTextBoxPopUp.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTextBox
             */
            is_change: ControlDefaultsObject.PairTextBoxPopUp.is_change || false,

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
         * @desc 設/取值 First TextBox Value
         * @MemberOf BestPairTextBoxPopUp
         * @method firstValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 First TextBox Value
         * @example
         * 取值:element.BestPairTextBoxPopUp().firstValue();
         * 設值:element.BestPairTextBoxPopUp().firstValue(setValue);
         */
        firstValue: function (setValue) {
            var that = this, objFirst = that.FirstTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objFirst.Bvalue();
            }

            //設值
            if (setValue != null) {
                objFirst.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 Second TextBox Value
         * @MemberOf BestPairTextBoxPopUp
         * @method secondValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 Second TextBox Value
         * @example
         * 取值:element.BestPairTextBoxPopUp().secondValue();
         * 設值:element.BestPairTextBoxPopUp().secondValue(setValue);
         */
        secondValue: function (setValue) {
            var that = this, objSecond = that.SecondTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objSecond.Bvalue();
            }

            //設值
            if (setValue != null) {
                objSecond.Bvalue(setValue);
            }

        },

        /**
        * @desc 唯讀處理
        * @MemberOf BestPairTextBoxPopUp
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestPairTextBoxPopUp().Breadonly();
        * 取消唯讀:element.BestPairTextBoxPopUp().Breadonly(false);
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

            //放大鏡按鈕
            if (that.options.is_window_enabled) {

                if (isReadonly) {
                    that.showWindowButton.hide();
                }
                else {
                    that.showWindowButton.show();
                }

            }

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestPairTextBoxPopUp
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
         * @memberof BestPairTextBoxPopUp
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
         * @memberof BestPairTextBoxPopUp
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
         * @memberof BestPairTextBoxPopUp
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
                loadingIcon = '<span class="k-icon k-loading" style="margin-left: -20px; margin-right: 5px; margin-top: 0px;"></span>';

            if (isLock) {
                that.FirstTextBox.attr("readonly", true).after(loadingIcon);
                that.SecondTextBox.attr("readonly", true).after(loadingIcon);
            }
            else {
                that.FirstTextBox.removeAttr("readonly");
                that.SecondTextBox.removeAttr("readonly");
                that.element.find(".k-loading").remove();
            }

        },

        //blur事件 當textbox onblur時，依dataSouece撈出對應的值
        _findDataByKey: function () {
            var that = this,
                objFirst = that.FirstTextBox.data("kendoBestTextBox"),
                objSecond = that.SecondTextBox.data("kendoBestTextBox"),
                firstField = objFirst.Bvalue();

            //先清空資料
            objSecond.Bvalue("");

            //表示資料從外面傳進來
            if (that.options.dataSource != null) {

                for (var i = 0; i < that.options.dataSource.length; i++) {

                    if (firstField == that.options.dataSource[i].id) {
                        objSecond.Bvalue(that.options.dataSource[i].name);
                        break;
                    }

                }

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

            if (that.firstValue().length > 0 || that.secondValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {

            var that = this,
                isKeyInVal = false,
                objFirst = that.FirstTextBox.data("kendoBestTextBox"),
                objSecond = that.SecondTextBox.data("kendoBestTextBox");

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":   //First & Second皆必填

                    if (that.options.is_window_enabled) {

                        if (that.firstValue().length > 0 && that.secondValue().length > 0) {
                            isKeyInVal = true;
                        } else {
                            isKeyInVal = false;
                        }

                    }
                    else {

                        if (!objFirst._chkReadOnlyStatus() && that.firstValue().length == 0) {
                            isKeyInVal = false;
                        }
                        else if (!objSecond._chkReadOnlyStatus() && that.secondValue().length == 0) {
                            isKeyInVal = false;
                        }
                        else {
                            isKeyInVal = true;
                        }

                    }

                    break;

                case "1":   //First 必填 Second非必填

                    if (that.options.is_window_enabled) {

                        if (that.firstValue().length > 0) {
                            isKeyInVal = true;
                        } else {
                            isKeyInVal = false;
                        }

                    }
                    else {

                        if (!objFirst._chkReadOnlyStatus() && that.firstValue().length == 0) {
                            isKeyInVal = false;
                        }
                        else {
                            isKeyInVal = true;
                        }

                    }

                    break;

                case "2":   //First 非必填 Second必填

                    if (that.options.is_window_enabled) {

                        if (that.secondValue().length > 0) {
                            isKeyInVal = true;
                        } else {
                            isKeyInVal = false;
                        }

                    }
                    else {

                        if (!objSecond._chkReadOnlyStatus() && that.secondValue().length == 0) {
                            isKeyInVal = false;
                        }
                        else {
                            isKeyInVal = true;
                        }

                    }

                    break;

                case "3":   //First Second 擇一填

                    if (that.options.is_window_enabled) {

                        if (that.firstValue().length > 0 || that.secondValue().length > 0) {
                            isKeyInVal = true;
                        } else {
                            isKeyInVal = false;
                        }

                    }
                    else {

                        if (!objFirst._chkReadOnlyStatus() && that.firstValue().length > 0) {
                            isKeyInVal = true;
                        }
                        else if (!objSecond._chkReadOnlyStatus() && that.secondValue().length > 0) {
                            isKeyInVal = true;
                        }
                        else if (objFirst._chkReadOnlyStatus() && objSecond._chkReadOnlyStatus()) {
                            isKeyInVal = true;
                        }
                        else {
                            isKeyInVal = false;
                        }

                    }

                    break;

                case "4":   //First Second 成對填,要填都要填;反之,都不填

                    if (that.options.is_window_enabled) {

                        if (that.firstValue().length > 0 || that.secondValue().length > 0) {
                            if (that.firstValue().length > 0 && that.secondValue().length > 0) {
                                isKeyInVal = true;
                            }
                            else {
                                isKeyInVal = false;
                            }
                        }
                        else {
                            isKeyInVal = true;
                        }

                    }
                    else {

                        if ((!objFirst._chkReadOnlyStatus() && that.firstValue().length == 0)
                            && (!objSecond._chkReadOnlyStatus() && that.secondValue().length == 0)) {
                            isKeyInVal = true;
                        }
                        else if ((!objFirst._chkReadOnlyStatus() && that.firstValue().length > 0)
                                 && (!objSecond._chkReadOnlyStatus() && that.secondValue().length > 0)) {
                            isKeyInVal = true;
                        }
                        else if (objFirst._chkReadOnlyStatus() || objSecond._chkReadOnlyStatus()) {
                            isKeyInVal = true;
                        }
                        else {
                            isKeyInVal = false;
                        }

                    }

                    break;

                case "N":   //First & Second皆非必填
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
                firstTextBoxReadOnlyMode = "",
                secondTextBoxReadOnlyMode = "",
                objFirst = that.FirstTextBox.data("kendoBestTextBox"),
                objSecond = that.SecondTextBox.data("kendoBestTextBox");

            switch (strReadonlyMode) {
                case "Y":   //Both Readonly
                    firstTextBoxReadOnlyMode = "Y";
                    secondTextBoxReadOnlyMode = "Y";
                    break;
                case "1":   //First Readonly Second Not Readonly
                    firstTextBoxReadOnlyMode = "Y";
                    secondTextBoxReadOnlyMode = "N";
                    break;
                case "2":   //First Not Readonly Second Readonly
                    firstTextBoxReadOnlyMode = "N";
                    secondTextBoxReadOnlyMode = "Y";
                    break;
                case "N":   //Both Not Readonly
                    firstTextBoxReadOnlyMode = "N";
                    secondTextBoxReadOnlyMode = "N";
                    break;

            }

            //設定第一個textbox的唯讀
            objFirst.BsetOptions({
                readonly_mode: firstTextBoxReadOnlyMode
            });

            if (firstTextBoxReadOnlyMode == "Y") {
                objFirst.Breadonly();
            }
            else {
                objFirst.Breadonly(false);
            }

            //設定第二個textbox的唯讀
            objSecond.BsetOptions({
                readonly_mode: secondTextBoxReadOnlyMode
            });

            if (secondTextBoxReadOnlyMode == "Y") {
                objSecond.Breadonly();
            }
            else {
                objSecond.Breadonly(false);
            }

        },

        //放大鏡綁定click事件
        _showWindowClick: function () {
            var that = this,
                optionsWindow = {};

            optionsWindow.title = that.options.title;
            optionsWindow.content = that.options.window_url;
            optionsWindow.fn = function (data) {
                //依Window中的值，給PairTextBox
                that.firstValue(data[0].text);
                that.secondValue(data[1].text);

                //在window中，執行setValue時也能觸發textbox的blur事件
                that._blur();

                //記錄變更記錄
                that.options.is_change = true;

            };

            //設定 Options
            $.fn.BestWindow(optionsWindow);
            $.fn.BestWindow().parameter(that.options.parameter);

            //open window
            $.fn.BestWindow().open();

        },

        //Template
        _procTemplate: function () {
            var that = this,
                optionsBase = {},           //基礎設定檔
                optionsFirst = {},          //StartTextBox的設定檔
                optionsSecond = {},         //EndTextBox的設定檔
                inputTemplate = "<input />",
                imageButtonTemplate = '<button type="button"></button>';

            //新增 FirstTextBox
            that.FirstTextBox = $(inputTemplate);
            that.element.append(that.FirstTextBox);
            that.FirstTextBox.addClass(className);
            that.FirstTextBox.on("blur" + ns, proxy(that._blur, that));

            //Append 兩個TextBox之間的空間 by Steven
            that.element.append("&nbsp;");

            //新增 SecondTextBox
            that.SecondTextBox = $(inputTemplate);
            that.element.append(that.SecondTextBox);
            that.SecondTextBox.addClass(className);
            that.SecondTextBox.on("blur" + ns, proxy(that._blur, that));

            if (that.options.is_escape_confirm) {
                that.FirstTextBox.on("change" + ns, proxy(that._change, that));
                that.SecondTextBox.on("change" + ns, proxy(that._change, that));
            }

            //整理optionsBase
            optionsBase.placeholder = that.options.placeholder;
            optionsBase.special_character = that.options.special_character;
            optionsBase.allow_special_character = that.options.allow_special_character;
            optionsBase.case_format = that.options.case_format;
            optionsBase.half_full_width = that.options.half_full_width;

            //PairTextBoxPopUp中，suffix、mode可以分別設定
            optionsFirst = optionsBase;
            optionsFirst.suffix = that.options.first_suffix;
            optionsFirst.mode = that.options.first_mode;
            optionsFirst.is_target = false;
            that.FirstTextBox.kendoBestTextBox(optionsFirst);

            optionsSecond = optionsBase;
            optionsSecond.suffix = that.options.second_suffix;
            optionsSecond.mode = that.options.second_mode;
            optionsSecond.is_target = false;
            that.SecondTextBox.kendoBestTextBox(optionsSecond);

            //註冊連動事件
            if (that.options.is_query_data) {
                that.FirstTextBox.on("blur.FirstChange", proxy(that._findDataByKey, that));
            }

            //依據唯讀模式調整控制項
            that._procReadonlyMode();

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

                that.element.append("&nbsp;").append(that.showWindowButton);

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

    ui.plugin(GSSPairTextBoxPopUp);

})($);