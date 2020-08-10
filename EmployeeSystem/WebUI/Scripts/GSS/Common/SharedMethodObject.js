/// <reference path="../../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="../Data/BaseCommonObject.js" />

//功能: Common的Object
//描述: 專案製作時,共用method存放區
//歷程: 1. 2014/09/10   Steven_Chen   Create

var SharedMethodObject = function () {

    //Ajax
    var AjaxObject = function () {

        function SetParameter(obj, strCurrentPath) {
            /// <summary>
            /// 設定AJAX查詢條件
            /// </summary>
            /// <param name="obj">Select Parameter Object</param>
            /// <param name="strCurrentPath">目前功能軌跡</param>
            /// <returns type=""></returns>
            /// <history>
            /// 2014/09/16  Steven_Chen Create
            /// </history>
            var objParameter = {};

            //若obj無傳入資料,則預設一個空物件
            if (obj == null) {
                obj = {};
            }

            objParameter.Token = BaseObject.Token;
            objParameter.CurrentPath = strCurrentPath;
            objParameter.Parameters = obj;

            return JSON.stringify({ obj: objParameter });
        }

        function SetGridParameter(objOptions, objGridParameters) {
            /// <summary>
            /// 設定GridView的AJAX查詢條件
            /// </summary>
            /// <param name="objParameters">Select Parameter Object</param>
            /// <param name="objGridParameters">Grid Parameter Object</param>
            /// <returns type=""></returns>
            /// <history>
            /// 2014/09/23  Steven_Chen Create
            /// </history>

            var obj = {};
            obj.Token = BaseObject.Token;
            obj.CurrentPath = objOptions.currentPath;
            obj.inital = objOptions.inital;
            obj.Parameters = objOptions.queryParameters;

            if (objGridParameters.GetAllData == null) {
                objGridParameters.GetAllData = false;
            }

            obj.GridParameters = objGridParameters;

            return JSON.stringify({ obj: obj });
        }

        function ProcessAjaxSuccess(objData) {
            /// <summary>
            /// 處理AJAX成功後的事件
            /// </summary>
            /// <param name="obj">成功後所得的資料物件</param>
            var isLegal = true;
            //若AuthenticationStatus為200,則Token驗證失敗
            if (objData.d.AuthenticationStatus == '200') {
                alert(MessageObject.TokenError);

                ProcessAjaxPageErrorAction();

                isLegal = false;
            }
            return isLegal;
        }

        function ProcessAjaxError(obj) {
            /// <summary>
            /// 處理AJAX失敗後的事件
            /// </summary>
            /// <param name="obj">失敗所得的資料物件</param>

            alert(MessageObject.AjaxError);

            ProcessAjaxPageErrorAction();

        }

        function ProcessAjaxPageErrorAction(strMode) {
            strMode = strMode || BaseObject.PageError.Mode || "Login";

            //當Mode設定為Login時,則連至BaseObject.PageError.LoginPage
            if (strMode.toLocaleLowerCase() == "login") {
                window.location.href = BaseObject.PageError.LoginPage;
            }

            //當Mode設定為Close時,則關閉視窗(firefox不支援此語法,改進方式需將dom.allow_scripts_to_close_windows 改成true)
            if (strMode.toLocaleLowerCase() == "close") {
                window.close();
            }

            //當Mode設定為Login時,則連至BaseObject.PageError.CustomerPage
            if (strMode.toLocaleLowerCase() == "customer") {
                window.location.href = BaseObject.PageError.CustomerPage;
            }
        }

        return {
            SetData: SetParameter,
            ProcessAjxaxSuccess: ProcessAjaxSuccess,
            ProcessAjaxError: ProcessAjaxError,
            SetGridParameter: SetGridParameter
        }
    }();

    //Page
    var Page = function () {

        function ChkIsEscapteConfirm() {
            /// <summary>
            /// 檢核是否有未存檔,便離開頁面的動作
            /// </summary>
            /// <returns type=""></returns>
            /// <history>
            /// 2014/11/06  Steven_Chen Create
            /// </history>

            var isLegal = true, isLeave = true;

            $.each($(document).find("[data-role*=best]:not([readonly=true],[readonly=readonly],[disabled])"), function () {

                var that = $(this),
                    control = SelectControlObject.SelectControl(that);

                if (control != null) {
                    if (control.options.is_change) {
                        isLegal = false;;
                    }
                }
            });

            if (!isLegal) {
                isLeave = confirm(MessageObject.LeavePage);
            }

            return isLeave;
        }

        function InitPage() {
            /// <summary>
            /// 初始頁面
            /// </summary>
            /// <returns type=""></returns>
            /// <history>
            /// 2014/12/24  Steven_Chen Create
            /// </history>

            var objData = {}, objPage = $("#Template_Vertical");

            objData = GetFuncInfo("Init");

            $("#Template_Top").load(objData.top.URI);

            //分割上下區塊
            objPage.kendoSplitter({
                orientation: "vertical",
                panes: [
                //Top
                    {
                        collapsible: objData.top.Collapsible,
                        resizable: objData.top.Resizable,
                        size: objData.top.Height
                    },
                //Center
                    {
                        collapsible: objData.center.Collapsible
                    }
                ],
                resize: function (e) {

                    var objTop = objPage.find("#Template_Top");

                    if (objTop.css("overflow") === "auto") {
                        objTop.css("overflow", "visible");
                    }

                }
            });

            //for FF使用
            if (!!window.sidebar) {
                var height = objPage.height();
                objPage.height(height * 0.98);
            }

            LoadContent(objData);

        };

        function LoadPage(funcID) {
            /// <summary>
            /// 根據funcID讀取頁面
            /// </summary>
            /// <param name="funcID">功能ID</param>
            /// <history>
            /// 2014/12/24 Steven_Chen Create 
            /// </history>
            var objData = {};

            objData = GetFuncInfo(funcID);

            LoadContent(objData);
        };

        function GetFuncInfo(funcID) {
            /// <summary>
            /// 取得頁面資料
            /// </summary>
            /// <param name="funcID">功能ID</param>
            /// <returns type="obj">資料物件</returns>
            /// <history>
            /// 2014/12/24  Steven_Chen Create
            /// </history>

            //TODO: ajax 回DB問目前功能的範本資訊及相關位置的頁面名稱, 參數為funcID, 依據Level將資料寫入對應的Object

            var objData = {}
                , left = {}
                , center = {}
                , top = {};

            if (funcID == "Init") {
                objData.template = "A";
                objData.level = 1;

                top = {
                    URI: "Pub/Top.aspx",
                    Height: "105px",
                    Collapsible: false,
                    Resizable: false,
                    //DisplayMode
                    //H：Hide隱藏
                    //D：Docking鎖定
                    //A：AutoHide自動隱藏
                    DisplayMode: "D"
                };

                center = {
                    URI: "System/HomeWork.aspx",
                    pageRW: "R",
                    Height: "",
                    Collapsible: false,
                    Resizable: false,
                    DisplayMode: "D"
                };

                objData.top = top;
                objData.center = center;
            }

            if (funcID == "B001") {

                objData.template = "B";
                objData.level = 2;

                center = {
                    URI: "System/B001.aspx",
                    pageRW: "R",
                    Height: "",
                    Collapsible: false,
                    Resizable: false,
                    DisplayMode: "D"
                };

                left = {
                    URI: "Pub/CaseMenu.aspx",
                    pageRW: "R",
                    Width: "16%",
                    Collapsible: true,
                    Resizable: true,
                    DisplayMode: "D"
                };

                objData.center = center;
                objData.left = left;
            }

            return objData;
        };

        function LoadContent(objData) {
            /// <summary>
            ///  依據頁面資料, 讀取資料
            /// </summary>
            /// <param name="objData">頁面資料</param>
            /// <history>
            /// 2014/12/24  Steven_Chen Create
            /// </history>

            //檢核是否有變更資料,沒有存檔
            if (SharedMethodObject.Page.ChkIsEscapteConfirm()) {

                var template = objData.template;

                BaseObject.PreLevel = BaseObject.NowLevel;
                BaseObject.NowLevel = objData.level;
                PageLevelObject.Template[BaseObject.NowLevel] = template;

                //處理頁面DIV
                ProcPageLevel();

                switch (template) {

                    case "A":
                        PageLevelObject.SetOptions(PageLevelObject.Center, objData.center);
                        LoadSubPage($("#" + BaseObject.PageNM + BaseObject.NowLevel), "Center");
                        break;
                    case "B":
                        var objPage = $("#" + BaseObject.PageNM + BaseObject.NowLevel),
                            tmpLeftDiv = "<div id='Template_Left'></div>",
                            tmpCenterDiv = "<div id='Template_Center'></div>";

                        PageLevelObject.SetOptions(PageLevelObject.Left, objData.left);
                        PageLevelObject.SetOptions(PageLevelObject.Center, objData.center);

                        //動態Create Div
                        objPage.css("height", "100%").css("width", "100%");
                        objPage.append(tmpLeftDiv);
                        objPage.append(tmpCenterDiv);

                        //分割頁面區塊
                        objPage.kendoSplitter({
                            panes: [
                            //Left
                                {
                                    collapsible: PageLevelObject.Left.Collapsible[BaseObject.NowLevel],
                                    resizable: PageLevelObject.Left.Resizable[BaseObject.NowLevel],
                                    size: PageLevelObject.Left.Width[BaseObject.NowLevel]
                                },
                            //Center
                                {
                                    collapsible: PageLevelObject.Center.Collapsible[BaseObject.NowLevel]
                                }
                            ],
                            resize: function (e) {
                                //若Left的呈現是使用GSSMenu的話,以下Code需打開

                                //var objLeft = objPage.find("#Template_Left");

                                //if (objLeft.css("overflow") === "auto") {
                                //    objLeft.css("overflow", "visible");
                                //}

                                //若頁面部分存在DivFixedTop的Class, 則需要手動調整其寬度
                                var objFixedTop = objPage.find(".DivFixedTop");
                                objFixedTop.outerWidth(objFixedTop.parent().width());

                            }
                        });

                        //讀取頁面內容
                        LoadSubPage(objPage.find("#Template_Left"), "Left");
                        LoadSubPage(objPage.find("#Template_Center"), "Center");

                        break;

                }

            }
        };

        function LoadSubPage(destinationObject, location) {
            /// <summary>
            /// 將頁面連結至目的DIV
            /// </summary>
            /// <param name="destinationObject">目的div控制項</param>
            /// <param name="location">範本內的位置</param>
            /// <history>
            /// 2014/12/24  Steven_Chen Create
            /// </history>

            //檢核是否有變更資料,沒有存檔
            if (SharedMethodObject.Page.ChkIsEscapteConfirm()) {
                switch (location) {

                    case "Top":
                        destinationObject.load(PageLevelObject.Top.URI[BaseObject.NowLevel]);
                        break;
                    case "Left":
                        destinationObject.load(PageLevelObject.Left.URI[BaseObject.NowLevel]);
                        break;
                    case "Center":
                        destinationObject.load(PageLevelObject.Center.URI[BaseObject.NowLevel]);
                        break;
                    case "Right":
                        destinationObject.load(PageLevelObject.Right.URI[BaseObject.NowLevel]);
                        break;
                    case "Bottom":
                        destinationObject.load(PageLevelObject.Bottom.URI[BaseObject.NowLevel]);
                        break;

                }
            }
        };

        function ProcPageLevel() {
            /// <summary>
            /// 處理頁面
            /// </summary>
            var objPage = $("#" + BaseObject.PageNM + BaseObject.NowLevel);

            //清空頁面內容並顯示
            if (objPage.length == 0) {
                $("#Template_Content").append("<div id='" + BaseObject.PageNM + BaseObject.NowLevel + "'></div>").show();
            } else {
                objPage.empty().show();
            }

            //當前頁面層級不等於目前頁面層級才執行, 避免目前頁面被隱藏
            if (BaseObject.PreLevel != BaseObject.NowLevel) {
                $("#" + BaseObject.PageNM + BaseObject.PreLevel).hide();
            }

            //刪除多餘的頁面
            $.each($("[id*=" + BaseObject.PageNM + "]"), function (index, item) {

                if (index > BaseObject.NowLevel - 1 && index != BaseObject.NowLevel - 1) {
                    $(item).remove();
                }

            });

        };

        //鎖右鍵不允許使用者複製貼上
        function CopyControl() {
            //拖拉
            $(document).bind("dragstart", function (e) {
                return false;
            });
            //滑鼠右鍵
            $(document).bind("contextmenu", function (e) {
                return false;
            });
            //Ctrl加特定按鈕,
            $(document).bind("keydown", function (e) {
                //78=N,67=C,80=P,83=S,86=V,88=X,65=A
                if ((e.ctrlKey && e.keyCode == 78) || (e.ctrlKey && e.keyCode == 67) || (e.ctrlKey && e.keyCode == 80) ||
                      (e.ctrlKey && e.keyCode == 83) || (e.ctrlKey && e.keyCode == 86) || (e.ctrlKey && e.keyCode == 88) ||
                      (e.ctrlKey && e.keyCode == 65)
                    ) {
                    return false;
                }
            });
        };

        function FindNowPage() {
            /// <summary>
            /// 取得目前頁面的最上層物件
            /// </summary>

            var nowPage = null;

            //先確認是否在open window中(登箱頁面中)
            nowPage = $("#" + BaseObject.OpenWindowID + BaseObject.OpenWindowCount);

            if (nowPage.length > 0) {
                return nowPage;
            }
            else {
                //若不再登箱頁面中, 則取得目前PageLevel頁面層級
                nowPage = $("#" + BaseObject.PageNM + BaseObject.NowLevel);
            }

            return nowPage;

        };

        return {
            ChkIsEscapteConfirm: ChkIsEscapteConfirm,
            InitPage: InitPage,
            LoadPage: LoadPage,
            LoadContent: LoadContent,
            LoadSubPage: LoadSubPage,
            CopyControl: CopyControl,
            FindNowPage: FindNowPage
        }
    }();

    return {
        Ajax: AjaxObject,
        Page: Page
    }
}();