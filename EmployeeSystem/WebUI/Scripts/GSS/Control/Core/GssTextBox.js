/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestTextBox
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         ns = ".best-textbox",
         proxy = $.proxy,
         DISABLED = "disabled",
         READONLY = "readonly",
         PLACEHOLDER = "placeholder",
         STATEDISABLED = "k-state-disabled",
         INPUT_EVENT_NAME = (kendo.support.propertyChaneEvent ? "propertychange" : "input") + ns,
         SpecialCharacterList = ControlDefaultsObject.TextBox.SpecialCharacterList;

    var GSSTextBox = widget.extend({

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

            element = that.element;

            that.options.placeholder = that.options.placeholder || element.attr(PLACEHOLDER);

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.after("&nbsp;<span>" + that.options.suffix + "</span>");
            };

            //設定CSS
            that.element.addClass("k-textbox").addClass("best-textbox");

            //設定輸入法
            that._setImeMode();

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);

        },

        //設定options
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestTextBox
             * @MemberOf BestTextBox
             */
            name: "BestTextBox",
            /**
             * @property {string} mode 資料模式
             * @default None
             * @MemberOf BestTextBox
             * @desc None:不限制<br/>Digit:數字<br/>English:英文<br/>AlphaNumeric:英文、數字<br/>Email:Email格式<br/>Chinese:中文
             */
            mode: ControlDefaultsObject.TextBox.mode || "None",
            /**
             * @property {string} suffix 後綴詞
             * @default null
             * @MemberOf BestTextBox
             */
            suffix: ControlDefaultsObject.TextBox.suffix || null,
            /**
             * @property {string} placeholder 設定TextBox的提示訊息
             * @default string.empty
             * @MemberOf BestTextBox
             */
            placeholder: ControlDefaultsObject.TextBox.placeholder || null,
            /**
             * @property {string} special_character TextBox是否允許填入特殊字元
             * @default true
             * @MemberOf BestTextBox
             */
            special_character: ControlDefaultsObject.TextBox.special_character || true,
            /**
             * @property {string} allow_special_character TextBox是否允許非特殊字元外的字元
             * @default string.empty
             * @MemberOf BestTextBox
             * @desc 當special_character為false時,可透過此設定再定義可輸入的特殊字元
             */
            allow_special_character: ControlDefaultsObject.TextBox.allow_special_character || "",
            /**
             * @property {string} case_format 設定TextBox是否轉大小寫
             * @default None
             * @MemberOf BestTextBox
             * @desc None:無<br/>Upper:轉大寫<br/>Lower:轉小寫
             */
            case_format: ControlDefaultsObject.TextBox.case_format || "None",
            /**
             * @property {string} half_full_width 設定TextBox是否轉半全形
             * @default None
             * @MemberOf BestTextBox
             * @desc None:無<br/>Half:轉半形<br/>Full:轉全形
             */
            half_full_width: ControlDefaultsObject.TextBox.half_full_width || "None",
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTextBox
             */
            is_escape_confirm: ControlDefaultsObject.TextBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTextBox
             */
            is_change: ControlDefaultsObject.TextBox.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestTextBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestTextBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestTextBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",            

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestTextBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestTextBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestTextBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestTextBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },

        /**
        * @desc 唯讀處理
        * @MemberOf BestTextBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestTextBox().Breadonly();
        * 取消唯讀:element.BestTextBox().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                isDisable = false;

            //readonly為false
            if (! isReadonly) {
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
         * @memberof BestTextBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestTextBox().Brequired();
         * 不必填: element.BestTextBox().Brequired(false);
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
         * @memberof BestTextBox
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestTextBox().BsetOptions(obj);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設/取值 TextBox value
         * @MemberOf BestTextBox
         * @method Bvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 TextBox Value
         * @example
         * 取值:element.BestTextBox().Bvalue();
         * 設值:element.BestTextBox().Bvalue(setValue);
         */
        Bvalue: function (value) {
            var element = this.element;

            //取值
            if (value === undefined) {
                return $.trim(this.element.val());
            }
            
            //設值,需檢視是否有不合法字元,若有則刪除該字元
            if (value !== undefined) {
                element.val(this._procValue(value));
            }            
            
        },        

        /**
         * @desc 設定游標在控制項上
         * @memberof BestTextBox
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            that.element.focus();

        },       

        //處理可編輯事件
        _bindInput: function () {
            this.element
                .on("keypress" + ns, proxy(this._keypress, this))
                .on("blur" + ns, proxy(this._blur, this))
                .on("mouseout" + ns, proxy(this._mouseout, this))
                .on(INPUT_EVENT_NAME);

            if (this.options.is_escape_confirm) {
                this.element.on("change" + ns, proxy(this._change, this));
            }
            
            this._placeholder(true);
        },        

        //blur事件
        _blur: function () {
            if (this._procValue(this.element.val()) != this.element.val()) {
                this.element.val(this._procValue(this.element.val()));
            }

            if (this._chkRequired()) {

                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(this.element.attr("id"));
                }

            }
        },

        //change事件
        _change:function(){
            this.options.is_change = true;
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.Bvalue().length>0) {
                return true;
            } else {
                return false;
            }

        },

        //驗證輸入值是否有符合允許的token
        _chkLegalChar: function (token, value) {
            var result = true;

            if (!((token.test && token.test(value)) || ($.isFunction(token) && token(value)))) {
                result = false;
            }

            return result;
        },

        //根據傳入值檢驗是否有不合法之字元,若有,則刪除該字元
        _chkLegalValue: function (value) {
            var temporary = "",
                valueLength = value.length;

            for (var i = 0; i < valueLength; i++) {
                if (this._validate(value[i])) {
                    temporary += value[i];
                }
            }

            return temporary;
        },

        //檢查是否有填寫資料
        _chkRequired:function(){
            var that = this;

            if (!that._chkReadOnlyStatus() && that.Bvalue().length>0) {
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

                that._unbindInput();
            }
        },

        //設定keypress事件
        _keypress: function (e) {
            //允許鍵盤事件為0,8(backspace),13(enter),99(ctrl+c),118(ctrl+v)
            if (e.which === 0 || e.which === 8 || e.which === 13 || e.which === 99 || e.which ===118) {
                return;
            }

            if (!(this._validate(String.fromCharCode(e.which)))) {
                e.preventDefault();
            }
        },

        //mouseout事件
        _mouseout: function () {            
            if (this._procValue(this.element.val()) != this.element.val()) {
                this.element.val(this._procValue(this.element.val()));
            }
        },

        //設定placeholder
        _placeholder: function (flag) {
            if (flag) {
                if (this.options.placeholder != null) {
                    this.element.attr(PLACEHOLDER, this.options.placeholder);
                }
            } else {
                this.element.removeAttr(PLACEHOLDER);
            }
        },        

        //根據設定來處理傳入值
        _procValue:function(value){
            var that = this,                
                valueLegal = "";

            //檢驗是否有非法字元,若有需移除
            if (value != null) {
                valueLegal = that._chkLegalValue(value.fullToHalf());
            }            

            //根據options.case_format來設定大小寫:None-無  Upper-轉大寫  Lower-轉小寫
            if (that.options.case_format == "Upper") {
                valueLegal = valueLegal.toUpperCase();
            } else if (that.options.case_format == "Lower") {
                valueLegal = valueLegal.toLowerCase();
            }

            //根據options.half_full_width來設定半全形:None-無  Half-轉半形  Full-轉全形
            if (that.options.half_full_width == "Half") {
                valueLegal = valueLegal.fullToHalf();
            } else if (that.options.half_full_width == "Full") {
                valueLegal = valueLegal.halfToFull();
            }

            return valueLegal;
        },


        //設定輸入法格式
        _setImeMode:function(){
            switch (this.options.mode) {
                case "None":
                    this.element.addClass("autoOfImeMode");
                    break;
                case "Chinese":
                    this.element.addClass("activeOfImeMode");
                    break;
                default:
                    this.element.addClass("inactiveOfImeMode");
                    break;
            }
        },

        //設定specialCharacterList的token
        _setSpecialCharacterList: function (charList) {
            var that = this, result = "";

            if (charList.length > 0) {
                result = new RegExp("[" + charList + "]");
            }

            return result;
        },

        //設定允許keyin的值
        _settokens: function () {
            var that = this, result = "";

            //根據mode設定token
            switch (that.options.mode) {
                case "Digit":
                    result = /[0-9]/;
                    break;
                case "English":
                    result = /[a-zA-Z]/;
                    break;
                case "AlphaNumeric":
                    result = /[a-zA-Z0-9]/;
                    break;
                case "Email":
                    result = /[a-zA-Z0-9@._]|\-/;
                    break;
                case "Chinese":
                    result = /[\u4e00-\u9fa5]/;
                    break;
            }

            return result;
        },               

        //處理唯讀事件
        _unbindInput: function () {
            this.element
                .off("keypress" + ns)
                .off("blur" + ns)
                .off("mouseout" + ns)
                .off("change"+ns)
                .off(INPUT_EVENT_NAME);

            this._placeholder(false);
        },

        //驗證keyin value是否合法
        _validate: function (value) {
            if (!value) {
                return true;
            }

            var token = this._settokens(),
                result = true,
                that = this,
                CharacterList;

            //先驗證輸入值是否有符合mode允許的token
            if (token !== "") {
                result = that._chkLegalChar(token, value);
            }

            //若special_character為true,且輸入值有不符合mode允許的token,則方需驗證有於特殊字元清單中(不包含Email)
            if (that.options.special_character && !result && that.options.mode !=="Email") {
                CharacterList = that._setSpecialCharacterList(SpecialCharacterList);

                result = that._chkLegalChar(CharacterList, value);
            }

            //若special_character為off,且輸入值有不符合mode允許的token,則方需驗證有於AloowSpecialCharacter中(不包含Email)
            if (!that.options.special_character && !result && that.options.mode !== "Email") {
                CharacterList = that._setSpecialCharacterList(that.options.allow_special_character);

                result = that._chkLegalChar(CharacterList, value);
            }

            return result;
        }
                
    });

    ui.plugin(GSSTextBox);

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
        } else {
            obj.Breadonly(false);
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