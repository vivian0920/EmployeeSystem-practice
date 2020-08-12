

//初始化欄位、grid
var inputAmount = 1;//紀錄有幾組input
initialColumn();

function initialColumn() {
    $("#employeeName" + inputAmount).BestTextBox();
    $("#employeeId" + inputAmount).BestTextBox();
    $("#hireDate" + inputAmount).BestDatePicker();
}

$("#searchResultGrid").BestDataGrid({
    gridCaption: "員工資料",//表頭
    gridUnit: "人數",//單位
    readUri: "http://localhost/WebService/CustomWebService.asmx/GetCustomer",
    schemaModelId: "CUST_ID", //設定dataSource的PK欄位
    schemaModelFields: { //設定dataSource的欄位
        CUST_ID: { type: "string" },  
        CUST_NM: { type: "string" },
        UPD_DT: { type: "string" }
    },
    queryParameters: [{}],//設定查詢條件為空，以顯示全部的資料
    columnDefine: [
        {
            title: "刪除",
            command: [
                {
                    name: "deleteData",
                    text: "<span class='k-icon k-i-close' title='刪除'></span>",
                    click: function (e) {
                        if (confirm("是否確定刪除?")) {
                             //e.target is the DOM element representing the button
                            var grid = $(e.target).closest("div[data-role='bestdatagrid']").BestDataGrid();
                                dataSource = grid.options.dataSource

                                //取得目前資料列
                                nowTR = $(e.target).closest("tr")
                                nowData = this.dataItem(nowTR);
                                $.ajax({
                                    contentType: "application/json; charset=utf-8",
                                    type: "post",
                                    dataType: "json",
                                    url: "http://localhost/WebService/CustomWebService.asmx/DeleteCustomer",
                                    data: SharedMethodObject.Ajax.SetData({"CUST_ID": nowData.CUST_ID}),
                                    success: function (e) {
                                        alert(e.d.Data);
                                        dataSource.remove(nowData);
                                        //dataSource.sync();
                                    },
                                    error: function (e) { alert("系統發生錯誤") }
                                })
                        }
                    }
                }
            ]
        },
        {
        field: "CUST_ID",
        title: "員工編號"
    },
        {
            field: "CUST_NM",
            title: "姓名"
        },
        {
            field: "UPD_DT",
            title: "到職日期"
        }]
});

//取得使用者輸入的資料
function getInputData() {
    var inputData = [];
    for (var i = 1; i <= inputAmount; i++) {
        var obj = {
            "CUST_NM": $("#employeeName" + i).BestTextBox().Bvalue(),
            "CUST_ID": $("#employeeId" + i).BestTextBox().Bvalue(),
            "UPD_DT":  $("#hireDate" + i).BestDatePicker().Bvalue()
        }
        inputData.push(obj);
       
    } return inputData;

}

//新增員工
$("#insertButton").click(function (e) {
    if (validateInputData()) {
        var obj = getInputData();//取得使用者輸入的資料
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            url: "http://localhost/WebService/CustomWebService.asmx/InsertCustomer",
            data: SharedMethodObject.Ajax.SetData(obj),
            success: function (e) {
                alert(e.d.Data);
                search();//讓畫面顯示新增的結果
            },
            error: function (e) { alert("系統發生錯誤") }
        })
    }
   
})

//根據輸入的資料查找員工
function search()
{
    var obj = getInputData();//取得使用者輸入的資料
    $("#searchResultGrid").BestDataGrid().setOptions({ queryParameters: obj });//根據使用者輸入的值重設grid的搜尋條件
    $("#searchResultGrid").BestDataGrid().refresh(true);
}

//按下新增輸入欄位按鈕
$("#insertConditionButton").click(function (e) {
    inputAmount += 1;
    $("#buttons").before('<div id="input'+inputAmount+'"> ' +
                           ' <div style="margin-left:100px ;">' +
                                '<div>' +
                                '<h4>員工'+inputAmount+'</h4>'+
                                '<div>'+
                                    '<label style="float:left;margin-right:50px">請輸入姓名:</label>'+
                                    '<input type="text" name="employeeName" id="employeeName'+inputAmount+'" data-role="besttextbox"  data-placeholder="請輸入" />' +
                                '</div>'+
                                '<div>'+
                                    '<label style="float:left;margin-right:50px">請輸入員編:</label>'+
                                    '<input type="text" name="employeeId" id="employeeId'+inputAmount+'"data-role="besttextbox" data-placeholder="請輸入" data-mode="AlphaNumeric"/>' +
                                '</div>'+
                                '<div style="margin-bottom:10px">'+
                                    '<label style="float:left; margin-left:15px ;margin-right:50px">到職日期:</label>'+
                                    '<input type="text" name="hireDate" id="hireDate'+inputAmount+'" data-role="bestdatepicker" data-is_tw_year="true"/>' +
                                '</div>'+
                           '</div>'+
                     '</div>');
    initialColumn();//新增的欄位初始化設定
})

//按下刪除輸入欄位按鈕
$("#deleteConditionButton").click(function (e) {
    $("#input" + inputAmount).remove();
    if (inputAmount == 1) {
        alert("無法刪除所有搜尋條件");
    } else {
        inputAmount -= 1;
    }
    
})

//清空所有欄位
function clearAll()
{
    for (var i = 1; i <= inputAmount; i++) {
        $("#employeeName" + i).BestTextBox().Bvalue("");
        $("#employeeId" + i).BestTextBox().Bvalue("");
        $("#hireDate" + i).BestDatePicker().Bvalue("");
        search();
    }
        
}

//新增驗證(所有欄位不得為空、員編不得重複)
function validateInputData()
{
    var obj = [];//用來檢查欄位是否為空
    var pk = [];//用來檢查員編pk是否重複
    for (var i = 1; i <= inputAmount; i++) {
        obj.push($("#employeeName" + i).BestTextBox().Bvalue());
        obj.push($("#employeeId" + i).BestTextBox().Bvalue());
        obj.push($("#hireDate" + i).BestDatePicker().Bvalue());
        if (obj.indexOf("") != -1){
            alert("新增欄位不得為空");
            return false;
        } else if (pk.indexOf($("#employeeId" + i).BestTextBox().Bvalue()) != -1)
        {
            alert("員工編號不得重複");
            return false;
        }
        pk.push($("#employeeId" + i).BestTextBox().Bvalue());
    }
    return true;
}





