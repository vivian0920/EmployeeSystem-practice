/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestTripleComboBox
 */

(function () {

    var kendo = window.kendo,
        ui = kendo.ui,
        triplecombobox = ui.Widget;

    var GSSTripleComboBox = triplecombobox.extend({
        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);


            triplecombobox.fn.init.call(that, element, options);
            that._create(element.id);
            //that._readonly();
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
             * @MemberOf BestTripleComboBox
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestTripleComboBox
             * @MemberOf BestTripleComboBox
             */
            name: 'BestTripleComboBox',
            /**
             * @property {String} first_text_field 第一個ComboBox提供每個清單項目文字內容的資料來源的欄位
             * @default firsttext
             * @MemberOf BestTripleComboBox
             */
            first_text_field: ControlDefaultsObject.TripleComboBox.first_text_field || "firsttext",
            /**
             * @property {String} first_value_field 第一個ComboBox提供每個清單項目值的資料來源的欄位
             * @default firstvalue
             * @MemberOf BestTripleComboBox
             */
            first_value_field: ControlDefaultsObject.TripleComboBox.first_value_field || "firstvalue",
            /**
             * @property {String} first_field_suffix 第一個ComboBox的後綴詞
             * @default null
             * @MemberOf BestTripleComboBox
             */
            first_field_suffix: ControlDefaultsObject.TripleComboBox.first_field_suffix || null,
            /**
             * @property {String} middle_text_field 第二個ComboBox提供每個清單項目文字內容的資料來源的欄位
             * @default lasttext
             * @MemberOf BestTripleComboBox
             */
            middle_text_field: ControlDefaultsObject.TripleComboBox.middle_text_field || "middletext",
            /**
             * @property {String} middle_value_field 第二個ComboBox提供每個清單項目值的資料來源的欄位
             * @default lastvalue
             * @MemberOf BestTripleComboBox
             */
            middle_value_field: ControlDefaultsObject.TripleComboBox.middle_value_field || "middlevalue",
            /**
             * @property {String} middle_cascadefrom_field 第一個ComboBox連動第二個ComboBox的欄位
             * @default null
             * @MemberOf BestTripleComboBox
             */
            middle_cascadefrom_field: ControlDefaultsObject.TripleComboBox.middle_cascadefrom_field || null,
            /**
             * @property {String} middle_webserviceurl 第二個下拉式選項若資料來源為WerService則須給定WerService的URL
             * @default null
             * @MemberOf BestTripleDropDownList
             */
            middle_webserviceurl: ControlDefaultsObject.TripleComboBox.middle_webserviceurl || null,
            /**
             * @property {String} middle_field_suffix 第二個ComboBox的後綴詞
             * @default null
             * @MemberOf BestTripleComboBox
             */
            middle_field_suffix: ControlDefaultsObject.TripleComboBox.middle_field_suffix || null,
            /**
             * @property {String} last_text_field 第三個ComboBox提供每個清單項目文字內容的資料來源的欄位
             * @default lasttext
             * @MemberOf BestTripleComboBox
             */
            last_text_field: ControlDefaultsObject.TripleComboBox.last_text_field || "lasttext",
            /**
             * @property {String} last_value_field 第三個ComboBox提供每個清單項目值的資料來源的欄位
             * @default lastvalue
             * @MemberOf BestTripleComboBox
             */
            last_value_field: ControlDefaultsObject.TripleComboBox.last_value_field || "lastvalue",
            /**
             * @property {String} last_cascadefrom_field 第二個ComboBox連動第三個ComboBox的欄位
             * @default null
             * @MemberOf BestTripleComboBox
             */
            last_cascadefrom_field: ControlDefaultsObject.TripleComboBox.last_cascadefrom_field || null,
            /**
             * @property {String} last_webserviceurl 第三個下拉式選項若資料來源為WerService則須給定WerService的URL
             * @default null
             * @MemberOf BestTripleDropDownList
             */
            last_webserviceurl: ControlDefaultsObject.TripleComboBox.last_webserviceurl || null,
            /**
             * @property {String} last_field_suffix 第三個ComboBox的後綴詞
             * @default null
             * @MemberOf BestTripleComboBox
             */
            last_field_suffix: ControlDefaultsObject.TripleComboBox.last_field_suffix || null,
            /**
             * @property {String} active_filter 要顯示那些資料
             * @default ""
             * @MemberOf BestTripleComboBox
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            active_filter: ControlDefaultsObject.TripleComboBox.active_filter || null,
            /**
             * @property {String} filter ComboBox內建資料篩選方式
             * @default contains
             * @MemberOf BestTripleComboBox
             */
            filter: ControlDefaultsObject.TripleComboBox.filter || "contains",
            /**
             * @property {String} align DualComboBox對齊方式
             * @default H
             * @MemberOf BestTripleComboBox
             * @desc H:水平排列<br/>V:垂直排列
             */
            align: ControlDefaultsObject.TripleComboBox.align || "h",
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該DropDownList是否可選取，若設定為False也不會產生DataActiveFlag=N的快捷按鈕
             * @default False
             * @MemberOf BestTripleComboBox
             * @desc True:可以選擇 DataActiveFlag=N的選項<br/>False:不能選擇DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.TripleComboBox.allow_inactive_item || false,
            ///**
            // * @property {Boolean} 第二個ComboBox是否可編輯
            // * @default true
            // * @MemberOf BestTripleComboBox
            // */
            //is_middle_field_writable: ControlDefaultsObject.TripleComboBox.is_middle_field_writable || true,
            ///**
            // * @property {Boolean} 第三個ComboBox是否可編輯
            // * @default true
            // * @MemberOf BestTripleComboBox
            // */
            //is_last_field_writable: ControlDefaultsObject.TripleComboBox.is_last_field_writable || true,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestTripleComboBox
             */
            is_escape_confirm: ControlDefaultsObject.TripleComboBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestTripleComboBox
             */
            is_change: ControlDefaultsObject.TripleComboBox.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestTripleComboBox
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestTripleComboBox
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestTripleComboBox
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestTripleComboBox
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestTripleComboBox
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestTripleComboBox
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestTripleComboBox
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },
        /**
        * @desc 唯讀處理
        * @MemberOf BestTripleComboBox
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestTripleComboBox().Breadonly();
        * 取消唯讀:element.BestTripleComboBox().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                objFirst = that.firstInterval.data("kendoBestComboBox"),
                objSecond = that.middleInterval.data("kendoBestComboBox"),
                objLast = that.lastInterval.data("kendoBestComboBox"),
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
            if (isReadonly) {
                objFirst.Breadonly(isReadonly);
                objSecond.Breadonly(isReadonly);
                objLast.Breadonly(isReadonly);
            } else {
                objFirst.Breadonly(isReadonly);
                if (objFirst.Bvalue().length > 0) {
                    objSecond.Breadonly(isReadonly);
                }
                if (objSecond.Bvalue().length > 0) {
                    objLast.Breadonly(isReadonly);
                }
            }

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestTripleComboBox
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestTripleComboBox().Brequired();
         * 不必填: element.BestTripleComboBox().Brequired(false);
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
         * @memberof BestTripleComboBox
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestTripleComboBox().BsetOptions(obj);
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
        //產生物件
        _create: function (elmentID) {
            var that = this,
                middleIsWebService = false,
                lastIsWebService = false,
                template,
                copyOptions;
            //取得inupt template，給上ID
            template = kendo.template(that._templates.input.replace('idname', elmentID + "_First"));
            that.firstInterval = $(template(that.options));

            var firstDataSource = that.options.dataSource[0];
            var middleDataSource = that.options.dataSource[1];
            var lastDataSource = that.options.dataSource[2];
            //依照firstDataSource重new一個kendo.data.DataSource
            that.options.dataSource = new kendo.data.DataSource({ data: firstDataSource })
            that.options.dataSource = firstDataSource

            //將參數設至GSSComboBox
            that.element.append(that.firstInterval);
            that.firstInterval.kendoBestComboBox({
                dataSource: that.options.dataSource,
                text_field: that.options.first_text_field,
                value_field: that.options.first_value_field,
                active_filter: that.options.active_filter,
                is_target: false,
                allow_inactive_item: that.options.allow_inactive_item,
                change: function (e) {
                    //若輸入值不存在清單中，清空並出現警示訊息
                    if (this.value() && this.selectedIndex == -1) {
                        alert("該項目不存在於清單中");
                        this.value("");
                    }
                    //若第為空值則清空第三個ComboBox並唯讀
                    if (that.firstInterval.data("kendoBestComboBox").value() == "" || that.middleInterval.data("kendoBestComboBox").value() == "") {
                        that.lastInterval.data("kendoBestComboBox").Bvalue("");
                        that.lastInterval.data("kendoBestComboBox").Breadonly();
                    }
                    //if (that.options.is_middle_field_writable.toString().toLocaleLowerCase() == 'false') {
                    //    that.middleInterval.data("kendoBestComboBox").enable(false);
                    //}
                    if (that.options.readonly_status.toString().toLocaleLowerCase() === 'true') {
                        that.middleInterval.data("kendoBestComboBox").Breadonly()
                    }

                    if (that.options.is_escape_confirm) {
                        that.options.is_change = true;
                    }
                }
            });

            //若有填上後綴詞時，需自動bind
            if (that.options.first_field_suffix != null) {
                that.element.append("<span>" + that.options.first_field_suffix + "</span>");
            }
            //若為垂直排列則需換行
            if (that.options.align.toLowerCase() == 'v') {
                that.element.append("</br>");
            }

            //取得inupt template，給上ID
            template = kendo.template(that._templates.input.replace('idname', elmentID + "_Middle"));
            that.middleInterval = $(template(that.options));
            //判斷要從WebService撈取資料或是已經有資料丟進來
            if (that.options.middle_webserviceurl != null) {
                middlIsWebService = true;
                copyOptions = $.extend({}, that.options);
                that.options.dataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: function (options) {
                            middleDataSource[0][copyOptions.middle_cascadefrom_field] = that.firstInterval.data("kendoBestComboBox").value();
                            $.ajax({
                                contentType: "application/json; charset=utf-8",
                                type: "POST",
                                datatype: "json",
                                url: BaseObject.ServiceUrl + copyOptions.middle_webserviceurl,
                                data: JSON.stringify(middleDataSource[0]),
                                success: function (result) {
                                    var Source = result.d;
                                    var textField = copyOptions.middle_text_field
                                    var index = Source.length - 1;
                                    for (index; index >= 0; index--) {
                                        if (Source[index].DataActiveFlag.toLowerCase() == 'n') {
                                            Source[index][textField] = Source[index][textField] + "(已停用)";
                                        }
                                    }
                                    options.success(Source);
                                    //if (copyOptions.is_middle_field_writable.toString().toLocaleLowerCase() == 'false') {
                                    //    that.middleInterval.data("kendoBestComboBox").enable(false);
                                    //}
                                    if (that.options.readonly_status.toString().toLocaleLowerCase() === 'true') {
                                        that.middleInterval.data("kendoBestComboBox").Breadonly()
                                    }
                                    //定義第三個ComBox的DataSource
                                    var dataSource;
                                    if (copyOptions.last_webserviceurl != null) {
                                        lastIsWebService = true;
                                        dataSource = new kendo.data.DataSource({
                                            serverFiltering: true,
                                            transport: {
                                                read: function (options) {
                                                    lastDataSource[0][copyOptions.last_cascadefrom_field] = that.middleInterval.data("kendoBestComboBox").value();
                                                    $.ajax({
                                                        contentType: "application/json; charset=utf-8",
                                                        type: "POST",
                                                        datatype: "json",
                                                        url: BaseObject.ServiceUrl + copyOptions.last_webserviceurl,
                                                        data: JSON.stringify(lastDataSource[0]),
                                                        success: function (result) {
                                                            var Source = result.d;
                                                            var textField = copyOptions.last_text_field
                                                            var index = Source.length - 1;
                                                            for (index; index >= 0; index--) {
                                                                if (Source[index].DataActiveFlag.toLowerCase() == 'n') {
                                                                    Source[index][textField] = Source[index][textField] + "(已停用)";
                                                                }
                                                            }
                                                            options.success(Source);
                                                            that.lastInterval.kendoBestComboBox({
                                                                text_field: copyOptions.last_text_field,
                                                                value_field: copyOptions.last_value_field,
                                                                active_filter: copyOptions.active_filter,
                                                                allow_inactive_item: copyOptions.allow_inactive_item,
                                                                is_target: false,
                                                                dataSource: Source,
                                                                //若輸入值不存在清單中，清空並出現警示訊息
                                                                change: function (e) {
                                                                    if (this.value() && this.selectedIndex == -1) {
                                                                        alert("該項目不存在於清單中");
                                                                        this.value("");
                                                                    }
                                                                    if (this._chkRequired()) {

                                                                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                                                                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(elmentID);
                                                                        }

                                                                    }

                                                                    if (that.options.is_escape_confirm) {
                                                                        that.options.is_change = true;
                                                                    }
                                                                }
                                                            });
                                                            //if (copyOptions.is_last_field_writable.toString().toLocaleLowerCase() == 'false') {
                                                            //    that.lastInterval.data("kendoBestComboBox").enable(false)
                                                            //}
                                                            if (copyOptions.readonly_status.toString().toLocaleLowerCase() === 'true') {
                                                                that.lastInterval.data("kendoBestComboBox").Breadonly()
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        })
                                    }
                                    else {
                                        lastIsWebService = false;
                                        dataSource = lastDataSource;
                                    }
                                    //重新Bind第二個ComboBox
                                    that.middleInterval.kendoBestComboBox({
                                        text_field: copyOptions.middle_text_field,
                                        value_field: copyOptions.middle_value_field,
                                        active_filter: copyOptions.active_filter,
                                        allow_inactive_item: copyOptions.allow_inactive_item,
                                        is_target: false,
                                        dataSource: Source,
                                        is_webservice: "false",
                                        //Bind資料改變的事件
                                        change: function (e) {
                                            //若輸入值不存在清單中，清空並出現警示訊息
                                            if (this.value() && this.selectedIndex == -1) {
                                                alert("該項目不存在於清單中");
                                                this.value("");
                                            }
                                            //若第為空值則清空第三個ComboBox並唯讀
                                            if (this.selectedIndex == -1) {
                                                that.lastInterval.data("kendoBestComboBox").Bvalue("");
                                                that.lastInterval.data("kendoBestComboBox").Breadonly();
                                            }
                                            //if (copyOptions.is_last_field_writable.toString().toLocaleLowerCase() == 'false') {
                                            //    that.lastInterval.data("kendoBestComboBox").enable(false)
                                            //}
                                            if (copyOptions.readonly_status.toString().toLocaleLowerCase() === 'true') {
                                                that.lastInterval.data("kendoBestDropDownList").Breadonly()
                                            }
                                            if (that.options.is_escape_confirm) {
                                                that.options.is_change = true;
                                            }
                                        },
                                        //Bind選取資料的事件
                                        select: function (e) {
                                            //把第三個ComboBox清空、取消唯讀再重新Bind資料
                                            that.lastInterval.data("kendoBestComboBox").value("");
                                            that.lastInterval.data("kendoBestComboBox").enable(true);

                                            that.lastInterval.kendoBestComboBox({
                                                text_field: copyOptions.last_text_field,
                                                value_field: copyOptions.last_value_field,
                                                cascadeFrom: "BestTripleComboBox" + elmentID + "_Middle",
                                                cascadeFromField: copyOptions.last_cascadefrom_field || copyOptions.middle_value_field,
                                                active_filter: copyOptions.active_filter,
                                                allow_inactive_item: copyOptions.allow_inactive_item,
                                                is_target: false,
                                                dataSource: dataSource,
                                                is_webservice: lastIsWebService,
                                                //若輸入值不存在清單中，清空並出現警示訊息
                                                change: function (e) {
                                                    if (this.value() && this.selectedIndex == -1) {
                                                        alert("該項目不存在於清單中");
                                                        this.value("");
                                                    }
                                                    if (this._chkRequired()) {

                                                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                                                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(elmentID);
                                                        }

                                                    }

                                                    if (that.options.is_escape_confirm) {
                                                        that.options.is_change = true;
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
            else {
                //依照middleDataSource重new一個kendo.data.DataSource
                //that.options.dataSource = new kendo.data.DataSource({ data: middleDataSource });
                middlIsWebService = false;
                that.options.dataSource = middleDataSource;
            }
            //將參數設至GSSComboBox
            that.element.append(that.middleInterval);
            that.middleInterval.kendoBestComboBox({
                text_field: that.options.middle_text_field,
                value_field: that.options.middle_value_field,
                cascadeFrom: "BestTripleComboBox" + elmentID + "_First",
                cascadeFromField: that.options.middle_cascadefrom_field || that.options.first_value_field,
                active_filter: that.options.active_filter,
                allow_inactive_item: that.options.allow_inactive_item,
                is_target: false,
                dataSource: that.options.dataSource,
                is_webservice: middleIsWebService,
                change: function (e) {
                    if (this.value() && this.selectedIndex == -1) {
                        alert("該項目不存在於清單中");
                        this.value("");
                    }
                    //if (that.options.is_last_field_writable.toString().toLocaleLowerCase() == 'false') {
                    //    that.lastInterval.data("kendoBestComboBox").enable(false)
                    //}
                    if (that.options.readonly_status.toString().toLocaleLowerCase() === 'true') {
                        that.lastInterval.data("kendoBestComboBox").Breadonly()
                    }
                    
                    if (that.options.is_escape_confirm) {
                        that.options.is_change = true;
                    }
                }
            });

            //若有填上後綴詞時，需自動bind
            if (that.options.middle_field_suffix != null) {
                that.element.append("<span>" + that.options.middle_field_suffix + "</span>");
            }

            //若為垂直排列則需換行
            if (that.options.align.toLowerCase() == 'v') {
                that.element.append("</br>");
            }

            //取得inupt template，給上ID
            template = kendo.template(that._templates.input.replace('idname', elmentID + "_Last"));
            that.lastInterval = $(template(that.options));
            //判斷要從WebService撈取資料或是已經有資料丟進來
            if (that.options.last_webserviceurl != null) {
                lastIsWebService = true;
                copyOptions = $.extend({}, that.options);
                that.options.dataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: function (options) {
                            lastDataSource[0][copyOptions.last_cascadefrom_field] = that.middleInterval.data("kendoBestComboBox").value();
                            $.ajax({
                                contentType: "application/json; charset=utf-8",
                                type: "POST",
                                datatype: "json",
                                url: BaseObject.ServiceUrl + copyOptions.last_webserviceurl,
                                data: JSON.stringify(lastDataSource[0]),
                                success: function (result) {
                                    var Source = result.d;
                                    var textField = copyOptions.last_text_field
                                    var index = Source.length - 1;
                                    for (index; index >= 0; index--) {
                                        if (Source[index].DataActiveFlag.toLowerCase() == 'n') {
                                            Source[index][textField] = Source[index][textField] + "(已停用)";
                                        }
                                    }
                                    options.success(Source);
                                    that.lastInterval.kendoBestComboBox({
                                        text_field: copyOptions.last_text_field,
                                        value_field: copyOptions.last_value_field,
                                        active_filter: copyOptions.active_filter,
                                        allow_inactive_item: copyOptions.allow_inactive_item,
                                        is_target: false,
                                        dataSource: Source,
                                        is_webservice: "false",
                                        //若輸入值不存在清單中，清空並出現警示訊息
                                        change: function (e) {
                                            if (this.value() && this.selectedIndex == -1) {
                                                alert("該項目不存在於清單中");
                                                this.value("");
                                            }
                                            if (this._chkRequired()) {

                                                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                                                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(elmentID);
                                                }

                                            }
                                            if (that.options.is_escape_confirm) {
                                                that.options.is_change = true;
                                            }
                                        }
                                    });
                                    //if (copyOptions.is_last_field_writable.toString().toLocaleLowerCase() == 'false') {
                                    //    that.lastInterval.data("kendoBestComboBox").enable(false)
                                    //}
                                    if (copyOptions.readonly_status.toString().toLocaleLowerCase() === 'true') {
                                        that.lastInterval.data("kendoBestComboBox").Breadonly()
                                    }
                                }
                            });
                        }
                    }
                });
            }
            else {
                //依照lastDataSource重new一個kendo.data.DataSource
                //that.options.dataSource = new kendo.data.DataSource({ data: lastDataSource });
                lastIsWebService = "false"
                that.options.dataSource = lastDataSource;
            }

            //將參數設至GSSComboBox
            that.element.append(that.lastInterval);
            that.lastInterval.kendoBestComboBox({
                text_field: that.options.last_text_field,
                value_field: that.options.last_value_field,
                cascadeFrom: "BestTripleComboBox" + elmentID + "_Middle",
                cascadeFromField: that.options.last_cascadefrom_field || that.options.middle_value_field,
                active_filter: that.options.active_filter,
                allow_inactive_item: that.options.allow_inactive_item,
                is_target: false,
                dataSource: that.options.dataSource,
                is_webservice: lastIsWebService,
                //若輸入值不存在清單中，清空並出現警示訊息
                change: function (e) {
                    if (this.value() && this.selectedIndex == -1) {
                        alert("該項目不存在於清單中");
                        this.value("");
                    }
                    if (this._chkRequired()) {

                        if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                            ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(elmentID);
                        }

                    }
                    if (that.options.is_escape_confirm) {
                        that.options.is_change = true;
                    }
                }
            });

            //若有填上後綴詞時，需自動bind
            if (that.options.last_field_suffix != null) {
                that.element.append("<span>" + that.options.last_field_suffix + "</span>");
            }
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.FirstSelectedValue().length > 0 || that.MiddleSelectedValue().length > 0 || that.LastSelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this
            if (that.FirstSelectedValue().length > 0 && that.MiddleSelectedValue().length > 0 && that.LastSelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }
        },
        //設定游標在控制項上
        focus: function () {

            var that = this;

            //由於span不提供focus, 所以目前做法先聚焦至畫面上第一個input
            that.element.BestTripleComboBox().firstInterval.BestComboBox().focus();

        },

        /**
         * @desc 設定控制項是否鎖定
         * @memberof BestTripleComboBox
         * @method Block
         * @param {bool} lock 是否鎖定
         * @example
         * 鎖定: element.Block();
         * 鎖定: element.Block(true);
         * 不鎖定: element.Block(false);
         */
        Block: function (lock) {

            var that = this,
                objFirst = that.firstInterval.data("kendoBestComboBox"),
                objSecond = that.middleInterval.data("kendoBestComboBox"),
                objLast = that.lastInterval.data("kendoBestComboBox"),
                isLock = lock === undefined ? true : lock;

            objFirst.Block(lock);
            objSecond.Block(lock);
            objLast.Block(lock);

        },
        //快速查詢按鈕TAEMPLATES
        _templates: {
            input: "<input id='BestTripleComboBoxidname'/>'"
        },
        /**
         * @desc 取得TripleComboBox第一個ComboBox所選取的值
         * @memberof BestTripleComboBox
         * @method FirstSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取TripleComboBox第一個ComboBox所選取的值
         * @example
         * 取值:element.BestTripleComboBox().FirstSelectedValue();
         * 設值:element.BestTripleComboBox().FirstSelectedValue(setValue);
         */
        FirstSelectedValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.firstInterval.data("kendoBestComboBox").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.firstInterval.data("kendoBestComboBox").Bvalue(setValue);
            }
        },
        /**
         * @desc 取得TripleComboBox第一個ComboBox所選取的文字
         * @memberof BestTripleComboBox
         * @method FirstSelectedText
         * @return {String} 取TripleComboBox第一個ComboBox所選取的文字
         * @example
         * 取值:element.BestTripleComboBox().FirstSelectedText();
         */
        FirstSelectedText: function () {
            var that = this;
            return that.firstInterval.data("kendoBestComboBox").Btext();
        },
        /**
         * @desc 取得TripleComboBox第二個ComboBox所選取的值
         * @memberof BestTripleComboBox
         * @method MiddleSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取TripleComboBox第二個ComboBox所選取的值
         * @example
         * 取值:element.BestTripleComboBox().MiddleSelectedValue();
         * 設值:element.BestTripleComboBox().MiddleSelectedValue(setValue);
         */
        MiddleSelectedValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.middleInterval.data("kendoBestComboBox").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.middleInterval.data("kendoBestComboBox").Bvalue(setValue);
            }
        },
        /**
         * @desc 取得TripleComboBox第二個ComboBox所選取的文字
         * @memberof BestTripleComboBox
         * @method MiddleSelectedText
         * @return {String} 取TripleComboBox第二個ComboBox所選取的文字
         * @example
         * 取值:element.BestTripleComboBox().MiddleSelectedText();
         */
        MiddleSelectedText: function () {
            var that = this;
            return that.middleInterval.data("kendoBestComboBox").Btext();
        },
        /**
         * @desc 取得TripleComboBox第三個ComboBox所選取的值
         * @memberof BestTripleComboBox
         * @method LastSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取TripleComboBox第三個ComboBox所選取的值
         * @example
         * 取值:element.BestTripleComboBox().LastSelectedValue();
         * 設值:element.BestTripleComboBox().LastSelectedValue(setValue);
         */
        LastSelectedValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.lastInterval.data("kendoBestComboBox").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.lastInterval.data("kendoBestComboBox").Bvalue(setValue);
            }
        },
        /**
         * @desc 取得TripleComboBox第三個ComboBox所選取的文字
         * @memberof BestTripleComboBox
         * @method LastSelectedText
         * @return {String} 取TripleComboBox第三個ComboBox所選取的文字
         * @example
         * 取值:element.BestTripleComboBox().LastSelectedText();
         */
        LastSelectedText: function () {
            var that = this;
            return that.lastInterval.data("kendoBestComboBox").Btext();
        }
    })

    kendo.ui.plugin(GSSTripleComboBox);

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