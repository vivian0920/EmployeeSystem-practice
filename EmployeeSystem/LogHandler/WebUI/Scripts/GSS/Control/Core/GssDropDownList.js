/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestDropDownList
 */

(function () {

    var kendo = window.kendo,
         ui = kendo.ui,
         ns = ".kendoDropDownList",
         HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
         DISABLED = "disabled",
         READONLY = "readonly",
         DEFAULT = "k-state-default",
         STATEDISABLED = "k-state-disabled",
         TABINDEX = "tabindex",
         ARIA_DISABLED = "aria-disabled",
         ARIA_READONLY = "aria-readonly",
         FOCUSED = "k-state-focused",
         OPTIONLABEL = "optionLabel",
         proxy = $.proxy,
         dropdownlist = ui.DropDownList;

    var GSSDropDownList = dropdownlist.extend({
        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            //重新new一個DataSource
            if (!options.is_webservice) {
                options.dataSource = new kendo.data.DataSource({ data: options.dataSource });
            }

            that._dataActiveFlag(options);
            dropdownlist.fn.init.call(that, element, options);

            that.options = that.options;
            that._create();
            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
        },
        //設定options的資料格式
        options: {
            /**
             * @property {Array} dataSource DropDownList資料來源
             * @default null
             * @MemberOf BestDropDownList
             */
            //dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestDropDownList
             * @MemberOf BestDropDownList
             */
            name: 'BestDropDownList',
            /**
             * @property {String} DropDownList提供每個清單項目文字內容的資料來源的欄位
             * @default datatext
             * @MemberOf BestDropDownList
             */
            text_field: ControlDefaultsObject.DropDownList.text_field || "text",
            /**
             * @property {String} DropDownList提供每個清單項目值的資料來源的欄位
             * @default datavalue
             * @MemberOf BestDropDownList
             */
            value_field: ControlDefaultsObject.DropDownList.value_field || "value",
            /**
             * @property {Boolean} 是否產生快捷按鈕
             * @default False
             * @MemberOf BestDropDownList
             */
            allow_shortcut: ControlDefaultsObject.DropDownList.allow_shortcut || false,
            /**
             * @property {String} suffix 後綴詞
             * @default null
             * @MemberOf BestDropDownList
             */
            suffix: ControlDefaultsObject.DropDownList.suffix || null,
            /**
             * @property {String} 要顯示那些資料
             * @default ""
             * @MemberOf BestDropDownList
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            active_filter: ControlDefaultsObject.DropDownList.active_filter || null,
            /**
             * @property {string} optionLabel 設定DropDownList的提示訊息
             * @default 請選擇
             * @MemberOf BestDropDownList
             */
            optionLabel: ControlDefaultsObject.DropDownList.optionLabel || "請選擇",
            /**
             * @property {Boolean} 依照DataActiveFlag的值決定該DropDownList是否可選取，若設定為False也不會產生DataActiveFlag=N的快捷按鈕
             * @default False
             * @MemberOf BestDropDownList
             * @desc True:可以選擇 DataActiveFlag=N的選項<br/>False:不能選擇DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.DropDownList.allow_inactive_item || false,
            /**
             * @property {Boolean} 資料來源是否從webService
             * @default false
             * @MemberOf BestDropDownList
             */
            is_webservice: ControlDefaultsObject.DropDownList.is_webservice || false,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestDropDownList
             */
            is_escape_confirm: ControlDefaultsObject.DropDownList.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestDropDownList
             */
            is_change: ControlDefaultsObject.DropDownList.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestDropDownList
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestDropDownList
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestDropDownList
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestDropDownList
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestDropDownList
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestDropDownList
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestDropDownList
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false,
            /**
             * @覆寫Select事件，若參數allow_inactive_item為False且資料為已停用則不能選取該選項
             * @MemberOf BestDropDownList
             */
            select: function (e) {
                if (typeof (this.dataItem(e.item.index()).DataActiveFlag) != 'undefined') {
                    if (this.options.allow_inactive_item.toString().toLowerCase() == 'false') {
                        if (this.dataItem(e.item.index()).DataActiveFlag.toLowerCase() == 'n') {
                            alert('此選項已停用不能選取')
                            e.preventDefault();
                        }
                    }
                }
                //todo  OnlySelectedItem
            },
            /**
             * @覆寫change事件，移除必輸提示
             * @MemberOf BestDropDownList
             */
            change: function (e) {
                if (this._chkRequired()) {

                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(this.element.attr("id"));
                    }

                }

                if (this.options.is_escape_confirm) {
                    this.options.is_change = true;
                }
            }
        },
        /**
        * @desc 唯讀處理
        * @MemberOf BestDropDownList
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestDropDownList().Breadonly();
        * 取消唯讀:element.BestDropDownList().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                isDisable = false;
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
         * @memberof BestDropDownList
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestDropDownList().Brequired();
         * 不必填: element.BestDropDownList().Brequired(false);
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
         * @memberof BestDropDownList
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

        /**
         * @desc 設定控制項是否鎖定
         * @memberof BestDropDownList
         * @method Block
         * @param {bool} lock 是否鎖定
         * @example
         * 鎖定: element.Block();
         * 鎖定: element.Block(true);
         * 不鎖定: element.Block(false);
         */
        Block: function (lock) {

            var that = this,
                isLock = lock === undefined ? true : lock;

            if (isLock) {
                that.wrapper.find(".k-i-arrow-s").addClass('k-loading');
            }
            else {
                that.wrapper.find(".k-i-arrow-s").removeClass('k-loading');
            }

        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestDropDownList
         * @method Bvalue
         * @param {string} setValue 設定值
         * @return {string} 取值
         * @example
         * 範例
         * 取值: element.BestDropDownList().Bvalue();
         * 設值: element.BestDropDownList().Bvalue("1");
         */
        Bvalue: function (setValue) {
            var that = this;

            //取值
            if (setValue === undefined) {

                return that.value();
            }

            //設值,需檢視是否有不合法字元,若有則刪除該字元
            if (setValue !== undefined) {
                that.value(setValue);
            }
            that.element.BestDropDownList().trigger("change");
        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestDropDownList
         * @method Btext
         * @param {string} setValue 設定值
         * @return {string} 取值
         * @example
         * 範例
         * 取值: element.BestDropDownList().Btext();
         * 設值: element.BestDropDownList().Btext("1");
         */
        Btext: function (setValue) {
            var that = this;

            //取值
            if (setValue === undefined) {

                return that.text();
            }

            //設值,需檢視是否有不合法字元,若有則刪除該字元
            if (setValue !== undefined) {
                that.text(setValue);
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
            var that = this
            if (that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
            }

        },
        //長出快速查詢按鈕、依照新設定的DataTextField和DataValueField重新綁定資料
        _create: function () {
            var that = this
            that.element.data("kendo" + that.options.name).setOptions({
                dataTextField: that.options.text_field,
                dataValueField: that.options.value_field
            })
            //快速查詢按鈕
            that._quickButton();
            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.parent().after("<span>" + that.options.suffix + "</span>");
            }
            //依照新設定的DataTextField和DataValueField重新綁定資料
            that.dataSource.fetch();
            //若不丟DataSource則需顯示optionLabel
            if (that.options.dataSource.options.data.length == 0) {
                that.element.data("kendo" + that.options.name).text(that.options.optionLabel);
            }

        },
        //若資料為無效則加上字串(已停用)
        _dataActiveFlag: function (options) {
            var FilterValue,
                that = this;

            if (options.active_filter != null) {
                if (options.active_filter.toString().toLowerCase() == 'y') {
                    FilterValue = 'n'
                }
                else if (options.active_filter.toString().toLowerCase() == 'n') {
                    FilterValue = 'y';
                }
            }
            if (typeof (options.dataSource.options.data) != 'undefined') {
                var dataSource = options.dataSource.options.data,
                    textField = options.text_field,
                    index = dataSource.length - 1;
                for (index; index >= 0; index--) {
                    if (dataSource[index].DataActiveFlag != undefined) {
                        if (dataSource[index].DataActiveFlag.toLowerCase() == 'n') {
                            dataSource[index][textField] = dataSource[index][textField] + "(已停用)";
                        }
                        //依照strFilter篩選要顯示的資料
                        if (dataSource[index].DataActiveFlag.toLowerCase() == FilterValue) {
                            dataSource.splice(index, 1);
                        }
                    }
                }
            }
        },
        _quickButton: function () {
            var that = this;
            if (that.options.allow_shortcut.toString().toLowerCase() == 'true') {
                var dataSource = that.options.dataSource.options.data,
                    quickDataSource = new Array(),
                    index = 0;
                for (index; index < dataSource.length ; index++) {
                    //該資料欄位DataIsShortcut為Truen 且(參數allow_inactive_item為fasle且該資料不為停用資料)
                    if (dataSource[index].DataIsShortcut.toLowerCase() == 'true' && (that.options.allow_inactive_item.toString().toLowerCase() == 'true' || dataSource[index].DataActiveFlag.toLowerCase() == 'y')) {
                        quickDataSource.push(dataSource[index]);
                    }
                }
                //Binding BestQuickButton
                that.quickButton = $("<span/>");
                that.quickButton.BestQuickButton({
                    dataSource: quickDataSource,
                    text_field: that.options.text_field,
                    value_field: that.options.value_field,
                    fn: function (text, value) {
                        that.element.BestDropDownList().Bvalue(value);

                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                        }

                        that._change();
                    }
                });
                that.element.parent().after("&nbsp;").after(that.quickButton);
            }
        },

        _editable: function (options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that.wrapper.off(ns),
                dropDownWrapper = that._inputWrapper.off(HOVEREVENTS),
                focusin = function () {
                    dropDownWrapper.addClass(FOCUSED);
                    that._blured = false;
                },
                focusout = function () {
                    if (!that._blured) {
                        that._triggerCascade();

                        var isIFrame = window.self !== window.top;
                        if (kendo.support.mobileOS.ios && isIFrame) {
                            that._change();
                        } else {
                            that._blur();
                        }

                        dropDownWrapper.removeClass(FOCUSED);
                        that._blured = true;
                        element.blur();
                    }
                };
            if (!readonly && !disable) {
                element.removeAttr(DISABLED).removeAttr(READONLY);

                dropDownWrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                wrapper
                    .attr(TABINDEX, wrapper.data(TABINDEX))
                    .attr(ARIA_DISABLED, false)
                    .attr(ARIA_READONLY, false)
                    .on("click" + ns, function (e) {
                        that._blured = false;
                        e.preventDefault();
                        that.toggle();
                    })
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("focusin" + ns, focusin)
                    .on("focusout" + ns, focusout);

                if (that.quickButton !== undefined) {
                    that.quickButton.BestQuickButton().Breadonly(false)
                }
            } else {
                wrapper.removeAttr(TABINDEX);
                dropDownWrapper
                    .addClass(STATEDISABLED)
                    .removeClass(DEFAULT);

                if (that.quickButton !== undefined) {
                    that.quickButton.BestQuickButton().Breadonly()
                }

                element.attr(DISABLED, DISABLED)
                       .attr(READONLY, readonly);

                wrapper.attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },
    })

    kendo.ui.plugin(GSSDropDownList);

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

})(jQuery);