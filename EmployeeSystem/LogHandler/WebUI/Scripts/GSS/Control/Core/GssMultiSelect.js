/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestMultiSelect
 */

(function () {

    var kendo = window.kendo,
        ui = kendo.ui,
        multiselect = ui.MultiSelect,
        ns = ".kendoMultiSelect",
        proxy = $.proxy,
        FILTER = "filter",
        activeElement = kendo._activeElement,
        CLICK = "click" + ns,
        KEYDOWN = "keydown" + ns,
        ACCEPT = "accept",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        DISABLED = "disabled",
        READONLY = "readonly",
        LI = "li",
        HOVERCLASS = "k-state-hover",
        MOUSEENTER = "mouseenter" + ns,
        MOUSELEAVE = "mouseleave" + ns,
        STATEDISABLED = "k-state-disabled",
        MOUSEENTER = "mouseenter" + ns,
        MOUSELEAVE = "mouseleave" + ns,
        HOVEREVENTS = MOUSEENTER + " " + MOUSELEAVE;

    var GSSMultiSelect = multiselect.extend({
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
            options.dataSource = new kendo.data.DataSource({ data: options.dataSource });

            that._dataActiveFlag(options);
            multiselect.fn.init.call(that, element, options);
            that._create();

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
        },
        //設定options的資料格式
        options: {
            /**
             * @property {Array} dataSource MultiSelect資料來源
             * @default null
             * @MemberOf BestMultiSelect
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestMultiSelect
             * @MemberOf BestMultiSelect
             */
            name: 'BestMultiSelect',
            /**
             * @property {String} text_field MultiSelect提供每個清單項目文字內容的資料來源的欄位
             * @default datatext
             * @MemberOf BestMultiSelect
             */
            text_field: ControlDefaultsObject.MultiSelect.text_field || "text",
            /**
             * @property {String} value_field MultiSelect提供每個清單項目值的資料來源的欄位
             * @default datavalue
             * @MemberOf BestMultiSelect
             */
            value_field: ControlDefaultsObject.MultiSelect.value_field || "value",
            /**
             * @property {Boolean} allow_shortcut 是否產生快捷按鈕
             * @default False
             * @MemberOf BestMultiSelect
             */
            allow_shortcut: ControlDefaultsObject.MultiSelect.allow_shortcut || false,
            /**
             * @property {String} suffix 後綴詞
             * @default null
             * @MemberOf BestMultiSelect
             */
            suffix: ControlDefaultsObject.MultiSelect.suffix || null,
            /**
             * @property {String} active_filter 要顯示那些資料
             * @default ""
             * @MemberOf BestComboBox
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            active_filter: ControlDefaultsObject.MultiSelect.active_filter || null,
            /**
             * @property {String} filter MultiSelect內建資料篩選方式
             * @default contains
             * @MemberOf BestComboBox
             */
            filter: ControlDefaultsObject.MultiSelect.filter || "contains",
            /**
             * @property {string} optionLabel 設定MultiSelect的提示訊息
             * @default 請選擇
             * @MemberOf BestMultiSelect
             */
            optionLabel: ControlDefaultsObject.MultiSelect.optionLabel || "請選擇",
            /**
             * @property {Boolean} allow_inactive_ite 依照DataActiveFlag的值決定該MultiSelect是否可選取，若設定為False也不會產生DataActiveFlag=N的快捷按鈕
             * @default False
             * @MemberOf BestMultiSelect
             * @desc True:可以選擇 DataActiveFlag=N的選項<br/>False:不能選擇DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.MultiSelect.allow_inactive_item || false,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestMultiSelect
             */
            is_escape_confirm: ControlDefaultsObject.MultiSelect.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestMultiSelect
             */
            is_change: ControlDefaultsObject.MultiSelect.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestMultiSelect
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestMultiSelect
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestMultiSelect
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestMultiSelect
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestMultiSelect
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestMultiSelect
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestMultiSelect
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false,
            /**
             * @覆寫Select事件，若參數allow_inactive_item為False且資料為已停用則不能選取該選項
             * @MemberOf BestMultiSelect
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
             * @MemberOf BestMultiSelect
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
        * @MemberOf BestMultiSelect
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestMultiSelect().Breadonly();
        * 取消唯讀:element.BestMultiSelect().Breadonly(false);
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
            this.enable(!isReadonly)
            //this._editable({
            //    readonly: isReadonly,
            //    disable: isDisable
            //});

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestMultiSelect
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestMultiSelect().Brequired();
         * 不必填: element.BestMultiSelect().Brequired(false);
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
         * @memberof BestMultiSelect
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestMultiSelect().BsetOptions(obj);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設定控制項是否鎖定
         * @memberof BestCityDistrictZIP
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
                that.wrapper.find(".k-loading").removeClass("k-loading-hidden");
            }
            else {
                that.wrapper.find(".k-loading").addClass("k-loading-hidden");
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

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.value().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this
            if (that.value().length > 0) {
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
            if (typeof (options.dataSource.options.data) != 'undefined') {
                var dataSource = options.dataSource.options.data;
                var textField = options.text_field;
                var index = dataSource.length - 1;

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
            var that = this
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
                        var arrValue = that.element.BestMultiSelect().value(),
                            mutliValue = '';
                        //若有資料，將按鈕資料加至原來的值後面
                        if ($.inArray(value, arrValue) == -1) {;
                            $.each(arrValue, function (akey, avalue) {
                                mutliValue += avalue.toString() + ",";
                            });
                            mutliValue += value + ",";
                            that.element.BestMultiSelect().value(mutliValue.split(","));
                        }

                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                        }
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
                tagList = that.tagList.off(ns),
                input = that.element.add(that.input.off(ns));

            if (!readonly && !disable) {
                wrapper
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover)
                    .on("mousedown" + ns, function (e) {
                        var notInput = e.target.nodeName.toLowerCase() !== "input";

                        if (notInput) {
                            e.preventDefault();
                        }

                        if (e.target.className.indexOf("k-delete") === -1) {
                            if (that.input[0] !== activeElement() && notInput) {
                                that.input.focus();
                            }

                            if (that.options.minLength === 0) {
                                that.open();
                            }
                        }
                    });

                that.input.on(KEYDOWN, proxy(that._keydown, that))
                    .on("paste" + ns, proxy(that._search, that))
                    .on("focus" + ns, function () { that._placeholder(false); })
                    .on("blur" + ns, function () {
                        clearTimeout(that._typing);
                        that._placeholder(!that._dataItems[0], true);
                        that.close();

                        if (that._state === FILTER) {
                            that._state = ACCEPT;
                        }

                        that.element.blur();
                    });

                input.removeAttr(DISABLED)
                     .removeAttr(READONLY)
                     .attr(ARIA_DISABLED, false)
                     .attr(ARIA_READONLY, false);

                tagList
                    .on(MOUSEENTER, LI, function () { $(this).addClass(HOVERCLASS); })
                    .on(MOUSELEAVE, LI, function () { $(this).removeClass(HOVERCLASS); })
                    .on(CLICK, ".k-delete", function (e) {
                        that._unselect($(e.target).closest(LI));
                        that._change();
                        that.close();
                    });

                if (that.quickButton !== undefined) {
                    that.quickButton.BestQuickButton().Breadonly(false)
                }
            } else {
                if (disable) {
                    wrapper.addClass(STATEDISABLED);
                } else {
                    wrapper.removeClass(STATEDISABLED);
                }
                if (that.quickButton !== undefined) {
                    that.quickButton.BestQuickButton().Breadonly()
                }

                input.attr(DISABLED, disable)
                     .attr(READONLY, readonly)
                     .attr(ARIA_DISABLED, disable)
                     .attr(ARIA_READONLY, readonly);
            }
        },

        /**
         * @desc 取值 MultiSelect value且將多選之逗號加上引號
         * @MemberOf MultiSelect
         * @method Bvalue
         * @return {string} 取值 MultiSelect Value
         * @example
         * 取值:element.BestMultiSelect().Bvalue();
         */
        Bvalue: function (setValue) {
            var objMultiSelectValue = this.element.data("kendo" + this.options.name).value().toString();

            if (objMultiSelectValue.length > 0) {
                objMultiSelectValue = "'" + objMultiSelectValue + "'";
                objMultiSelectValue = objMultiSelectValue.replace(/,/g, "','");
            } else {
                objMultiSelectValue = null;
            }

            //設值,需檢視是否有不合法字元,若有則刪除該字元
            if (setValue !== undefined) {
                this.value(setValue);
            }
            return objMultiSelectValue;
        }
    })

    kendo.ui.plugin(GSSMultiSelect);


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