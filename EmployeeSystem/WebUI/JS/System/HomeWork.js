
//初始化欄位、grid
//$("input[name='employeeName']").BestTextBox();
$("#employeeName").BestTextBox();
$("#employeeId").BestTextBox();
$("#hireDate").BestDatePicker();
var inputAmount = 1;

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
    queryParameters: [{}],//設定查詢條件為空
    columnDefine: [{
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

//新增員工
$("#insertButton").click(function (e) {
    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: "post",
        dataType: "json",
        url: "http://localhost/WebService/CustomWebService.asmx/InsertCustomer",
        data: SharedMethodObject.Ajax.SetData([{"CUST_NM": $("#employeeName").BestTextBox().Bvalue(), "CUST_ID": $("#employeeId").BestTextBox().Bvalue(), "UPD_DT": $("#hireDate").BestDatePicker().Bvalue() }]),
        success: function (data) {
            alert("新增成功，謝謝您!");
            $("#searchResultGrid").BestDataGrid().refresh(true);
        },
        error: function (e) { alert("傳送失敗") }
    })
})




//根據輸入的資料查找員工
$("#searchButton").click(function (e) {
    var obj= [{ "CUST_NM": $("#employeeName").BestTextBox().Bvalue(), "CUST_ID": $("#employeeId").BestTextBox().Bvalue(), "UPD_DT": $("#hireDate").BestDatePicker().Bvalue()}];
    $("#searchResultGrid").BestDataGrid().setOptions({ queryParameters: obj });//根據使用者輸入的值重設搜尋條件
    $("#searchResultGrid").BestDataGrid().refresh(true);
})

$("#insertConditionButton").click(function (e) {
    inputAmount += 1;
    $("#buttons").before('<div id="input'+inputAmount+'"> ' +
                           ' <div style="margin-left:100px ;">' +
                                '<div>' +
                                '<h4>員工'+inputAmount+'</h4>'+
                                '<div>'+
                                    '<label style="float:left;margin-right:50px">請輸入姓名:</label>'+
                                    '<input type="text" name="employeeName" data-role="besttextbox" data-mode="Digit" />' +
                                '</div>'+
                                '<div>'+
                                    '<label style="float:left;margin-right:50px">請輸入員編:</label>'+
                                    '<input type="text" class="employeeId" data-role="besttextbox"data-mode="Digit"/>'+
                                '</div>'+
                                '<div style="margin-bottom:10px">'+
                                    '<label style="float:left; margin-left:15px ;margin-right:50px">到職日期:</label>'+
                                    '<input type="text" class="hireDate"  data-role="bestdatepicker" data-is_tw_year="true"/>'+
                                '</div>'+
                           '</div>'+
                     '</div>');

})
$("#deleteConditionButton").click(function (e) {
    $("#input" + inputAmount).remove();
    if (inputAmount == 1) {
        alert("無法刪除所有搜尋條件");
    } else {
        inputAmount -= 1;
    }
    
})







