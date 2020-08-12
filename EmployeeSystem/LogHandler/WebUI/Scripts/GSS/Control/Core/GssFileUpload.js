/// <reference path="../jQuery/jquery-1.9.1.js" />
/// <reference path="../KendoUI/kendo.web.min.js" />

/**
 * @classdesc 繼承kendo.upload <a href="http://docs.telerik.com/kendo-ui/api/web/upload" target="_blank"> Reference </a>
 * @class BestFileUpload
 */

(function () {
    var kendo = window.kendo,
         ui = kendo.ui,
         widget = ui.Widget,
         upload = ui.Upload;

    var GSSFileUpload = upload.extend({
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);
            //將該input的type設為file
            $(element).prop("type", "file");

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            upload.fn.init.call(that, element, options);

            //處理readonly
            ProcReadonly(that);

            //處理required
            ProcRequired(that);
        },
        options: {
            /**
             * @property {string} name 物件名稱
             * @default BestFileUpload
             * @MemberOf BestFileUpload
             */
            name: "BestFileUpload",
            /**
             * @property {boolean} valid_extension 可上傳的副檔名
             * @default ""
             * @MemberOf BestFileUpload
             */
            valid_extension: ControlDefaultsObject.FileUpload.valid_extension || "",
            /**
             * @property {boolean} maximum_upload_limit 最大上傳容量(kb)
             * @default ""
             * @MemberOf BestFileUpload
             */
            maximum_upload_limit: ControlDefaultsObject.FileUpload.maximum_upload_limit || "",
            errFile: new Array,
            select: function (e) {
                var that = this,
                    totalSize = 0,
                    strErrMsg = '';

                //加總總檔案大小
                that.wrapper.find(".k-file").each(function () {
                    totalSize += $(this).data("fileNames")[0].size;
                });

                $.each(e.files, function (count, file) {
                    //檢核是否符合設定的副檔名
                    if (that.options.valid_extension !== "") {
                        var extensionFlag = false;
                        $.each(that.options.valid_extension.toLowerCase().split(","), function () {
                            if (file.extension.substring(1).toLowerCase().indexOf(this.toString()) >= 0) {
                                extensionFlag = true;
                            }
                        })
                        if (!extensionFlag) {
                            alert('不支援該檔案格式！');
                            e.preventDefault();
                            return;
                        }
                    }

                    //檢核檔案大小
                    if (that.options.maximum_upload_limit !== "") {
                        //檢核單一檔案是否超過限制
                        if (file.size > parseInt(that.options.maximum_upload_limit)) {
                            that.options.errFile.push(file.name);
                            e.preventDefault();
                            return;
                        }
                    }

                    if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                        ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(that.element.attr("id"));
                    }
                });

                //顯示訊息
                $.each(that.options.errFile, function () {
                    strErrMsg += '檔案' + this.toString() + '容量過大！\n';
                })

                if (strErrMsg !== '') {
                    alert(strErrMsg);
                }
                that.options.errFile = new Array;
            },
            success: function (e) {
                //若因為檔案過大沒有上傳則回復至上傳前狀態
                if (e.response.sizeFlag === "true") {
                    var that = this;
                    objFilwWrap = that.wrapper.find("span:contains('" + e.files[0].name + "')").parent();

                    //移除上傳成功綠色字條
                    objFilwWrap.removeClass("k-file-success")
                    //加上上傳錯誤Class
                    objFilwWrap.addClass("k-file-error")
                    //移除100%字樣
                    objFilwWrap.find('.k-upload-pct').remove();
                    //移除 Done字樣
                    that.wrapper.find(".k-upload-status-total").remove();
                    //紀錄錯誤檔名
                    that.options.errFile.push(e.files[0].name);
                };
            },
            upload: function (e) {
                e.data = { maximum_upload_limit: this.options.maximum_upload_limit, upload: true }
            },
            remove: function (e) {
                e.data = { remove: true }
            },
            complete: function (e) {
                var that = this,
                    strErrMsg = '';
                $.each(that.options.errFile, function () {
                    strErrMsg += '檔案' + this.toString() + '容量過大！\n';
                })

                if (strErrMsg !== '') {
                    alert(strErrMsg);
                }
                that.options.errFile = new Array;
            },
            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestFileUpload
             */
            is_escape_confirm: ControlDefaultsObject.FileUpload.is_escapte_confirm || false,
            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestFileUpload
             */
            is_change: ControlDefaultsObject.FileUpload.is_change || false,
            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestFileUpload
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestFileUpload
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} readonly_mode 唯讀模式設定
             * @default N
             * @MemberOf BestFileUpload
             * @desc Y:唯讀<br/>
                     N:非唯讀
             */
            readonly_mode: "N",

            /**
             * @property {string} error_message 錯誤訊息
             * @default ""
             * @MemberOf BestFileUpload
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default ""
             * @MemberOf BestFileUpload
             */
            validation_group: "",

            /**
             * @property {string} required_mode 控制項必填的模式
             * @default N
             * @MemberOf BestFileUpload
             * @desc Y：必填 <br>
                     N：非必填
             */
            required_mode: "N",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestFileUpload
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false
        },
        /**
        * @desc 唯讀處理
        * @MemberOf BestFileUpload
        * @method Breadonly
        * @param {boolean} readonly 設定值(可不傳)
        * @example
        * 唯讀:element.BestFileUpload().Breadonly();
        * 取消唯讀:element.BestFileUpload().Breadonly(false);
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
            if (isReadonly) {
                that.disable()
                that.wrapper.find(".k-upload-selected").prop('disabled', true);
            } else {
                that.enable()
                that.wrapper.find(".k-upload-selected").prop('disabled', false);
            }

            //Reset控制項唯讀狀態
            that.options.readonly_status = isReadonly;
        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestFileUpload
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 必填: element.BestFileUpload().Brequired();
         * 不必填: element.BestFileUpload().Brequired(false);
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
         * @memberof BestFileUpload
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

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this
            if (that.wrapper.find(".k-file").length > 0) {
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
        focus: function () {
            var that = this;
            this.element.focus();
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
    });

    ui.plugin(GSSFileUpload);

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