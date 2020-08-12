/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @class BestDualListBox
 */

(function () {
    var kendo = window.kendo,
        ui = kendo.ui,
        duallistbox = ui.Widget;
    //Objoptions;
    var GSSDualListBox = duallistbox.extend({
        //Init事件
        init: function (element, options) {
            var that = this,
                initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);
           
            duallistbox.fn.init.call(that, element, options);

            that._create(element.id);
            that._btnOrder();
            that._readonly();
        },
        options: {
            /**
             * @property {Array} dataSource ListBox資料來源
             * @default null
             * @MemberOf BestDualListBox
             */
            dataSource: {},
            /**
             * @property {String} name 物件名稱
             * @default BestDualListBox
             * @MemberOf BestDualListBox
             */
            name: 'BestDualListBox',
            /**
             * @property {String} first_text_field 第一個ListBox提供每個清單項目文字內容的資料來源的欄位
             * @default firsttext
             * @MemberOf BestDualListBox
             */
            first_text_field: ControlDefaultsObject.DualListBox.first_text_field || "firsttext",
            /**
             * @property {String} first_value_field 第一個ListBox提供每個清單項目值的資料來源的欄位
             * @default firstvalue
             * @MemberOf BestDualListBox
             */
            first_value_field: ControlDefaultsObject.DualListBox.first_value_field || "firstvalue",
            /**
             * @property {String} first_field_suffix 第一個ListBox的後綴詞
             * @default null
             * @MemberOf BestDualListBox
             */
            first_field_suffix: ControlDefaultsObject.DualListBox.first_field_suffix || null,
            /**
             * @property {String} last_text_field 第二個ListBox提供每個清單項目文字內容的資料來源的欄位
             * @default lasttext
             * @MemberOf BestDualListBox
             */
            last_text_field: ControlDefaultsObject.DualListBox.last_text_field || "lasttext",
            /**
             * @property {String} last_value_field 第二個ListBox提供每個清單項目值的資料來源的欄位
             * @default lastvalue
             * @MemberOf BestDualListBox
             */
            last_value_field: ControlDefaultsObject.DualListBox.last_value_field || "lastvalue",
            /**
             * @property {String} last_field_suffix 第二個ListBox的後綴詞
             * @default null
             * @MemberOf BestDualListBox
             */
            last_field_suffix: ControlDefaultsObject.DualListBox.last_field_suffix || null,
            /**
             * @property {Boolean} allow_inactive_item 依照DataActiveFlag的值決定該ListBox是否可編輯
             * @default False
             * @MemberOf BestDualListBox
             * @desc True:Enable DataActiveFlag=N的選項<br/>False:Disabled DataActiveFlag=N的選項
             */
            allow_inactive_item: ControlDefaultsObject.DualListBox.allow_inactive_item || false,
            /**
             * @property {String} filter 要顯示那些資料
             * @default ""
             * @MemberOf BestDualListBox
             * @desc "":顯示全部資料<br/>Y:顯示DataActiveFlag =Y者<br/>N:顯示DataActiveFlag =N者
             */
            filter: ControlDefaultsObject.DualListBox.filter || "",
            /**
             * @property {Boolean} is_multi_selection 是否複選，若單選需控制只能勾選一個選項
             * @default true
             * @MemberOf BestDualListBox
             */
            is_multi_selection: ControlDefaultsObject.DualListBox.is_multi_selection || true,
            /**
             * @property {String} select_height ListBox高度
             * @default auto
             * @MemberOf BestDualListBox
             */
            select_height: ControlDefaultsObject.DualListBox.select_height || "auto",
            /**
             * @property {String} transfer_mode 移動或複製
             * @default move
             * @MemberOf BestDualListBox
             */
            transfer_mode: ControlDefaultsObject.DualListBox.transfer_mode || "move",
            /**
             * @property {Boolean} is_reorder 是否排序
             * @default true
             * @MemberOf BestDualListBox
             */
            is_reorder: ControlDefaultsObject.DualListBox.is_reorder || true,
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestDualListBox
             */
            is_escape_confirm: ControlDefaultsObject.DualListBox.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestDualListBox
             */
            is_change: ControlDefaultsObject.DualListBox.is_change || false
        },
        //產生物件
        _create: function (elmentID) {
            var that = this,
                template,
                firstDataSource = that.options.dataSource[0],
                lastDataSource = that.options.dataSource[1];

            //取得inupt template，給上ID
            template = kendo.template(that._templates.spanFirst.replace('idname', elmentID + "_First"));
            that.firstInterval = $(template(that.options));

            //依照firstDataSource重new一個kendo.data.DataSource
            that.options.dataSource = firstDataSource

            //將參數設至GSSDualListBox
            that.element.append(that.firstInterval);
            that.firstInterval.kendoBestListBox({
                dataSource: that.options.dataSource,
                text_field: that.options.first_text_field,
                value_field: that.options.first_value_field,
                filter: that.options.filter,
                allow_inactive_item: that.options.allow_inactive_item,
                suffix: that.options.first_field_suffix,
                is_multi_selection: that.options.is_multi_selection,
                is_btn_enable: true,
                select_height: that.options.select_height,
                is_escape_confirm: that.options.is_escape_confirm,
                is_change: that.options.is_change
            })

            //取得inupt template，給上ID
            template = kendo.template(that._templates.spanLast.replace('idname', elmentID + "_Last"));
            that.lastInterval = $(template(that.options));

            //依照lastDataSource重new一個kendo.data.DataSource
            that.options.dataSource = lastDataSource;

            //將參數設至GSSDualListBox
            that.element.append(that.lastInterval);
            that.lastInterval.kendoBestListBox({
                dataSource: that.options.dataSource,
                text_field: that.options.last_text_field,
                value_field: that.options.last_value_field,
                filter: that.options.filter,
                allow_inactive_item: that.options.allow_inactive_item,
                suffix: that.options.last_field_suffix,
                is_multi_selection: that.options.is_multi_selection,
                is_btn_enable: true,
                select_height: that.options.select_height,
                is_escape_confirm: that.options.is_escape_confirm,
                is_change: that.options.is_change
            })
        },
        //設定唯讀處理
        _readonly: function () {
            var that = this;
            var disabled = that.element.is("[disabled]")
            var readonly = that.element.is("[readonly]")

            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(readonly);
            }
        },
        readonly: function (readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly
            });
        },
        enable: function (enable) {
            this._editable({
                disable: enable = enable === undefined ? true : enable
            });
        },
        //處理是否可編輯
        _editable: function (options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                objFirstCBO = that.firstInterval.data("kendoBestListBox"),
                objLastCBO = that.lastInterval.data("kendoBestListBox");
            if (readonly !== undefined) {
                objFirstCBO.readonly(readonly);
                objLastCBO.readonly(readonly);
            }

            if (disable !== undefined) {
                objFirstCBO.enable(disable);
                objLastCBO.enable(disable);
            }
        },
        //長出按鈕
        _btnOrder: function () {
            var that = this;
            //按鈕-左移
            template = kendo.template(that._templates.leftButton);
            that.leftButton = $(template(that.options));
            //按鈕-右移
            template = kendo.template(that._templates.rightButton);
            that.rightButton = $(template(that.options));
            //按鈕-全部左移
            template = kendo.template(that._templates.allleftButton);
            that.allleftButton = $(template(that.options));
            //按鈕-全部右移
            template = kendo.template(that._templates.allrightButton);
            that.allrightButton = $(template(that.options));
            //綁定按鈕-左移click事件
            that.leftButton.click(function (e) {
                that._leftClick("One");
            });
            //綁定按鈕-右移click事件
            that.rightButton.click(function (e) {
                that._rightClick("One");
            });
            //綁定按鈕-全部左移click事件
            that.allleftButton.click(function (e) {
                that._leftClick("All");
            });
            //綁定按鈕-全部右移click事件
            that.allrightButton.click(function (e) {
                that._rightClick("All");
            });
            //先找到table內的最後一個td在加上BTN
            that.element.find("div[id$='_First'] td:last").append("</br>");
            that.element.find("div[id$='_First'] td:last").append(that.leftButton);
            that.element.find("div[id$='_First'] td:last").append("</br>");
            that.element.find("div[id$='_First'] td:last").append(that.rightButton);
            that.element.find("div[id$='_First'] td:last").append("</br>");
            that.element.find("div[id$='_First'] td:last").append(that.allleftButton);
            that.element.find("div[id$='_First'] td:last").append("</br>");
            that.element.find("div[id$='_First'] td:last").append(that.allrightButton);
        },
        //按鈕左移事件
        _leftClick: function (clickState) {
            var that = this;
            if (clickState.toLowerCase() == "all") {
                that.element.find("div[id$='_Last']").find("option:enabled").each(function (i) {
                    if (that.options.transfer_mode.toString().toLowerCase() == "move") {
                        $(this).appendTo(that.element.find("div[id$='_First'] select"));
                    }
                    else if (that.options.transfer_mode.toString().toLowerCase() == "copy") {
                        $(this).clone(true).appendTo(that.element.find("div[id$='_First'] select"));
                    }
                })
            }
            else if (clickState.toLowerCase() == "one") {
                that.element.find("div[id$='_Last']").find("option:selected").each(function (i) {
                    if (that.options.transfer_mode.toString().toLowerCase() == "move") {
                        $(this).appendTo(that.element.find("div[id$='_First'] select"));
                    }
                    else if (that.options.transfer_mode.toString().toLowerCase() == "copy") {
                        $(this).clone(true).appendTo(that.element.find("div[id$='_First'] select"));
                    }
                })
            }
            if (this.options.is_escape_confirm) {
                this.options.is_change = true;
            }
        },
        //按鈕右移事件
        _rightClick: function (clickState) {
            var that = this;
            if (clickState.toLowerCase() == "all") {
                that.element.find("div[id$='_First']").find("option:enabled").each(function (i) {
                    if (that.options.transfer_mode.toString().toLowerCase() == "move") {
                        $(this).appendTo(that.element.find("div[id$='_Last'] select"));
                    }
                    else if (that.options.transfer_mode.toString().toLowerCase() == "copy") {
                        $(this).clone(true).appendTo(that.element.find("div[id$='_Last'] select"));
                    }

                })
            }
            else if (clickState.toLowerCase() == "one") {
                that.element.find("div[id$='_First']").find("option:selected").each(function (i) {
                    if (that.options.transfer_mode.toString().toLowerCase() == "move") {
                        $(this).appendTo(that.element.find("div[id$='_Last'] select"));
                    }
                    else if (that.options.transfer_mode.toString().toLowerCase() == "copy") {
                        $(this).clone(true).appendTo(that.element.find("div[id$='_Last'] select"));
                    }

                })
            }
            if (this.options.is_escape_confirm) {
                this.options.is_change = true;
            }
        },

        /**
         * @desc 取得DualListBox第一個ListBox所選取的值
         * @memberof BestDualListBox
         * @method FirstSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取DualListBox第一個ListBox所選取的值
         * @example
         * 取值:element.BestDualListBox().FirstSelectedValue();
         * 設值:element.BestDualListBox().FirstSelectedValue(setValue);
         */
        FirstSelectedValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.firstInterval.data("kendoBestListBox").SelectedValue();
            }
            //設值
            if (setValue != null) {
                return that.firstInterval.data("kendoBestListBox").SelectedValue(setValue);
            }
        },

        /**
         * @desc 取得DualListBox第一個ListBox所選取的文字
         * @memberof BestDualListBox
         * @method FirstSelectedText
         * @param {String} setText 設定文字(可不傳)
         * @return {String} 取DualListBox第一個ListBox所選取的文字
         * @example
         * 取值:element.BestDualListBox().FirstSelectedText();
         * 設值:element.BestDualListBox().FirstSelectedText(setText);
         */
        FirstSelectedText: function (setText) {
            var that = this;
            //取值
            if (setText == null) {
                return that.firstInterval.data("kendoBestListBox").SelectedText();
            }
            //設值
            if (setText != null) {
                return that.firstInterval.data("kendoBestListBox").SelectedText(setText);
            }
        },

        /**
         * @desc 取得DualListBox第二個ListBox所選取的值
         * @memberof BestDualListBox
         * @method LastSelectedValue
         * @param {String} setValue 設定值(可不傳)
         * @return {String} 取DualListBox第二個ListBox所選取的值
         * @example
         * 取值:element.BestDualListBox().LastSelectedValue();
         * 設值:element.BestDualListBox().LastSelectedValue(setValue);
         */
        LastSelectedValue: function (setValue) {
            var that = this;
            //取值
            if (setValue == null) {
                return that.lastInterval.data("kendoBestListBox").SelectedValue();
            }
            //設值
            if (setValue != null) {
                return that.lastInterval.data("kendoBestListBox").SelectedValue(setValue);
            }
        },

        /**
         * @desc 取得DualListBox第二個ListBox所選取的文字
         * @memberof BestDualListBox
         * @method LastSelectedText
         * @param {String} setText 設定文字(可不傳)
         * @return {String} 取DualListBox第二個ListBox所選取的文字
         * @example
         * 取值:element.BestDualListBox().LastSelectedText();
         * 設值:element.BestDualListBox().LastSelectedText(setText);
         */
        LastSelectedText: function (setText) {
            var that = this;
            //取值
            if (setText == null) {
                return that.lastInterval.data("kendoBestListBox").SelectedText();
            }
            //設值
            if (setText != null) {
                return that.lastInterval.data("kendoBestListBox").SelectedText(setText);
            }
        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestDualListBox
         * @method focus
         * @example
         * 聚焦: element.BestDualListBox().focus();
         */
        focus: function () {

            var that = this
            that.firstInterval.data("kendoBestListBox").focus();

        },

        //快速查詢按鈕TAEMPLATES
        _templates: {
            spanFirst: "<div id='BestDualListBoxidname' style='float:left; width:25%'/>'",
            spanLast: "<div id='BestDualListBoxidname' style='float:left; width:75%'/>'",
            leftButton: "<input type='button' id='Bleft' value='←' style='width:20px'/>",
            rightButton: "<input type='button' id='Bright' value='→' style='width:20px'/>",
            allleftButton: "<input type='button' id='AllBleft' value='<<' style='width:20px'/>",
            allrightButton: "<input type='button' id='AllBright' value='>>' style='width:20px'/>"
        }
    })
    kendo.ui.plugin(GSSDualListBox);

})(jQuery);