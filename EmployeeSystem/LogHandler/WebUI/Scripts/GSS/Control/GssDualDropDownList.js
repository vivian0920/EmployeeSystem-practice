/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestDualDropDownList
 */

(function () {

    var kendo = window.kendo,
         ui = kendo.ui,
    dualdropdownlist = ui.Widget;

    var GSSDualDropDownList = dualdropdownlist.extend({
        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            dualdropdownlist.fn.init.call(that, element, options);

            that._create();

            //處理readonly_mode
            that._procReadonlyMode();

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
        },
        //設定options的資料格式
        options: {
            /**
             * @property {Array} dataSource DualDropDownList資料來源
             * @default null
             * @MemberOf BestDualDropDownList
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestDualDropDownList
             * @MemberOf BestDualDropDownList
             */
            name: 'BestDualDropDownList',
            /**
             * @property {String} first_text_field 第一個下拉式選項提供每個清單項目文字內容的資料來源的欄位
             * @default firsttext
             * @MemberOf BestDualDropDownList
             */
            first_text_field: ControlDefaultsObject.DualDropDownList.first_text_field || "firsttext",
            /**
             * @property {String} first_value_field 第一個下拉式選項提供每個清單項目值的資料來源的欄位
             * @default firstvalue
             * @MemberOf BestDualDropDownList
             */
            first_value_field: ControlDefaultsObject.DualDropDownList.first_value_field || "firstvalue",
            /**
             * @property {String} first_field_suffix 第一個下拉式選項的後綴詞
             * @default null
             * @MemberOf BestDualDropDownList
             */
            first_field_suffix: ControlDefaultsObject.DualDropDownList.first_field_suffix || null,
            /**
             * @property {String} last_text_field 第二個下拉式選項提供每個清單項目文字內容的資料來源的欄位
             * @default lasttext
             * @MemberOf BestDualDropDownList
             */
            last_text_field: ControlDefaultsObject.DualDropDownList.last_text_field || "lasttext",
            /**
             * @property {String} last_value_field 第二個下拉式選項提供每個清單項目值的資料來源的欄位
             * @default lastvalue
             * @MemberOf BestDualDropDownList
             */
            last_value_field: ControlDefaultsObject.DualDropDownList.last_value_field || "lastvalue",
            /**
             * @property {String} last_field_suffix 第二個下拉式選項的後綴詞
             * @default null
             * @MemberOf BestDualDropDownList
             */
            last_field_suffix: ControlDefaultsObject.DualDropDownList.last_field_suffix || null,
            /**
             * @property {String} cascade_from_field 第一個下拉式選項連動第二個的下拉式選項欄位
             * @default null
             * @MemberOf BestDualDropDownList
             */
            cascade_from_field: ControlDefaultsObject.DualDropDownList.cascade_from_field || null,
            /**
             * @property {String} active_filter 要顯示那些資料
             * @default ""
             * @MemberOf BestDualDropDownList
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            active_filter: ControlDefaultsObject.DualDropDownList.active_filter || null,
            /**
             * @property {String} align DualDropDownList對齊方式
             * @default H
             * @MemberOf BestDualDropDownList
             * @desc H:水平排列<br/>V:垂直排列
             */
            align: ControlDefaultsObject.DualDropDownList.align || "h",
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該DropDownList是否可選取，若設定為False也不會產生DataActiveFlag=N的快捷按鈕
             * @default False
             * @MemberOf BestDualDropDownList
             * @desc True:可以選擇 DataActiveFlag=N的選項<br/>False:不能選擇DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.DualDropDownList.allow_inactive_item || false,
            /**
             * @property {String} webserviceurl 若資料來源為WerService則須給定WerService的URL
             * @default null
             * @MemberOf BestDualDropDownList
             */
            webserviceurl: ControlDefaultsObject.DualDropDownList.webserviceurl || null,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestDualDropDownList
             */
            is_escape_confirm: ControlDefaultsObject.DualDropDownList.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestDualDropDownList
             */
            is_change: ControlDefaultsObject.DualDropDownList.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestDualDropDownList
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestDualDropDownList
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestDualDropDownList
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestDualDropDownList
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestDualDropDownList
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestDualDropDownList
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestDualDropDownList
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },
        /**
        * @desc 唯讀處理
        * @MemberOf BestDualDropDownList
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestDualDropDownList().Breadonly();
        * 取消唯讀:element.BestDualDropDownList().Breadonly(false);
        */
        Breadonly: function (readonly) {
            var that = this,
                isReadonly = readonly === undefined ? true : readonly,
                objFirst = that.firstInterval.data("kendoBestDropDownList"),
                objSecond = that.lastInterval.data("kendoBestDropDownList");

            that._procReadonlyMode();

            objFirst.Breadonly(isReadonly);
            objSecond.Breadonly(isReadonly);

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestDualDropDownList
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestDualDropDownList().Brequired();
         * 不必填: element.BestDualDropDownList().Brequired(false);
         */
        Brequired: function (required) {

            var that = this,
                isRequired = required === undefined ? true : required;

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
         * @memberof BestDualDropDownList
         * @method BsetOptions
         * @param {object} options Options設定物件
         * @example
         * element.BestDualDropDownList().BsetOptions(obj);
         */
        BsetOptions: function (options) {
            var that = this;

            //重新設定Options資料
            ui.Widget.fn.setOptions.call(that, options);

            //set Readonly Mode
            that._procReadonlyMode();

            //重設定required
            ProcRequired(that);
        },

        //檢查控制項目前必填狀態, 回傳:true必填, false非必填
        _chkRequiredStatus: function () {

            var that = this,
                isRequired = that.options.required_status;

            if (!isRequired) {
                //當非必填狀態下, 需要額外判斷必填模式
                if (that.options.required_mode != "N") isRequired = true;
            }

            return isRequired;

        },

        //檢查控制項目前唯讀狀態, 回傳:true唯讀, false非唯讀
        _chkReadOnlyStatus: function () {

            var that = this,
                isReadOnly = that.options.readonly_status;

            if (!isReadOnly) {
                //當非唯讀狀態下, 需要額外判斷唯讀模式
                if (that.options.readonly_mode == "Y") isReadOnly = true;
            }

            return isReadOnly;

        },
        //產生物件
        _create: function () {
            var that = this,
                template,
                elmentID = that.element.attr("id"),
                firstDataSource = that.options.dataSource[0],
                lastDataSource = that.options.dataSource[1];

            //取得inupt template，給上ID
            template = kendo.template(that._templates.input.replace('idname', elmentID + "_First"));
            that.firstInterval = $(template(that.options));

            //依照firstDataSource重new一個kendo.data.DataSource
            //this.options.dataSource = new kendo.data.DataSource({ data: firstDataSource })
            that.options.dataSource = firstDataSource
            //將參數設至GSSDropDownList
            that.element.append(that.firstInterval);
            that.firstInterval.kendoBestDropDownList({
                dataSource: that.options.dataSource,
                text_field: that.options.first_text_field,
                value_field: that.options.first_value_field,
                active_filter: that.options.active_filter,
                allow_inactive_item: that.options.allow_inactive_item,
                suffix: that.options.first_field_suffix,
                is_target: false,
                change: function (e) {
                    if (that.options.readonly_mode.toString().toLocaleLowerCase() !== 'n') {
                        that.lastInterval.data("kendoBestDropDownList").Breadonly()
                    }

                    if (that.options.is_escape_confirm) {
                        that.options.is_change = true;
                    }
                }
            });
            //若為垂直排列則需換行
            if (that.options.align.toLowerCase() == 'v') {
                that.element.append("</br>");
            }
            var isWebService = false;
            //取得inupt template，給上ID
            template = kendo.template(that._templates.input.replace('idname', elmentID + "_Last"));
            that.lastInterval = $(template(that.options));
            //判斷要從WebService撈取資料或是已經有資料丟進來
            if (that.options.webserviceurl != null) {
                isWebService = true;
                var copyOption = $.extend({}, that.options);
                that.options.dataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: function (options) {
                            lastDataSource[0][that.options.cascade_from_field] = that.firstInterval.data("kendoBestDropDownList").value();
                            $.ajax({
                                contentType: "application/json; charset=utf-8",
                                type: "POST",
                                datatype: "json",
                                url: BaseObject.ServiceUrl + copyOption.webserviceurl,
                                data: JSON.stringify(lastDataSource[0]),
                                success: function (result) {
                                    var dataSource = result.d;
                                    var textField = copyOption.last_text_field
                                    var index = dataSource.length - 1;
                                    for (index; index >= 0; index--) {
                                        if (dataSource[index].DataActiveFlag.toLowerCase() == 'n') {
                                            dataSource[index][textField] = dataSource[index][textField] + "(已停用)";
                                        }
                                    }
                                    options.success(result.d);
                                    if (that.options.readonly_mode.toString().toLocaleLowerCase() !== 'n') {
                                        that.lastInterval.data("kendoBestDropDownList").Breadonly()
                                    }
                                }
                            });
                        }
                    }
                });
            }
            else {
                //依照lastDataSource重new一個kendo.data.DataSource
                that.options.dataSource = lastDataSource;
            }

            //將參數設至GSSDropDownList
            that.element.append(that.lastInterval);
            that.lastInterval.kendoBestDropDownList({
                text_field: that.options.last_text_field,
                value_field: that.options.last_value_field,
                cascadeFrom: "BestDualDDL_" + elmentID + "_First",
                cascadeFromField: that.options.cascade_from_field || that.options.first_value_field,
                active_filter: that.options.active_filter,
                allow_inactive_item: that.options.allow_inactive_item,
                dataSource: that.options.dataSource,
                suffix: that.options.last_field_suffix,
                is_target: false,
                is_webservice: isWebService,
                //移除必輸提示
                change: function (e) {
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
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.FirstSelectedValue().length > 0 || that.LastSelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this
            if (that.FirstSelectedValue().length > 0 && that.LastSelectedValue().length > 0) {
                return true;
            } else {
                return false;
            }

        },
        //設定游標在控制項上
        focus: function () {
            var that = this;

            //由於span不提供focus, 所以目前做法先聚焦至畫面上第一個input
            that.element.BestDualDropDownList().firstInterval.BestDropDownList().focus();

        },

        //處理ReadonlyMode
        _procReadonlyMode: function () {
            var that = this,
                objFirst = that.firstInterval.data("kendoBestDropDownList"),
                objSecond = that.lastInterval.data("kendoBestDropDownList");

            if (that.options.readonly_mode != null) {
                switch (that.options.readonly_mode) {
                    case "Y":   //Both Readonly
                        objFirst.BsetOptions({ readonly_mode: "Y" });
                        objSecond.BsetOptions({ readonly_mode: "Y" });
                        break;
                    case 1:   //First Readonly Second Not Readonly
                        objFirst.BsetOptions({ readonly_mode: "Y" });
                        objSecond.BsetOptions({ readonly_mode: "N" });
                        break;
                    case 2:   //First Not Readonly Second Readonly
                        objFirst.BsetOptions({ readonly_mode: "N" });
                        objSecond.BsetOptions({ readonly_mode: "Y" });
                        break;
                    case "N":   //Both Not Readonly
                        objFirst.BsetOptions({ readonly_mode: "N" });
                        if (objFirst.Bvalue().length > 0) {
                            objSecond.BsetOptions({ readonly_mode: "N" });
                        } else {
                            objSecond.BsetOptions({ readonly_mode: "Y" });
                        }
                        break;

                }
            }
        },

        /**
         * @desc 設定控制項是否鎖定
         * @memberof BestDualDropDownList
         * @method Block
         * @param {bool} lock 是否鎖定
         * @example
         * 鎖定: element.Block();
         * 鎖定: element.Block(true);
         * 不鎖定: element.Block(false);
         */
        Block: function (lock) {

            var that = this,
                objFirst = that.firstInterval.data("kendoBestDropDownList"),
                objSecond = that.lastInterval.data("kendoBestDropDownList");
                isLock = lock === undefined ? true : lock;

            objFirst.Block(lock);
            objSecond.Block(lock);

        },
        //下拉選項TAEMPLATES
        _templates: {
            input: "<input id='BestDualDDL_idname'/>'"
        },
        /**
         * @desc 取得DualDropDownList第一個下拉式選項所選取的值
         * @memberof BestDualDropDownList
         * @method FirstSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取DualDropDownList第一個下拉式選項所選取的值
         * @example
         * 取值:element.BestDualDropDownList().FirstSelectedValue();
         * 設值:element.BestDualDropDownList().FirstSelectedValue(setValue);
         */
        FirstSelectedValue: function (setValue) {
            var that = this;

            //取值
            if (setValue == null) {
                return that.firstInterval.data("kendoBestDropDownList").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.firstInterval.data("kendoBestDropDownList").Bvalue(setValue);
            }
        },
        /**
         * @desc 取得DualDropDownList第一個下拉式選項所選取的文字
         * @memberof BestDualDropDownList
         * @method FirstSelectedText
         * @return {String} 取DualDropDownList第一個下拉式選項所選取的文字
         * @example
         * 取值:element.BestDualDropDownList().FirstSelectedText();
         */
        FirstSelectedText: function () {
            var that = this;
            return that.firstInterval.data("kendoBestDropDownList").Btext();
        },
        /**
         * @desc 取得DualDropDownList第二個下拉式選項所選取的值
         * @memberof BestDualDropDownList
         * @method LastSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取DualDropDownList第二個下拉式選項所選取的值
         * @example
         * 取值:element.BestDualDropDownList().LastSelectedValue();
         * 設值:element.BestDualDropDownList().LastSelectedValue(setValue);
         */
        LastSelectedValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.lastInterval.data("kendoBestDropDownList").Bvalue();
            }
            //設值
            if (setValue != null) {
                return that.lastInterval.data("kendoBestDropDownList").Bvalue(setValue);
            }
        },
        /**
         * @desc 取得DualDropDownList第二個下拉式選項所選取的文字
         * @memberof BestDualDropDownList
         * @method LastSelectedText
         * @return {String} 取DualDropDownList第二個下拉式選項所選取的文字
         * @example
         * 取值:element.BestDualDropDownList().LastSelectedText();
         */
        LastSelectedText: function () {
            var that = this;
            return that.lastInterval.data("kendoBestDropDownList").Btext();
        },
        FirstDropDownList: function () {
            var that = this;
            return that.firstInterval.data("kendoBestDropDownList");
        },
        LastDropDownList: function () {
            var that = this;
            return that.lastInterval.data("kendoBestDropDownList");
        }
    })

    kendo.ui.plugin(GSSDualDropDownList);

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

})(jQuery);