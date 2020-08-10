/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />

//功能: 底層共用的設定檔
//描述: 底層共用的設定檔
//歷程: 1. 2014/04/22   1.00   Ben_Tsai   Create

//頁面層級物件, 目前總共有5個
var PageLevelObject = {
    Template: [],
    Top: {
        URI: [],
        Height: [],
        Collapsible: [],
        Resizable: [],
        DisplayMode: [],
        PageRW: []
    },
    Left: {
        URI: [],
        Width: [],
        Collapsible: [],
        Resizable: [],
        DisplayMode: [],
        PageRW: []
    },
    Center: {
        URI: [],
        Height: [],
        Collapsible: [],
        Resizable: [],
        DisplayMode: [],
        PageRW: []
    },
    Right: {
        URI: [],
        Width: [],
        Collapsible: [],
        Resizable: [],
        DisplayMode: [],
        PageRW: []
    },
    Bottom: {
        URI: [],
        Height: [],
        Collapsible: [],
        Resizable: [],
        DisplayMode: [],
        PageRW: []
    },
    SetOptions: function (source, target) {
        /// <summary>
        /// 設定物件資料
        /// </summary>
        /// <param name="source">需要被設定的物件</param>
        /// <param name="target">設定物件的資料來源</param>

        for (var key in source) {
            source[key][BaseObject.NowLevel] = target[key];
        }

    }
};

//最底層共用物件
var BaseObject = {

    PageNM: "PageLevel",
    NowLevel: 0,
    PreLevel: 0,
    ServiceUrl: "http://localhost/FBU_WebService",
    LocalLang: "",
    WindowHeight: $(window).height() - 3,
    WindowWidth: $(window).width(),
    OpenWindowID: "PopWindow",
    OpenWindowCount: 0,
    Token: "",
    UserName: "",
    PageError: {
        Mode: "Login",   // 共有三種模式 Login:回到LoginPage頁面(預設)  Close:關閉視窗 Customer:連結至CustomerPage
        LoginPage: "http://localhost/FBU_RuleEngine/index.aspx",
        CustomerPage: ""
    },
    ErrorDialogIndex: 0,
    FuncMenu: {
        DataSource: null,   //FuncMenu的DataSource物件
        SelectedItem: ""  //目前FuncMenu點選的物件ID
    }
};

//Message物件
var MessageObject = {
    SaveSuccess: "儲存成功",
    SaveFail: "儲存失敗",
    AtLeastOne: "至少輸入一個條件",
    AjaxError: "Ajax存取失敗",
    TokenError: "使用非合法驗證碼",
    UpdateSuccess: "更新成功",
    UpdateFail: "更新失敗",
    DeleteSuccess: "刪除成功",
    DeleteFail: "刪除失敗",
    InsertSuccess: "新增成功",
    InsertFail: "新增失敗",
    NoData: "查無資料",
    LeavePage: "資料己異動，是否確定離開本頁?",
    ConfirmDelete: "是否確認刪除？",
    DataEmpty: "請勿空白"
};

//Grid Button Style物件
var GridButtonObject = {
    detail: "<i class='fa fa-file-o fa-lg color04'></i>",//檢視、明細
    modify: "<i class='fa fa-edit fa-lg color04' ></i>",//修改
    remove: "<i class='fa fa-remove fa-lg color08'></i>",//刪除
    check: "<i class='fa fa-check fa-lg color04'></i>",//選取
    search: "<i class='fa fa-search fa-lg color04'></i>",//查詢
    image: "<i class='fa fa-camera fa-lg color04'></i>",//影像
    tabulation: "<i class='fa fa-print fa-lg color04'></i>",//製表
    reversal: "<i class='fa fa-check-square-o fa-lg color04'></i>",//沖正、延長期限
    webpage: "<i class='fa fa-link fa-lg color04'></i>",//網頁
    imported: "<i class='fa-sign-in'></i>",//匯入
    create: "<i class='fa-plus-square'></i>",//新增
    del: "<i class='fa-minus-square'></i>"//刪除
};

//Error Dialog Observable 給MVVM使用
var ErrorDialogObservableObject = function () {

    //訊息視窗名稱
    var ErrorDialogName = "ErrorMessageDialog";

    //錯誤訊息視窗列
    var ErrorDialogList = [];

    //MVVM訊息範本
    var TemplateObservable = {

        idName: "",

        errorMessageList: [],

        addItem: function (id, message) {
            this.errorMessageList.push({
                message: message,
                id: id
            });
        },

        deleteItem: function (id) {

            var result = -1;

            $.each(this.errorMessageList, function (index, item) {

                if (id == item.id) {

                    result = index;
                    return false;

                }

            });

            if (result != -1) {
                this.errorMessageList.splice(result, 1);
            }

            //判斷最後所有訊息都被清空時, 關閉錯誤訊息視窗
            if (this.errorMessageList.length == 0) {
                this.closeDialog();
            }

        },

        empty: function () {
            this.errorMessageList.length = 0;
        },

        closeDialog: function () {
            //關閉畫面上的錯誤訊息視窗
            $("#" + this.idName).parent().remove();
        },

        messageItemClick: function (e) {

            var that = $(e.target)
                , allTdObject = that.parent().parent().find("td")
                , currentIndex = allTdObject.index(that);

            if (this.errorMessageList.length != 0) {

                //TODO: 是否需要focus到沒有填寫的控制項, 目前只會focus到群組的第一個控制項

                //依據不同的data-role產生不同的控制項
                var targetObj = SelectControlObject.SelectControl($("#" + BaseObject.PageNM + BaseObject.NowLevel)
                                                                        .find("#" + this.errorMessageList[currentIndex].id));

                if (typeof targetObj.focus !== "undefined") {

                    //點擊訊息, 自動focus到控制項上
                    targetObj.focus();

                }

            }

        }

    };

    //取得目前訊息視窗的div物件
    var GetNowDivObject = function () {
        return $("#" + ErrorDialogName + BaseObject.ErrorDialogIndex);
    };

    //取得目前訊息視窗
    var GetNowErrorDialog = function () {
        return ErrorDialogList[BaseObject.ErrorDialogIndex];
    };

    //產生新的訊息視窗
    var CreateErrorDialog = function () {

        var newErrorDialog = $.extend(true, {}, TemplateObservable);

        newErrorDialog.idName = ErrorDialogName + BaseObject.ErrorDialogIndex;
        ErrorDialogList.push(kendo.observable(newErrorDialog));

    };

    //刪除目前訊息視窗
    var DeleteErrorDialog = function () {

        ErrorDialogList[BaseObject.ErrorDialogIndex].closeDialog();
        ErrorDialogList.splice(BaseObject.ErrorDialogIndex, 1);
        BaseObject.ErrorDialogIndex -= 1;

    };

    //清除所有訊息視窗
    var EmptyErrorDialog = function () {

        for (var i = 0; i < ErrorDialogList.length; i++) {
            ErrorDialogList[i].closeDialog();
        }

        ErrorDialogList.length = 0;
        BaseObject.ErrorDialogIndex = 0;
    };

    return {
        ErrorDialogName: ErrorDialogName,
        ErrorDialogList: ErrorDialogList,
        GetNowDivObject: GetNowDivObject,
        GetNowErrorDialog: GetNowErrorDialog,
        CreateErrorDialog: CreateErrorDialog,
        DeleteErrorDialog: DeleteErrorDialog,
        EmptyErrorDialog: EmptyErrorDialog
    }

}();