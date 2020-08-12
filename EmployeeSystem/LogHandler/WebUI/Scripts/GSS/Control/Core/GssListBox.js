/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestListBox
 */

(function () {

    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget;

    var GSSListBox = {
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

            that._setTemplate();
            that._dataActiveFlag(that.options.filter.toString().toLowerCase());
            that._dataSource();
            if (that.options.is_btn_enable) {
                that._btnOrder();
            }
            //that._readonly();
            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);

        },
        //設定options的資料格式
        options: {
            /**
             * @property {Array} dataSource ListBox資料來源
             * @default null
             * @MemberOf BestDualListBox
             */
            dataSource: {},
            /**
             * @property {String} 後綴詞
             * @default null
             * @MemberOf BestComboBox
             */
            suffix: ControlDefaultsObject.ListBox.suffix || null,
            /**
             * @property {String} name 物件名稱
             * @default BestListBox
             * @MemberOf BestListBox
             */
            name: 'BestListBox',
            /**
             * @property {String} filter 要顯示那些資料
             * @default ""
             * @MemberOf BestListBox
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            filter: ControlDefaultsObject.ListBox.filter || "",
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該CheckBox是否可編輯
             * @default False
             * @MemberOf BestListBox
             * @desc True:Enable DataActiveFlag=N的選項<br/>False:Disabled DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.ListBox.allow_inactive_item || "false",
            /**
             * @property {String} text_field ListBox提供每個清單項目文字內容的資料來源的欄位
             * @default datatext
             * @MemberOf BestListBox
             */
            text_field: ControlDefaultsObject.ListBox.text_field || "datatext",
            /**
             * @property {String} value_field ListBox提供每個清單項目值的資料來源的欄位
             * @default datavalue
             * @MemberOf BestListBox
             */
            value_field: ControlDefaultsObject.ListBox.value_field || "datavalue",
            /**
             * @property {Boolean} is_multi_selection 是否複選，若單選需控制只能勾選一個選項
             * @default False
             * @MemberOf BestListBox
             */
            is_multi_selection: ControlDefaultsObject.ListBox.is_multi_selection || "true",
            /**
             * @property {Boolean} is_btn_enable 是否顯示按鈕
             * @default True
             * @MemberOf BestListBox
             */
            is_btn_enable: ControlDefaultsObject.ListBox.is_btn_enable || true,
            /**
             * @property {Boolean} select_height ListBox高度
             * @default auto
             * @MemberOf BestListBox
             */
            select_height: ControlDefaultsObject.ListBox.select_height || "auto",
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestListBox
             */
            is_escape_confirm: ControlDefaultsObject.ListBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestListBox
             */
            is_change: ControlDefaultsObject.ListBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestListBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestListBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestListBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestListBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestListBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestListBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestListBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },
        /**
        * @desc 唯讀處理
        * @MemberOf BestListBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestListBox().Breadonly();
        * 取消唯讀:element.BestListBox().Breadonly(false);
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
         * @memberof BestListBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestListBox().Brequired();
         * 不必填: element.BestListBox().Brequired(false);
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
         * @memberof BestListBox
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestListBox().BsetOptions(obj);
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
                dataValueField = that.options.value_field,
                dataTextField = that.options.text_field,
                tmpActFlag = "",
                tmpListBoxOption;
            //若屬性allow_inactive_item為false則Template須判斷資料欄位DataActiveFlag為false時需要唯讀
            if (that.options.allow_inactive_item.toString().toLowerCase() == 'false') {
                tmpActFlag = "#if(data.DataActiveFlag.toLowerCase() == 'n'){#disabled='disabled'#}#";
            }
            //設置樣板checkbox各屬性
            tmpListBoxOption = "<option "
                     + tmpActFlag
                     + "value=#= data." + dataValueField + " # "
                     + "realtext='#= data." + dataTextField + " #' "
                     + ">#if(data.DataActiveFlag.toLowerCase() == 'y'){# "
                     + "#= data." + dataTextField + "# #}else{# "
                     + "#= data." + dataTextField + "#(已停用)  #}# </option>"
            //組合tempalte
            strTemplate = tmpListBoxOption
            that.template = kendo.template(strTemplate);
        },
        //將資料來源依照Templete轉為html
        _refresh: function () {
            var that = this,
                view = that.dataSource.view(),
                html = kendo.render(that.template, view);

            //Kendo自動長出option部分，Select部分則自己加入
            html = "<table><tr><td>"
                 + "<select style='width:auto;height:" + that.options.select_height + "' multiple='true' "
                 + "onChange='$.proxy($(this).parent().parent().parent().parent().parent().BestListBox()._change(),this);'>"
                 + html
                 + "<select/><td/><tr/>";
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
        //ListBox change事件
        _change: function (Objoption) {
            var that = this;
            //若is_multi_selection為false則設為單選
            if (this.element.BestListBox().options.is_multi_selection.toString().toLowerCase() == 'false') {
                this.element.find("option:selected").each(function (i) {
                    if (i != 0) {
                        $(this).removeProp("selected");
                    }
                })
            }

            if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
            }
        },
        //長出按鈕
        _btnOrder: function () {
            var that = this;
            //按鈕-上移
            template = kendo.template(that._templates.upButton);
            that.upButton = $(template(that.options));
            //按鈕-下移
            template = kendo.template(that._templates.downButton);
            that.downButton = $(template(that.options));

            //綁定click事件
            that.upButton.click(function (e) {
                that._upClick();
            });
            //綁定click事件
            that.downButton.click(function (e) {
                that._downClick();
            });
            //先找到table內的最後一個td在加上BTN
            that.element.children().find("td:last").append(that.upButton);
            that.element.children().find("td:last").append("</br>");
            that.element.children().find("td:last").append(that.downButton);

            //若有填上後綴詞時，需自動bind
            if (that.options.suffix != null) {
                that.element.children().find("td:last").after("<span style='display:table-cell; vertical-align:bottom'>" + that.options.suffix + "</span>");
            }
        },//按鈕上移事件
        _upClick: function () {
            this.element.find("option:selected").each(function (i) {
                if (!$(this).prev().length) return false;
                $(this).insertBefore($(this).prev());
            });
            
            if (this.options.is_escape_confirm) {
                this.options.is_change = true;
            }
            
        },//按鈕下移事件
        _downClick: function () {
            //下移從最後開始處理
            $(this.element.find("option:selected").get().reverse()).each(function (i) {
                if (!$(this).next().length) return false;
                $(this).insertAfter($(this).next());
            });

            if (this.options.is_escape_confirm) {
                this.options.is_change = true;
            }

        },//BTN樣板
        _templates: {
            upButton: "<input type='button' id='Lup' value='↑' style='width:20px'/>",
            downButton: "<input type='button' id='Ldown' value='↓' style='width:20px'/>"
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
         * @memberof BestListBox
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this
                , currentObj = null;

            //由於span不提供focus, 所以目前做法先聚焦至畫面上第一個input
            //取得data-role含有best,且具有required,但非含有readonly,disabled, hidden的control
            currentObj = that.element.find("select:not([readonly=true],[readonly=readonly],[disabled]):visible:first");
            currentObj.focus();

        },
        //依照strFilter篩選要顯示的資料
        _dataActiveFlag: function (strFilter) {

            var FilterValue,
                that = this;
            if (strFilter == 'y') {
                FilterValue = 'n'
            }
            else if (strFilter == 'n') {
                FilterValue = 'y';
            }

            var dataSource;
            dataSource = that.options.dataSource;

            var index = dataSource.length - 1;
            for (index; index >= 0; index--) {
                if (dataSource[index].DataActiveFlag.toLowerCase() == FilterValue) {
                    dataSource.splice(index, 1);
                }
            }

        },
        /**
         * @desc 取得BestListBox所選取的值
         * @memberof BestListBox
         * @method SelectedValue
         * @param {Array} setValue 設定值(可不傳)
         * @return {Array} 取BestListBox所選取的值
         * @example
         * 取值:element.BestListBox().SelectedValue();
         * 設值:element.BestListBox().SelectedValue(setValue);
         */
        SelectedValue: function (setValue) {
            //取值
            if (setValue == null) {
                var arrValue = new Array();
                this.element.find("option:selected").each(function (i) {
                    arrValue.push(this.value);
                })
                return arrValue
            }
            //設值
            if (setValue != null) {
                this.element.find("option").each(function (i) {
                    $(this).prop("selected", ($.inArray($(this).val(), setValue) != -1));
                })
            }
        },

        /**
         * @desc 取得BestListBox所選取的文字
         * @memberof BestListBox
         * @method SelectedText
         * @return {Array} 取BestListBox所選取的文字
         * @example
         * 取值:element.BestListBox().SelectedText();
         */
        SelectedText: function () {
            var arrText = new Array();
            this.element.find("option:selected").each(function (i) {
                arrText.push($(this).attr("realtext"));
            })
            return arrText
        },
        //設定唯讀處理
        //_readonly: function () {
        //    var that = this;
        //    var disabled = that.element.is("[disabled]")
        //    var readonly = that.element.is("[readonly]")

        //    if (disabled) {
        //        that.enable(false);
        //    } else {
        //        that.readonly(readonly);
        //    }

        //},
        ///**
        // * @desc 啟用設定
        // * @memberof BestListBox
        // * @method enable
        // * @param {boolean} enable 設定值(可不傳)
        // * @example
        // * 啟用:element.BestListBox().enable();
        // * 取消啟用:element.BestListBox().enable(false);
        // */
        //enable: function (enable) {
        //    this._editable({
        //        enable: enable = enable === undefined ? true : enable
        //    });
        //},
        ///**
        // * @desc 唯讀處理
        // * @memberof BestListBox
        // * @method readonly
        // * @param {boolean} readonly 設定值(可不傳)
        // * @example
        // * 唯讀:element.BestListBox().readonly();
        // * 取消唯讀:element.BestListBox().readonly(false);
        // */
        //readonly: function (readonly) {
        //    this._editable({
        //        readonly: readonly === undefined ? true : readonly
        //    });
        //},
        _editable: function (options) {
            var enable = options.disable,
                readonly = options.readonly
            if (readonly === true) {
                this.element.find("select").prop("disabled", "disabled");
                this.element.find("input[type='button']").prop("disabled", "disabled");
            }
            else {
                this.element.find("input[type='button']").removeProp("disabled", "disabled");
                this.element.find("select").removeProp("disabled", "disabled");
            }

            //if (enable === false) {
            //    this.element.find("select").prop("disabled", "disabled");
            //    this.element.find("input[type='button']").prop("disabled", "disabled");
            //}
            //else if (enable === true) {
            //    this.element.find("input[type='button']").removeProp("disabled", "disabled");
            //    this.element.find("select").removeProp("disabled", "disabled");
            //}
        }
    }

    kendo.ui.plugin(widget.extend(GSSListBox));

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