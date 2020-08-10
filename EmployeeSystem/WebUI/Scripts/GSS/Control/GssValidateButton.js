/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="BaseCommonObject.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />
/// <reference path="../Common/StringFormatObject.js" />

//功能: 擴充KendoButton功能 - 驗證功能按鈕
//描述: 驗證畫面上的控制項
//歷程: 1. 2014/07/07   1.00   Ben_Tsai   Create

/**
 * @class BestValidateButton
 */

// wrap the widget in a closure. Not necessary in doc ready, but a good practice
(function ($) {

    // shorten references to variables. this is better for uglification 
    var kendo = window.kendo
        , ui = kendo.ui
        , BestButton = ui.BestButton
        , ns = "BestValidateButton"
        , divTemplateId = "errorMessageDivTemplate"
        , trTemplateId = "errorMessageTrTemplate"
        , autoMinimizeMessageDialogTimer = null;    //訊息視窗自動縮小的計時器


    // declare the custom input widget by extenting the very base kendo widget
    var GssValidateButton = BestButton.extend({

        // define the init function which is called by the base widget
        init: function (element, options) {

            // cache a reference to this
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);

            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            //處理disabled/readonly
            var objelement = $(element)
                , readonly = objelement.attr("readonly");

            if (readonly) {
                objelement.attr("disabled", "disabled");
            }

            // make the base call to initialize this widget
            BestButton.fn.init.call(this, element, options);

            // actually create the UI elements. this is a private method
            // that is below
            that._create();

        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {

            /**
             * @property {string} name 物件名稱
             * @default BestValidateButton
             * @MemberOf BestValidateButton
             */
            name: "BestValidateButton",

            /**
             * @property {string} tamplateName 訊息視窗物件名稱
             * @default BestWindow
             * @MemberOf BestValidateButton
             */
            tamplateName: "Window",

            /**
             * @property {object} top_div_obj 驗證區域最上層div物件
             * @default null
             * @MemberOf BestValidateButton
             */
            top_div_obj: null,

            /**
             * @property {bool} auto_flag 是否允許自動縮小
             * @default true
             * @MemberOf BestValidateButton
             */
            auto_flag: ControlDefaultsObject.ValidateButton.auto_flag || true,

            /**
             * @property {int} auto_minimize_time 自動縮小的時間(1000ms = 1s, 預設20s縮小)
             * @default 20000
             * @MemberOf BestValidateButton
             */
            auto_minimize_time: ControlDefaultsObject.ValidateButton.auto_minimize_time || 20000,

            /**
             * @property {int} dialog_width 訊息視窗的width
             * @default 300
             * @MemberOf BestValidateButton
             */
            dialog_width: ControlDefaultsObject.ValidateButton.dialog_width || 300,

            /**
             * @property {int} dialog_height 訊息視窗的height
             * @default 150
             * @MemberOf BestValidateButton
             */
            dialog_height: ControlDefaultsObject.ValidateButton.dialog_height || 150,

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestValidateButton
             */
            validation_group: ControlDefaultsObject.ValidateButton.validation_group || "",

            /**
             * @property {bool} at_least_one 驗證時是否要判斷"是否至少輸入一個條件"
             * @default false
             * @MemberOf BestValidateButton
             */
            at_least_one: ControlDefaultsObject.ValidateButton.at_least_one || false,

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default false
             * @MemberOf BestValidateButton
             */
            is_target: false

        },

        _create: function () {

            var that = this;

            //註冊事件
            that.element.on("click." + ns, $.proxy(that._validateClick, that));

            //產生驗證所需的MVVM Source
            if (ErrorDialogObservableObject.GetNowErrorDialog() === undefined) {
                ErrorDialogObservableObject.CreateErrorDialog();
            }

        },

        _validateClick: function (e) {

            var that = this
                , appendObj = that.options.top_div_obj
                , topDivHeight = $("div[id*='Vertical']").find("div[id*='Top']").height()
                , dialogObj = ErrorDialogObservableObject.GetNowDivObject();

            //Step1: 檢測畫面上所有控制項, 並且將錯誤訊息新增至 共用的ErrorDialogObservable
            ValidateRequiredControl(that.options.top_div_obj, that.options.validation_group);

            //若沒有任何驗證錯誤訊息則不顯示錯誤訊息視窗
            if (ErrorDialogObservableObject.GetNowErrorDialog().errorMessageList.length == 0) {

                //若錯誤訊息視窗已開啟的話,則需自動關閉
                if (dialogObj.length > 0) {
                    dialogObj.data("kendo" + that.options.tamplateName).close();
                }

                //根據options.at_least_one來判斷是否要處理"至少輸入一個條件"
                if (that.options.at_least_one) {
                    if (!ProcAtLeastOne(that.options.top_div_obj)) {
                        alert(MessageObject.AtLeastOne);
                        //不再繼續往下執行
                        e.stopImmediatePropagation();
                    }
                }

                //變更control上的is_change為false
                ProcIsChange(that.options.top_div_obj);

                return false;
            }

            //Step2: 判斷是否已存在訊息視窗
            if (dialogObj.length > 0) {

                //訊息視窗動態產生錯誤訊息
                kendo.bind(dialogObj, ErrorDialogObservableObject.GetNowErrorDialog());
                dialogObj.data("kendo" + that.options.tamplateName).open();
                dialogObj.parent().find(".k-window-titlebar").find(".k-i-restore").trigger("click.ErrorMessage");

            }
            else {
                //動態產生錯誤訊息視窗
                that.errorDialog = $(that._templates.div.replace(divTemplateId, ErrorDialogObservableObject.ErrorDialogName + BaseObject.ErrorDialogIndex));
                appendObj.append(that.errorDialog);
                appendObj.append(that._templates.trTemplate);
                //訊息視窗動態產生錯誤訊息
                kendo.bind(that.errorDialog, ErrorDialogObservableObject.GetNowErrorDialog());

                //長成kendo原生地Window控制項
                that.errorDialog.kendoWindow({
                    title: "錯誤訊息",
                    actions: ['Minimize', 'Close'],
                    draggable: false,   //不可任意移動視窗
                    modal: false,       //不鎖定(反黑)背景畫面
                    resizable: false,   //不允許調整size
                    width: that.options.dialog_width,
                    height: that.options.dialog_height,
                    //需扣掉自行定義的width及height
                    position: {
                        top: $(window).height() - topDivHeight - that.options.dialog_height,
                        left: $(window).width() - 5 - that.options.dialog_width
                    }
                });

                //註冊Minimize, Restore位移動作
                var dialogTitlebar = that.errorDialog.parent().find(".k-window-titlebar")
                    , errorDialogObj = that.errorDialog.data("kendo" + that.options.tamplateName)
                    //暫存原本的position
                    , oriPosition = errorDialogObj.options.position;

                //註冊Minimize位移動作, 利用proxy方式是避免影響原先的kendo的click事件
                dialogTitlebar.find(".k-i-minimize").on("click.ErrorMessage", $.proxy(that._dialogMinimizeAction, that, dialogTitlebar, oriPosition, topDivHeight));

                //註冊自動縮小事件
                if (that.options.auto_flag) {

                    errorDialogObj.bind("open", that._autoMinimizeMessageDialog(dialogTitlebar, oriPosition, topDivHeight));

                    that.errorDialog.mouseover(function () {
                        clearTimeout(autoMinimizeMessageDialogTimer);
                    });

                    that.errorDialog.mouseleave(function () {
                        that._autoMinimizeMessageDialog(dialogTitlebar, oriPosition, topDivHeight);
                    });

                }

            }

            //若有錯誤訊息,則不再繼續往下執行
            if (ErrorDialogObservableObject.GetNowErrorDialog().errorMessageList.length > 0) {

                //請謹慎使用, 在此使用是停止click事件, 意指不再執行其他附加在此object click event上的功能
                //http://blog.johnsonlu.org/jquerypreventdefault-stoppropagation-stopimmediatepropagation-%E8%88%87-return-false/
                e.stopImmediatePropagation();
            }
        },

        //Minimize, Restore位移動作
        _dialogMinimizeAction: function (dialogTitlebar, oriPosition, topDivHeight) {

            var that = this
                , errorDialogObj = that.errorDialog.data("kendo" + that.options.tamplateName);

            //將Title位置移動到最右下角
            errorDialogObj.setOptions({
                position: {
                    top: $(window).height() - topDivHeight,
                    left: $(window).width() - 5 - that.options.dialog_width
                }
            });

            //先執行kendo window底層的minimize事件, 因為這樣才能在畫面上select到restore圖示註冊事件
            errorDialogObj.minimize();

            //註冊Restore位移動作, 利用proxy方式是避免影響原先的kendo的click事件
            dialogTitlebar.find(".k-i-restore").on("click.ErrorMessage", $.proxy(function () {

                errorDialogObj.restore();

                //將視窗還原初始的位置
                errorDialogObj.setOptions({
                    position: oriPosition
                });

                if (that.options.auto_flag) {

                    //註冊自動縮小事件
                    that._autoMinimizeMessageDialog(dialogTitlebar, oriPosition, topDivHeight);

                }

            }, this));

        },

        //自動縮小訊息視窗
        _autoMinimizeMessageDialog: function (dialogTitlebar, oriPosition, topDivHeight) {

            var that = this;

            clearTimeout(autoMinimizeMessageDialogTimer);

            autoMinimizeMessageDialogTimer = setTimeout(function () {
                that._dialogMinimizeAction(dialogTitlebar, oriPosition, topDivHeight);
            }, that.options.auto_minimize_time);

        },

        // the templates for each of the UI elements that comprise the widget
        _templates: {
            div: "<div id='" + divTemplateId + "'>"
                    + "<table><tbody data-bind='source: errorMessageList' data-template='" + trTemplateId + "'></tbody></table>"
                    + "</div>",
            trTemplate: "<script id='" + trTemplateId + "' type='text/x-kendo-template'>"
                            + "<tr>"
                            + "<td class='text-error errorMessageStyle' data-bind='text: message, click: messageItemClick'></td>"
                            + "</tr>"
                            + "</script>"
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GssValidateButton);

    //===================================== Private Method ==================================================    

    //驗證畫面上, 所有具有必填屬性的控制項
    function ValidateRequiredControl(divObject, validationGroupName) {
        /// <summary>
        /// 驗證畫面上, 所有具有必填屬性的控制項
        /// </summary>
        /// <param name="divObject">div object</param>

        var requiredMsg = "必填";

        //Step1: 先清空訊息視窗的錯誤訊息清單
        ErrorDialogObservableObject.GetNowErrorDialog().empty();

        //Step2: 驗證每個必填控制項
        divObject.find("[data-role*=best]:not([data-role=bestvalidatebutton],[data-role=bestbutton])").each(function () {

            var that = $(this);

            //依據不同的data-role產生不同的控制項
            var objControl = SelectControlObject.SelectControl(that);

            if (objControl == null) return;    //控制項不存在, 換下一個

            //依據每個控制項判斷是否為驗證的目標物
            if (!objControl.options.is_target) return;    //非驗證目標物, 換下一個

            //依據每個控制項判斷是否驗證群組
            //1. 此驗證按鈕沒有設定群組(不分群組, 需要驗證的控制項都驗證)
            //2. 控制項群組符合此驗證按鈕設定的群組
            if (validationGroupName.length == 0 || objControl.options.validation_group == validationGroupName) {

                //Step1: 判斷唯讀狀態
                if (objControl._chkReadOnlyStatus()) return;    //控制項為唯讀狀態, 換下一個

                //Step2: 判斷必填狀態
                if (!objControl._chkRequiredStatus()) return;    //控制項為非必填狀態, 換下一個

                //Step3: 判斷必填結果
                if (!objControl._chkRequired()) {

                    //控制項必填卻未填, 將錯誤訊息新增至共用的訊息控制物件
                    ErrorDialogObservableObject.GetNowErrorDialog().addItem(that.attr("id"), objControl.options.error_message + requiredMsg);

                }

            }

        });

    };

    //處理"至少輸入一個條件"
    function ProcAtLeastOne(obj) {
        var isLegal = false;

        //取得data-role含有best,且非具有required,但非含有readonly,disabled的control        
        $.each(obj.find("[data-role*=best]:not([readonly=true],[readonly=readonly],[disabled])"), function () {

            var that = $(this),
                control = SelectControlObject.SelectControl(that);

            if (control != null) {
                if (control._chkAtLeastOne()) {
                    isLegal = true;
                }
            }

        });

        return isLegal;
    }

    //將Control的options.is_change改成false
    function ProcIsChange(obj) {

        $.each(obj.find("[data-role*=best]:not([readonly=true],[readonly=readonly],[disabled])"), function () {

            var that = $(this),
                control = SelectControlObject.SelectControl(that);

            if (control != null) {
                control.BsetOptions({ is_change: false });
            }
        });
    }

    //===================================== Private Method ==================================================

})(jQuery);