/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestComboBox
 */

(function () {

    var kendo = window.kendo,
        ui = kendo.ui,
        combobox = ui.ComboBox,
        ns = ".kendoComboBox",
        CLICK = "click" + ns,
        MOUSEDOWN = "mousedown" + ns,
        DEFAULT = "k-state-default",
        STATEDISABLED = "k-state-disabled",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        DISABLED = "disabled",
        READONLY = "readonly",
        ARIA_READONLY = "aria-readonly",
        ARIA_DISABLED = "aria-disabled",
        STATE_SELECTED = "k-state-selected",
        proxy = $.proxy,
        FOCUSED = "k-state-focused";

    var GSSComboBox = combobox.extend({
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
                that.options.dataSource = new kendo.data.DataSource({ data: that.options.dataSource });
            }

            that._dataActiveFlag(options);
            combobox.fn.init.call(that, element, options);
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
             * @MemberOf BestComboBox
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestComboBox
             * @MemberOf BestComboBox
             */
            name: 'BestComboBox',
            /**
             * @property {String} text_field DropDownList提供每個清單項目文字內容的資料來源的欄位
             * @default datatext
             * @MemberOf BestComboBox
             */
            text_field: ControlDefaultsObject.ComboBox.text_field || "text",
            /**
             * @property {String} value_field DropDownList提供每個清單項目值的資料來源的欄位
             * @default datavalue
             * @MemberOf BestComboBox
             */
            value_field: ControlDefaultsObject.ComboBox.value_field || "value",
            /**
             * @property {Boolean} allow_shortcut 是否產生快捷按鈕
             * @default False
             * @MemberOf BestComboBox
             */
            allow_shortcut: ControlDefaultsObject.ComboBox.allow_shortcut || false,
            /**
             * @property {String} suffix 後綴詞
             * @default null
             * @MemberOf BestComboBox
             */
            suffix: ControlDefaultsObject.ComboBox.suffix || null,
            /**
             * @property {string} placeholder 設定ComboBox的提示訊息
             * @default string.empty
             * @MemberOf BestComboBox
             */
            placeholder: ControlDefaultsObject.ComboBox.placeholder || "請選擇",
            /**
             * @property {String} active_filter 要顯示那些資料
             * @default ""
             * @MemberOf BestComboBox
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            active_filter: ControlDefaultsObject.ComboBox.active_filter || null,
            /**
             * @property {String} filter ComboBox內建資料篩選方式
             * @default contains
             * @MemberOf BestComboBox
             */
            filter: ControlDefaultsObject.ComboBox.filter || "contains",
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該DropDownList是否可選取，若設定為False也不會產生DataActiveFlag=N的快捷按鈕
             * @default False
             * @MemberOf BestComboBox
             * @desc True:可以選擇 DataActiveFlag=N的選項<br/>False:不能選擇DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.ComboBox.allow_inactive_item || false,
            /**
             * @property {Boolean} is_webservice 資料來源是否從webService
             * @default false
             * @MemberOf BestComboBox
             */
            is_webservice: ControlDefaultsObject.ComboBox.is_webservice || false,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestComboBox
             */
            is_escape_confirm: ControlDefaultsObject.ComboBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestComboBox
             */
            is_change: ControlDefaultsObject.ComboBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestComboBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestComboBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestComboBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestComboBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestComboBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestComboBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestComboBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false,
            /**
             * @覆寫Select事件，若參數allow_inactive_item為False且資料為已停用則不能選取該選項
             * @MemberOf BestComboBox
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
             * @覆寫change事件，若輸入值不存在清單中，清空並出現警示訊息、移除必輸提示
             * @MemberOf BestComboBox
             */
            change: function (e) {
                if (this.value() && this.selectedIndex == -1) {
                    alert("該項目不存在於清單中");
                    this.value("");
                }
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
         * @desc 設定控制項是否鎖定
         * @memberof BestComboBox
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
        * @desc 唯讀處理
        * @MemberOf BestComboBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestComboBox().Breadonly();
        * 取消唯讀:element.BestComboBox().Breadonly(false);
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
         * @memberof BestComboBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestComboBox().Brequired();
         * 不必填: element.BestComboBox().Brequired(false);
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
         * @memberof BestComboBox
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestComboBox().BsetOptions(obj);
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
        },
        //若資料為無效則加上字串(已停用)
        _dataActiveFlag: function (options) {
            var FilterValue,
                that = this;

            if (options.strFilter != null) {
                if (options.strFilter.toString().toLowerCase() == 'y') {
                    FilterValue = 'n'
                }
                else if (options.strFilter.toString().toLowerCase() == 'n') {
                    FilterValue = 'y';
                }
            }
            if (typeof (options.dataSource) !== 'undefined') {
                var dataSource = options.dataSource;
                var textField = options.text_field;
                var index = dataSource.length - 1;
                for (index; index >= 0; index--) {
                    if (dataSource[index].DataActiveFlag.toLowerCase() == 'n' && dataSource[index][textField].indexOf("(已停用)") == -1) {
                        dataSource[index][textField] = dataSource[index][textField] + "(已停用)";
                    }
                    //依照strFilter篩選要顯示的資料
                    if (dataSource[index].DataActiveFlag.toLowerCase() == FilterValue) {
                        dataSource.splice(index, 1);
                    }
                }
            }
        },
        //快速查詢按鈕
        _quickButton: function () {
            var that = this
            if (that.options.allow_shortcut.toString().toLowerCase() == 'true') {
                var dataSource = that.options.dataSource
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
                        that.element.BestComboBox().Bvalue(value);

                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                        }

                        that._change();
                    }
                });
                that.element.parent().after("&nbsp;").after(that.quickButton);
            }
        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestComboBox
         * @method Bvalue
         * @param {string} setValue 設定值
         * @return {string} 取值
         * @example
         * 範例
         * 取值: element.BestComboBox().Bvalue();
         * 設值: element.BestComboBox().Bvalue("1");
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
            that.element.BestComboBox().trigger("change");
        },

        /**
         * @desc 取值跟設值的方法
         * @memberof BestComboBox
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

                return (that.text().length > 0) ? that.text() : null;
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
            var that = this;
            if (that.Bvalue().length > 0) {
                return true;
            } else {
                return false;
            }
        },
        //唯讀處理
        _editable: function (options) {
            var that = this,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that._inputWrapper.off(ns),
                input = that.element.add(that.input.off(ns)),
                arrow = that._arrow.parent().off(CLICK + " " + MOUSEDOWN);

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                input.removeAttr(DISABLED)
                     .removeAttr(READONLY)
                     .attr(ARIA_DISABLED, false)
                     .attr(ARIA_READONLY, false);

                arrow.on(CLICK, function () { that.toggle(); })
                     .on(MOUSEDOWN, function (e) { e.preventDefault(); });

                that.input
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("focus" + ns, function () {
                        wrapper.addClass(FOCUSED);
                        that._placeholder(false);
                    })
                    .on("blur" + ns, function () {
                        wrapper.removeClass(FOCUSED);
                        clearTimeout(that._typing);

                        if (that.options.text !== that.input.val()) {
                            that.text(that.text());
                        }

                        that._placeholder();
                        that._blur();

                        that.element.blur();
                    });

                if (that.quickButton !== undefined) {
                    that.quickButton.BestQuickButton().Breadonly(false)
                }
            } else {
                wrapper
                    .addClass(STATEDISABLED)
                    .removeClass(DEFAULT);

                input.attr(DISABLED, true)
                     .attr(READONLY, false)
                     .attr(ARIA_DISABLED, true)
                     .attr(ARIA_READONLY, false);

                if (that.quickButton !== undefined) {
                    that.quickButton.BestQuickButton().Breadonly()
                }
            }
        }
    })

    kendo.ui.plugin(GSSComboBox);

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