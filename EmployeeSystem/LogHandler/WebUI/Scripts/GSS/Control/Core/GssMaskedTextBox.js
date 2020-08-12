/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @classdesc 繼承kendo.MaskedTextBox <a href="http://docs.telerik.com/kendo-ui/api/web/maskedtextbox" target="_blank"> Reference </a>
 * @class BestMaskedTextBox
 */

(function () {
    var kendo = window.kendo,
         ui = kendo.ui,
         proxy = $.proxy,
         maskedtextbox = ui.MaskedTextBox,
         STATEDISABLED = "k-state-disabled",
         DISABLED = "disabled",
         READONLY = "readonly",
         ns = ".kendoMaskedTextBox",
         INPUT_EVENT_NAME = (kendo.support.propertyChangeEvent ? "propertychange" : "input") + ns;

    var GSSMaskedTextBox = maskedtextbox.extend({

        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            //處理options資料
            setObject=that._SetOptions(options);

            maskedtextbox.fn.init.call(that, element, setObject);

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);

            that.element.on("blur" + ns, proxy(that._procMaskLength, that));

            that.element.on("blur"+ns, proxy(function(){
                if (that._chkRequired()) {

                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }

                }
            },that));

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.after("&nbsp;<span>" + that.options.suffix + "</span>");
            }
        },

        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestMaskedTextBox
             * @MemberOf BestMaskedTextBox
             */
            name: "BestMaskedTextBox",
            /**
             * @property {string} format_type 資料模式
             * @default string.empty
             * @MemberOf BestMaskedTextBox
             * @desc Phone:電話<br/>PhoneExt:電話含分機<br/>Mobile:手機<br/>CreditCard:信用卡<br/>LandNo:地號<br/>BuildNo:建號
             */
            format_type: ControlDefaultsObject.MaskedTextBox.format_type || null,
            /**
             * @property {string} suffix 後綴詞
             * @default string.empty
             * @MemberOf BestMaskedTextBox
             */
            suffix: ControlDefaultsObject.MaskedTextBox.suffix || null,
            /**
             * @property {string} mask 資料格式
             * @default null
             * @MemberOf BestMaskedTextBox
             * @desc 當format_type的設定不在內定值中,則資料呈現的格式才會採用此設定。自訂方式可參閱kendo Api文件。
             */
            mask: ControlDefaultsObject.MaskedTextBox.mask || null,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestMaskedTextBox
             */
            is_escape_confirm: ControlDefaultsObject.MaskedTextBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestMaskedTextBox
             */
            is_change: ControlDefaultsObject.MaskedTextBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestMaskedTextBox
             */
            is_target: true,
            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestMaskedTextBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,
            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestMaskedTextBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",            
            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestMaskedTextBox
             */
            error_message: "",
            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestMaskedTextBox
             */
            validation_group: "",
            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestMaskedTextBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",
            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestMaskedTextBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false,
            //change 事件
            change: function () {
                if (that.options.is_escape_confirm) {
                    that.options.is_change = true;
                }
            }
        },

        /**
        * @desc 唯讀處理
        * @MemberOf BestMaskedTextBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestMaskedTextBox().Breadonly();
        * 取消唯讀:element.BestMaskedTextBox().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                isDisable = false;

            //執行原生的readonly method
            that.readonly(isReadonly);

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
            this._editable({
                readonly: isReadonly,
                disable: isDisable
            });

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestMaskedTextBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestMaskedTextBox().Brequired();
         * 不必填: element.BestMaskedTextBox().Brequired(false);
         */
        Brequired: function (required) {

            var that = this
                , isRequired = required === undefined ? true : required;

            if (!isRequired) {
                if (that.options.required_mode != "N") {
                    isRequired = true;
                }
            }

            //設定控制項必填狀態
            that.options.required_status = isRequired;

        },

        /**
         * @desc 重新設定Options
         * @memberof BestMaskedTextBox
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestTextBox().BsetOptions(obj);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            ui.Widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設/取 值
         * @MemberOf BestMaskedTextBox
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得處理後的值
         * @example
         * 取值:element.BestMaskedTextBox().Bvalue();
         * 設值:element.BestMaskedTextBox().Bvalue(setValue);
         */
        Bvalue: function (setValue) {
            var that = this,
                 area = "",
                 phone = "",
                 extension = "",
                 complete = "",
                 startPhone = 0,
                 endPhone = 0;

            //取值
            if (setValue == null) {

                complete = that.element.data("kendo" + that.options.name).value().toString().replace(/\_|\s/g, "");

                //處理Phone & PhoneExt字串
                if (that.options.format_type == "Phone" || that.options.format_type == "PhoneExt") {

                    //若無keyin區碼資料,則不回傳()
                    if (complete.indexOf("(") - complete.indexOf(")") == -1) {
                        complete = complete.replace(/\(\)/g, "");
                    }

                    //若無keyin分機資料,則不回傳-
                    if (complete.indexOf("-") !== 0 && complete.replace(/\s/g, "").length == (complete.replace(/\s/g, "").indexOf("-") + 1)) {
                        complete = complete.replace(/\-/g, "");
                    }
                }

                return $.trim(complete);
            };

            //設值
            if (setValue != null) {

                complete = setValue.replace(/\s/g, "");

                //處理Phone & PhoneExt字串
                if (that.options.format_type == "Phone" || that.options.format_type == "PhoneExt") {

                    //處理區碼
                    if (complete.search(/\(/g) !== -1 && complete.search(/\)/g) !== -1) {
                        area = complete.substring(complete.indexOf("(") + 1, complete.indexOf(")"));                        
                    } else {
                        //當區碼的括號無成雙成對時,則為不合理資料,預設為清空
                        if (!(complete.search(/\(/g) == -1 && complete.search(/\)/g) == -1)) {
                            complete = "";
                        } else {
                            area = "";
                        }
                    }

                    area = "(" + area.padLeft(3, "_") + ")";

                    //處理電話
                    if (complete !== "") {

                        //根據是否有區碼,來取得phone的資料起點
                        if (complete.search(/\(/g) !== -1) {
                            startPhone = complete.indexOf(")") + 1;
                        } else {
                            startPhone = 0;
                        }

                        //根據是否有分機,來取得phone的資料迄點
                        if (complete.search(/\-/g) !== -1) {
                            endPhone = complete.indexOf("-");
                        } else {
                            endPhone = complete.length;
                        }

                        phone = complete.substring(startPhone, endPhone).padRight(9, "_").substr(0, 9);
                    }

                    //處理分機
                    if (complete !== "") {
                        if (complete.search(/\-/g) !== -1) {
                            extension = complete.substring(complete.indexOf("-") + 1, complete.length);
                        }
                    }

                    complete = area.toString() + phone.toString() + extension.toString();
                }

                that.element.data("kendo" + that.options.name).value(complete);
            };

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestDatePicker
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            that.element.focus();

        },

        _bindInput: function () {
            var that = this;

            if (that._maskLength) {
                that.element
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("mouseout" + ns, proxy(that._procMaskLength, that))
                    .on("paste" + ns, proxy(that._paste, that))
                    .on(INPUT_EVENT_NAME, proxy(that._propertyChange, that));
            }            
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

            if (!that._chkReadOnlyStatus() && that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
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
        
        //處理是否可編輯
        _editable: function (options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;

            that._unbindInput();

            if (!readonly && !disable) {
                element.removeAttr(DISABLED)
                       .removeAttr(READONLY)
                       .removeClass(STATEDISABLED);

                that._bindInput();

            } else {
                element.attr(DISABLED, DISABLED)
                       .attr(READONLY, READONLY)
                       .toggleClass(STATEDISABLED, disable);                
            }
        },

        //處理options資料
        _SetOptions: function (options) {

            switch (options.format_type) {
                case "Phone":
                    options.mask = '(999) 999999999';
                    break;
                case "PhoneExt":
                    options.mask = '(999)999999999 - 99999';
                    break;
                case "Mobile":
                    options.mask = '0000-000-000';
                    break;
                case "CreditCard":
                    options.mask = '0000 0000 0000 0000';
                    break;
                case "LandNo":
                    options.mask = '0000 0000';
                    break;
                case "BuildNo":
                    options.mask = '0000 000';
                    break;
            }
            
            return options;
        },
        
        //處理輸入值是否有過長
        _procMaskLength: function () {
            var value = this.Bvalue();
            //判斷輸入值是否有超過mask設定的長度,若有,則僅取最大長度的資料,其餘刪除
            if (value.length > this._maskLength) {
                this.gssvalue(value.substr(0, this._maskLength));
            }
        },

        _unbindInput: function () {
            this.element
                .off("keydown" + ns)
                .off("keypress" + ns)
                .off("paste" + ns)
                .off("mouseout" + ns)
                .off(INPUT_EVENT_NAME);
        }
    });

    ui.plugin(GSSMaskedTextBox);

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