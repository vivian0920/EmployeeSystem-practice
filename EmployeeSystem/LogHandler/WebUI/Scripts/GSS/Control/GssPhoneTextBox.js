/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestPhoneTextBox
 */

(function ($, undefined) {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         ns = ".BestPhoneTextBox",
         className = "BestPhoneTextBox",
         proxy = $.proxy;

    var GSSPhoneTextBox = widget.extend({

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
             * @default BestPhoneTextBox
             * @MemberOf BestPhoneTextBox
             */
            name: "BestPhoneTextBox",
            /**
             * @property {suffix} suffix 後綴詞
             * @default string.empty
             * @MemberOf BestPhoneTextBox
             */
            suffix: ControlDefaultsObject.PhoneTextBox.suffix || null,
            /**
             * @property {boolean} is_extension_show 分機是否呈現
             * @default false
             * @MemberOf BestPhoneTextBox
             */
            is_extension_show: ControlDefaultsObject.PhoneTextBox.is_extension_show || false,
            /**
             * @property {boolean} is_extension_included 分機是否必填
             * @default false
             * @MemberOf BestPhoneTextBox
             */
            is_extension_included: ControlDefaultsObject.PhoneTextBox.is_extension_included || false,
            /**
             * @property {int} area_length 區碼長度
             * @default 3
             * @MemberOf BestPhoneTextBox
             */
            area_length: ControlDefaultsObject.PhoneTextBox.area_length || 3,
            /**
             * @property {int} number_length 電話長度
             * @default 8
             * @MemberOf BestPhoneTextBox
             */
            number_length: ControlDefaultsObject.PhoneTextBox.number_length || 8,
            /**
             * @property {int} extension_length 分機長度
             * @default 5
             * @MemberOf BestPhoneTextBox
             */
            extension_length: ControlDefaultsObject.PhoneTextBox.extension_length || 5,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestPhoneTextBox
             */
            is_escape_confirm: ControlDefaultsObject.PhoneTextBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestPhoneTextBox
             */
            is_change: ControlDefaultsObject.PhoneTextBox.is_change || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestPhoneTextBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestPhoneTextBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestPhoneTextBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestPhoneTextBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestPhoneTextBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestPhoneTextBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestPhoneTextBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },

        /**
        * @desc 唯讀設定
        * @MemberOf BestPhoneTextBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestPhoneTextBox().Breadonly();
        * 取消唯讀:element.BestPhoneTextBox().Breadonly(false);
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

            //唯讀控管
            that.AreaCode.data("kendoBestMaskedTextBox").Breadonly(readonly);
            that.Number.data("kendoBestMaskedTextBox").Breadonly(readonly);
            if (that.options.is_extension_show) {
                that.Extension.data("kendoBestMaskedTextBox").Breadonly(readonly);
            }

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },       

        /**
         * @desc 設定控制項是否必填
         * @memberof BestPhoneTextBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestPhoneTextBox().Brequired();
         * 不必填: element.BestPhoneTextBox().Brequired(false);
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
         * @desc 重設Options
         * @memberof BestPhoneTextBox
         * @method BsetOptions
         * @param {object} options 欲修改的options
         * @example
         * 重設: element.BestPhoneTextBox().BsetOptions(false);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            widget.fn.setOptions.call(that, options);

            //重設定required
            ProcRequired(that);
        },
        
        /**
         * @desc 取/設值 區碼
         * @MemberOf BestPhoneTextBox
         * @method areavalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 區碼 Value
         * @example
         * 取值:element.BestPhoneTextBox().areavalue();
         * 設值:element.BestPhoneTextBox().areavalue(setValue);
         */
        areavalue:function(setValue){

            //取值
            if (setValue==null){
                return this.AreaCode.data("kendoBestMaskedTextBox").Bvalue();
            }

            //設值
            if (setValue!=null){
                this.AreaCode.data("kendoBestMaskedTextBox").Bvalue(setValue);
            }

        },

        /**
         * @desc 取/設值 電話
         * @MemberOf BestPhoneTextBox
         * @method numbervalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 電話 Value
         * @example
         * 取值:element.BestPhoneTextBox().numbervalue();
         * 設值:element.BestPhoneTextBox().numbervalue(setValue);
         */
        numbervalue: function (setValue) {

            //取值
            if (setValue == null) {
                return this.Number.data("kendoBestMaskedTextBox").Bvalue();
            }

            //設值
            if (setValue != null) {
                this.Number.data("kendoBestMaskedTextBox").Bvalue(setValue);
            }

        },

        /**
         * @desc 取/設值 分機
         * @MemberOf BestPhoneTextBox
         * @method extensionvalue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取值 分機 Value
         * @example
         * 取值:element.BestPhoneTextBox().extensionvalue();
         * 設值:element.BestPhoneTextBox().extensionvalue(setValue);
         */
        extensionvalue: function (setValue) {

            //取值
            if (setValue == null) {
                if (this.options.is_extension_show) {
                    return this.Extension.data("kendoBestMaskedTextBox").Bvalue();
                } else {
                    return "";
                }                
            }

            //設值
            if (setValue != null) {
                if (this.options.is_extension_show) {
                    this.Extension.data("kendoBestMaskedTextBox").Bvalue(setValue);
                }                
            }

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestPhoneTextBox
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
            var that = this,
                isLegal = false;

            if (that.areavalue().length > 0 || that.numbervalue().length > 0) {
                isLegal = true;
            }

            if (!isLegal && that.options.is_extension_included) {
                if (that.extensionvalue().length > 0) {
                    isLegal = true;
                }
            }

            return isLegal;

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this,
                isLegal=false;     
            
            //區碼
            if (!isLegal && !that.AreaCode.data("kendoBestMaskedTextBox")._chkReadOnlyStatus() && that.areavalue().length > 0) {
                isLegal = true;
            }

            //電話
            if (!isLegal && !that.Number.data("kendoBestMaskedTextBox")._chkReadOnlyStatus() && that.numbervalue().length > 0) {
                isLegal = true;
            }
            
            //分機
            if (!isLegal && that.options.is_extension_included) {
                if (!that.Extension.data("kendoBestMaskedTextBox")._chkReadOnlyStatus() && that.extensionvalue().length > 0) {
                    isLegal = true;
                }
            }

            return isLegal;
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

        //Template
        _procTemplate: function () {
            var that = this,
                input = "<input />",
                maskvalue = "9",    //僅限填入0-9及空白
                maskArea,           //區碼格式
                maskNumber,         //電話格式
                maskExtension,      //分機格式
                inputTemplate = kendo.template(input);

            //新增 區碼
            that.AreaCode = $(inputTemplate(that.options));
            that.AreaCode.css("width", (that.options.area_length + 2) + "%");
            that.AreaCode.addClass(className);

            that.element.append("<span>( </span>");
            that.element.append(that.AreaCode);
            that.element.append("<span> )</span>&nbsp;");

            that.AreaCode.kendoBestMaskedTextBox({ mask: maskvalue.repeat(that.options.area_length), is_target:false });

            that.AreaCode.on("blur" + ns, proxy(that._blur,that));

            //新增 電話
            that.Number = $(inputTemplate(that.options));
            that.Number.css("width", (that.options.number_length + 2) + "%");
            that.Number.addClass(className);

            that.element.append(that.Number);

            that.Number.kendoBestMaskedTextBox({ mask: maskvalue.repeat(that.options.number_length), is_target: false });

            that.Number.on("blur" + ns, proxy(that._blur, that));

            if (that.options.is_escape_confirm) {
                that.AreaCode.on("change" + ns, proxy(that._change, that));
                that.Number.on("change" + ns, proxy(that._change, that));
            }

            //當options.is_extension_show=true,則呈現分機;反之,不呈現
            if (that.options.is_extension_show) {
                that.Extension = $(inputTemplate(that.options));
                that.Extension.css("width", (that.options.extension_length + 2) + "%");
                that.Extension.addClass(className);

                that.element.append("&nbsp;<span>-</span>&nbsp;");
                that.element.append(that.Extension);

                that.Extension.kendoBestMaskedTextBox({ mask: maskvalue.repeat(that.options.extension_length), is_target: false });

                that.Extension.on("blur" + ns, proxy(that._blur, that));

                if (that.options.is_escape_confirm) {
                    that.Extension.on("change" + ns, proxy(that._change, that));
                }
            }

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.append("&nbsp;<span>" + that.options.suffix + "</span>");
            };
        }
    });

    ui.plugin(GSSPhoneTextBox);

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