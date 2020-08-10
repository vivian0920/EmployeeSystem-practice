using System.Collections.Generic;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using System.Web.Services;
using BusinessLogicLayer;
using BusinessLogicLayer.Service.Interface;
using DomainObject.DomainObject;
using System.Web.Script.Services;
using Newtonsoft.Json;
using System.Collections;
using System;

/// <summary>
/// CustomWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下列一行。
 [System.Web.Script.Services.ScriptService]
public class CustomWebService : System.Web.Services.WebService
{

    #region Property

    //SC Authentication Service
    private static ICustomService _CustomService;
    public ICustomService CustomService
    {
        get
        {
            if (_CustomService == null)
            {
                _CustomService = (ICustomService)(new RepositoryFactory()).Service("CustomService");
            }

            return _CustomService;
        }
    }

    #endregion

    /// <summary>
    /// 查詢資料
    /// </summary>
    /// <param name = "obj" > 參數物件 </ param >
    /// < returns >輸出物件</ returns >
    [WebMethod(EnableSession = true)]
    public DeliverObject GetCustomer(ReceiveObject obj)
    {
        return this.CustomService.GetCustomer(obj);
    }

    /// <summary>
    /// 新增資料
    /// </summary>
    /// <param name = "obj" > 參數物件 </ param >
    /// < returns >輸出物件</ returns >
    [WebMethod(EnableSession = true)]
    public DeliverObject InsertCustomer(ReceiveObject obj)
    {
        return this.CustomService.InsertCustomer(obj);
    }

    /// <summary>
    /// 刪除資料
    /// </summary>
    /// <param name = "obj" > 參數物件 </ param >
    /// < returns >輸出物件</ returns >
    [WebMethod(EnableSession = true)]
    public DeliverObject DeleteCustomer(ReceiveObject obj)
    {
        return this.CustomService.DeleteCustomer(obj);
    }

    /// <summary>
    /// 查詢資料
    /// </summary>
    /// <param name = "obj" > 參數物件 </ param >
    /// < returns >輸出物件</ returns >
    [WebMethod(EnableSession = true)]
    public DeliverObject ExportCustomer(ReceiveObject obj)
    {
        return this.CustomService.ExportCustomer(obj);
    }

    /// <summary>
    /// 測試Function
    /// </summary>
    [WebMethod]
    public DeliverObject TestGetCustomer()
    {
        ReceiveObject obj = new ReceiveObject();
        //DeliverObject reobj = new DeliverObject();
        //obj.Parameters = "[{CUST_NM : 66, CUST_ID : 99},{ CUST_NM : 33, CUST_ID : 44}]";
        //DateTime time = DateTime.Now;
        CustomObject c1 = new CustomObject();
        //c1.CUST_ID = "";
        //c1.CUST_NM = "";
        //c1.UPD_DT = "20171214";
        //CustomObject c2 = new CustomObject();
        //c2.CUST_ID = "55688";
        //c2.CUST_NM = "";
        //c2.UPD_DT = "20171213";
        //CustomObject c3 = new CustomObject();
        //c3.CUST_ID = "55688";
        //c3.CUST_NM = "User";
        //c3.UPD_DT = "";
        ////string tmpTime = "20170101";
        ////DateTime tttome = Convert.ToDateTime(tmpTime);
        ////object c = JsonConvert.DeserializeObject("{CUST_NM : 33, CUST_ID : 22 , UPD_DT : " + time + "}");
        ////object d = JsonConvert.DeserializeObject("{CUST_NM : 323, CUST_ID : 815, UPD_DT : " + time + "}");
        List<CustomObject> tt = new List<CustomObject>();
        tt.Add(c1);
        //tt.Add(c2);
        //tt.Add(c3);
        obj.Parameters = tt;
        //return this.CustomService.InsertCustomer(obj);
        return this.CustomService.ExportCustomer(obj);
    }
}
