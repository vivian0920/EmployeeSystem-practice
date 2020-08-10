/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestRadioButtonList
 */

(function () {

    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget;

    var GSSRadioButtonList = {
        //Init事件
        init: function (element, options) {

            var that = this, initOptios = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);
            options.orgDataSource = options.dataSource;

            widget.fn.init.call(that, element, options);

            that._setTemplate();
            that._dataActiveFlag(this.options.filter.toString().toLowerCase());
            that._dataSource();
            that._otherTextBox();
            that._clearChecked();
            //that._readonly();

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
        },
        //設定options的資料格式
        options: {
            chkValue: new Array(),
            othValue: new Array(),
            orgDataSource: {},
            /**
             * @property {Array} dataSource RadioButtonList資料來源
             * @default null
             * @MemberOf BestRadioButtonList
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestRadioButtonList
             * @MemberOf BestRadioButtonList
             */
            name: 'BestRadioButtonList',
            /**
             * @property {Boolean} clear_all 是否出現清空按鈕
             * @default false
             * @MemberOf BestRadioButtonList
             */
            clear_all: ControlDefaultsObject.RadioButtonList.clear_all || "false",
            /**
             * @property {String} clear_all_position 清空按鈕放第一個或最後一個
             * @default L
             * @MemberOf BestRadioButtonList
             * @desc F:第一個<br/>L:最後一個
             */
            clear_all_position: ControlDefaultsObject.RadioButtonList.clear_all_position || "l",
            /**
             * @property {String} filter 要顯示那些資料
             * @default ""
             * @MemberOf BestRadioButtonList
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            filter: ControlDefaultsObject.RadioButtonList.filter || "",
            /**
             * @property {String} align RadioButtonList對齊方式
             * @default H
             * @MemberOf BestRadioButtonList
             * @desc H:水平排列<br/>V:垂直排列
             */
            align: ControlDefaultsObject.RadioButtonList.align || "H",
            /**
             * @property {Boolean} clear_all_newline 清空鍵是否換行(水平才有效)
             * @default False
             * @MemberOf BestRadioButtonList
             */
            clear_all_newline: ControlDefaultsObject.RadioButtonList.clear_all_newline || "false",
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該RadioButton是否可編輯
             * @default False
             * @MemberOf BestRadioButtonList
             * @desc True:Enable DataActiveFlag=N的選項<br/>False:Disabled DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.RadioButtonList.allow_inactive_item || "false",
            /**
             * @property {String} clear_all_shortcut_key 清空按鈕快捷鍵
             * @default X
             * @MemberOf BestRadioButtonList
             */
            clear_all_shortcut_key: ControlDefaultsObject.RadioButtonList.clear_all_shortcut_key || "X",
            /**
             * @property {Boolean} clear_all_confirm 點選清空按鈕時是否出現確認視窗
             * @default True
             * @MemberOf BestRadioButtonList
             */
            clear_all_confirm: ControlDefaultsObject.RadioButtonList.clear_all_confirm || "true",
            /**
             * @property {String} text_field RadioButtonList提供每個清單項目文字內容的資料來源的欄位
             * @default datatext
             * @MemberOf BestRadioButtonList
             */
            text_field: ControlDefaultsObject.RadioButtonList.text_field || "datatext",
            /**
             * @property {String} value_field RadioButtonList提供每個清單項目值的資料來源的欄位
             * @default datavalue
             * @MemberOf BestRadioButtonList
             */
            value_field: ControlDefaultsObject.RadioButtonList.value_field || "datavalue",
            /**
             * @property {Boolean} multiple_choice 是否複選，若單選需控制只能勾選一個選項
             * @default False
             * @MemberOf BestRadioButtonList
             */
            multiple_choice: ControlDefaultsObject.RadioButtonList.multiple_choice || "false",
            /**
             * @property {Boolean} other_textbox 是否顯示其他文字框
             * @default False
             * @MemberOf BestRadioButtonList
             */
            other_textbox: ControlDefaultsObject.RadioButtonList.other_textbox || "false",
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestRadioButtonList
             */
            is_escape_confirm: ControlDefaultsObject.RadioButtonList.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestRadioButtonList
             */
            is_change: ControlDefaultsObject.RadioButtonList.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestRadioButtonList
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestRadioButtonList
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestRadioButtonList
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestRadioButtonList
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestRadioButtonList
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestRadioButtonList
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestRadioButtonList
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },
        /**
        * @desc 唯讀處理
        * @MemberOf BestRadioButtonList
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestRadioButtonList().Breadonly();
        * 取消唯讀:element.BestRadioButtonList().Breadonly(false);
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

            //若先設值再唯讀，值為已停用則須顯示
            if (that.options.readonly_status && that.SelectedValue().length !== that.options.chkValue.length) {
                that.SelectedValue(that.options.chkValue)
            }
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestRadioButtonList
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestRadioButtonList().Brequired();
         * 不必填: element.BestRadioButtonList().Brequired(false);
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
         * @memberof BestRadioButtonList
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
        //設置樣板
        _setTemplate: function () {

            var that = this,
                strTemplate,
                tmpActFlag = "",
                strName = "",
                elementID = that.element.attr("id"),
                dataValueField = that.options.value_field,
                dataTextField = that.options.text_field,
                tmpRadioButton,
                tmpLabel,
                tmpTextBox = "";

            //若multiple_choice為false則只能單選
            if (this.options.multiple_choice.toString().toLowerCase() == "false") {
                strName = "name='" + elementID + "'"
            }
            //若屬性allow_inactive_item為false則Template則須判斷資料欄位DataActiveFlag為N時需要唯讀
            if (this.options.allow_inactive_item.toString().toLowerCase() == 'false') {
                tmpActFlag = "#if(data.DataActiveFlag.toLowerCase() == 'n'){#disabled='disabled'#}#";
            }
            //設置樣板radiobutton各屬性
            tmpRadioButton = "<input type = 'radio' "
                     + strName
                     + tmpActFlag
                     + "otherText = #= data.DataOtherFlag.toLowerCase()# "
                     + "id='GSSRdo_" + elementID + "_#= data." + dataValueField + " #' "
                     + "value=#= data." + dataValueField + " # "
                     + "actFlag = #= data.DataActiveFlag.toLowerCase()# "
                     + "onclick='$.proxy($(this).parent().BestRadioButtonList()._click(),this);'"
                     + "accesskey='#: data.DataShortcutKey #'/>";
            //設置樣板label各屬性
            tmpLabel = "<label class='radio-inline' "
                     + "style='display:inline;margin-right: 10px;' "
                     + "realtext='#= data." + dataTextField + " #' "
                     + "for='GSSRdo_" + elementID + "_#= data." + dataValueField + " #'>"
                     //若DataActiveFlag=n加上(已停用)
                     + "#if(data.DataActiveFlag.toLowerCase() == 'y'){# "
                     + "#= data." + dataTextField + "# #}else{# "
                     + "#= data." + dataTextField + "#(已停用)  #}# "
                     + "(#: data.DataShortcutKey #)</label>"
            //若other_textbox為TRUE且資料DataOtherFlag為Y則需插入TextBox
            if (this.options.other_textbox.toString().toLowerCase() == "true") {
                tmpTextBox = "#if(data.DataOtherFlag.toLowerCase() == 'y'){#"
                           + "<input/> &nbsp; #}#"
            }
            //組合tempalte
            strTemplate = tmpRadioButton + tmpLabel + tmpTextBox;
            //若為垂直排列則需換行
            if (this.options.align.toLowerCase() == "v") {
                strTemplate += "</br>";
            }
            that.template = kendo.template(strTemplate)
        },
        //將資料來源依照Templete轉為html
        _refresh: function () {
            var that = this;
            var view = that.dataSource.view();
            var html = kendo.render(that.template, view);
            that.element.html(html);
        },
        _dataSource: function () {
            var that = this;
            // returns the datasource OR creates one if using array or configuration object
            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);
            // bind to the change event to refresh the widget
            that.dataSource.bind("change", function () {
                that._refresh();
            });

            that.dataSource.fetch();
        },
        //RadioButton Click事件
        _click: function () {
            var that = this;
            //若有勾選 則Enable清空按鈕且刪除必輸提示 否則Disable清空按鈕
            if (that.options.clear_all.toString().toLowerCase() == 'true') {
                this.element.BestRadioButtonList()._enableBtnClear();
            }
            //如果other_textbox為true時需處理若Click時所對應之OtherTextBox要可編輯
            if (that.options.other_textbox.toString().toLowerCase() == "true") {
                that.element.BestRadioButtonList()._enableOtherText();
            }

            if (that.options.is_escape_confirm) {
                that.options.is_change = true;
            }

        },
        //若有勾選 則Enable清空按鈕且刪除必輸提示 否則Disable清空按鈕
        _enableBtnClear: function () {
            var that = this;
            if (that.SelectedValue().length == 0) {
                that.element.BestRadioButtonList().clearButton.BestButton().enable(false);
            }
            else {
                that.element.BestRadioButtonList().clearButton.BestButton().enable(true);

                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                }

            }
        },
        //依照勾選狀態設定OtherTxt是否唯讀
        _enableOtherText: function () {
            var that = this,
                actFlag = "";
            if (that.options.allow_inactive_item.toString().toLowerCase() == 'false') {
                actFlag = "[actFlag='y']"
            }
            this.element.find('input[type=radio]' + actFlag).each(function (i) {
                //若為勾選且有othertext則該othertext為Enable
                if ($(this).prop('checked') && $(this).attr('othertext') == 'y') {
                    $(this).next('label').next('input').BestTextBox().Breadonly(false)
                    if (that.options.is_escape_confirm) {
                        $(this).next('label').next('input').on("change", $.proxy(that._change, that));
                    }
                }//若不為勾選且有othertext則清空該othertext為Readonly
                else if (!$(this).prop('checked') && $(this).attr('othertext') == 'y') {
                    var otherText = $(this).next('label').next('input').data('kendoBestTextBox');
                    otherText.Breadonly();
                    otherText.Bvalue('');
                }
            })
        },
        //處理點選清空
        _clearChecked: function () {
            var that = this,
                strClear = "清空(" + that.options.clear_all_shortcut_key.toString() + ")";
            if (that.options.clear_all.toString().toLowerCase() == 'true') {
                //按鈕 清空
                that.clearButton = $("<button type='button' accesskey='" + that.options.clear_all_shortcut_key.toString() + "'></button>");
                that.clearButton.BestButton({
                    text: strClear,
                    value: 'Clear'
                }).enable(false);
                // setup the button click event. wrap it in a closure so that
                // "this" will be equal to the widget and not the HTML element that
                // the click function passes.
                that.clearButton.click(function (e) {
                    //綁定click事件
                    that._clearClick();
                });
                //依照參數ClearAllNewLine決定按鈕是否換行
                var booClearAllNewLine = false;
                if (this.options.align.toLowerCase() == "h" && this.options.clear_all_newline.toString().toLowerCase() == "true") {
                    booClearAllNewLine = true;
                }
                //依照參數checkallposition決定按鈕長在前面或後面
                if (that.options.clear_all_position.toString().toLowerCase() == 'f') {
                    if (booClearAllNewLine || this.options.align.toLowerCase() == "v") {
                        that.element.prepend("</br>")
                    }
                    that.element.prepend("&nbsp;");
                    that.element.prepend(that.clearButton);
                } else {
                    if (booClearAllNewLine) {
                        that.element.append("</br>");
                    }
                    that.element.append(that.clearButton);
                }
            }
        },
        //依照strFilter篩選要顯示的資料
        _dataActiveFlag: function (strFilter) {

            var FilterValue
            that = this;
            if (strFilter == 'y') {
                FilterValue = 'n'
            }
            else if (strFilter == 'n') {
                FilterValue = 'y';
            }

            var dataSource;
            dataSource = that.options.dataSource
            var dataText = that.options.text_field
            var index = dataSource.length - 1;
            for (index; index >= 0; index--) {
                if (dataSource[index].DataActiveFlag.toLowerCase() == FilterValue) {
                    dataSource.splice(index, 1);
                }
            }

        },
        /**
         * @desc 取得RadioButtonList所選取的值
         * @memberof BestRadioButtonList
         * @method SelectedValue
         * @param {Array} setValue 設定值(可不傳)
         * @return {Array} 取RadioButtonList所選取的值
         * @example
         * 取值:element.BestRadioButtonList().SelectedValue();
         * 設值:element.BestRadioButtonList().SelectedValue(setValue);
         */
        SelectedValue: function (setValue) {
            //取值
            if (setValue == null) {
                var arrValue = new Array();
                this.element.find("input[type='radio']:checked").each(function (i) {
                    arrValue.push(this.value);
                })
                return arrValue
            }
            //設值
            if (setValue != null) {
                that.options.chkValue = setValue;
                that._setIncativeData(setValue);
                this.element.find("input[type='radio']").each(function (i) {
                    $(this).prop("checked", ($.inArray($(this).val(), setValue) != -1));
                })

                if (!that.options.readonly_status) {
                    if (that.options.clear_all.toString().toLowerCase() == 'true') {
                        this.element.BestRadioButtonList()._enableBtnClear();
                    }
                    if (this.options.other_textbox.toString().toLowerCase() == "true") {
                        this.element.BestRadioButtonList()._enableOtherText();
                    }
                }
                if (that.options.readonly_status && that.options.othValue.length > 0) {
                    that.OtherText(that.options.othValue);
                }
            }
        },
        //若唯讀且勾選已停用項目，則必須顯示已停用項目
        _setIncativeData: function (setValue) {
            var that = this;

            if (that.options.readonly_status) {
                //取得沒顯示在畫面上的資料
                var diffDataSource = [];
                $.grep(that.options.orgDataSource, function (element1) {
                    var booDupFlag = true;
                    $.grep(that.options.dataSource, function (element2) {
                        if ($(element1).attr(that.options.value_field) === $(element2).attr(that.options.value_field)) {
                            booDupFlag = false;
                        }
                    })
                    if (booDupFlag) {
                        diffDataSource.push(element1)
                    }
                });

                //若狀態為唯讀且設的值為已停用的資料，則將沒顯示的已停用資料塞回DataSource
                var inactiveData = [];
                $.grep(diffDataSource, function (element) {
                    if ($.inArray($(element).attr(that.options.value_field), setValue) !== -1) {
                        inactiveData.push(element);
                    }
                });
                //更新資料、重新長出Control
                if (inactiveData.length > 0) {
                    $.grep(inactiveData, function (element) {
                        that.options.dataSource.push(element);
                    })
                    that._dataSource();
                    that._otherTextBox();
                    that._clearChecked();
                    this._editable({
                        readonly: true,
                        disable: true
                    });
                }
            }
        },

        /**
         * @desc 取得RadioButtonList所選取的文字
         * @memberof BestRadioButtonList
         * @method SelectedText
         * @return {Array} 取RadioButtonList所選取的文字
         * @example
         * 取值:element.BestRadioButtonList().SelectedText();
         */
        SelectedText: function () {
            var arrText = new Array();

            this.element.find("input[type='radio']:checked").next("label").each(function (i) {
                arrText.push($(this).attr("realtext"));
            })
            return arrText
        },
        /**
         * @desc 取得RadioButtonList所選取的其他文字框內容
         * @memberof BestRadioButtonList
         * @method OtherText
         * @param {Array} setValue 設定值(可不傳)
         * @return {Array} 取RadioButtonList所選取的其他文字框內容
         * @example
         * 取值:element.BestRadioButtonList().OtherText();
         * 設值:element.BestRadioButtonList().OtherText(setValue);
         */
        OtherText: function (setValue) {
            //取值
            if (setValue == null) {
                var arrOtherText = new Array();
                if (this.options.other_textbox.toString().toLowerCase() == 'true') {
                    this.element.find("input[type='radio'][othertext='y']:checked").next('label').next('input').each(function (i) {
                        arrOtherText.push($(this).BestTextBox().Bvalue());
                    });
                }
                return arrOtherText
            }
            //設值
            if (setValue != null) {
                that.options.othValue = setValue;
                this.element.find("input[type='radio'][othertext='y']:checked").next('label').next('input').each(function (i) {
                    $(this).BestTextBox().Bvalue(setValue[i]);
                });
            }
        },
        //change事件
        _change: function () {
            this.options.is_change = true;
        },
        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.SelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },
        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this
            if (that.SelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },
        /**
         * @desc 設定游標在控制項上
         * @memberof BestRadioButtonList
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this
                , currentObj = null;

            //由於span不提供focus, 所以目前做法先聚焦至畫面上第一個input
            //取得data-role含有best,且具有required,但非含有readonly,disabled, hidden的control
            currentObj = that.element.find("input:not([readonly=true],[readonly=readonly],[disabled]):visible:first");
            currentObj.focus();

        },//按鈕清空事件
        _clearClick: function () {
            var booConfirm = true;
            if (this.options.clear_all_confirm.toString().toLowerCase() == 'true') {
                booConfirm = confirm('是否確定清空？');
            }
            if (booConfirm) {
                //將OtherTextBox清空唯獨
                if (this.options.other_textbox.toString().toLowerCase() == 'true') {
                    $(this.element).find("input[type='radio'][othertext='y']:checked").next('label').next('input').each(function (i) {
                        if (!$(this).BestTextBox().options.readonly_status) {
                            $(this).BestTextBox().Bvalue('');
                            $(this).BestTextBox().Breadonly();
                        }
                    });
                }
                //清空RadioBox 唯獨清空按鈕
                $(this.element).find("input[type='radio'][disabled!='disabled']:checked").prop("checked", false);
                this.element.BestRadioButtonList()._enableBtnClear();

                if (that.options.is_escape_confirm) {
                    that.options.is_change = true;
                }
            }
        },
        //長出其他文字框
        _otherTextBox: function () {
            var optionsBase = { is_target: false };
            optionsBase.placeholder = "請輸入"
            this.element.find('input[type!=radio]').each(function (i) {
                $(this).kendoBestTextBox(optionsBase);
                $(this).BestTextBox().Breadonly(true);
            });
        },
        _editable: function (options) {
            var enable = options.enable,
                readonly = options.readonly

            if (readonly === true) {
                this.element.find("input[type='radio']").attr("disabled", "disabled");
                if (this.options.clear_all.toString().toLowerCase() == 'true') {
                    this.clearButton.BestButton().enable(false)
                }
                this.element.find("input[type!='radio']").each(function (i) {
                    $(this).BestTextBox().Breadonly();
                })
            } else {
                if (this.options.clear_all.toString().toLowerCase() == 'true') {
                    this.element.BestRadioButtonList()._enableBtnClear()
                }
                if (this.options.allow_inactive_item.toString().toLowerCase() == 'true') {
                    this.element.find("input[type='radio']").removeAttr("disabled");
                } else {
                    this.element.find("input[type='radio'][actFlag='y']").each(function (i) {
                        $(this).removeAttr("disabled");
                    });
                }
                this.element.BestRadioButtonList()._enableOtherText();
            }
        }
    }

    kendo.ui.plugin(widget.extend(GSSRadioButtonList));

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