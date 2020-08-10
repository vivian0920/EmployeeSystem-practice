using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BusinessLogicLayer.Service.Interface;
using BusinessLogicLayer;
using DomainObject.DomainObject;
using System.Web.Script.Services;

/// <summary>
/// SystemWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下列一行。
[System.Web.Script.Services.ScriptService]
public class SystemWebService : System.Web.Services.WebService {

    #region Property

    //SC Authentication Service
    private static ISystemService _SystemService;
    public ISystemService SystemService
    {
        get
        {
            if (_SystemService == null)
            {
                _SystemService = (ISystemService)(new RepositoryFactory()).Service("SystemService");
            }

            return _SystemService;
        }
    }

    #endregion

    /// <summary>
    /// 取得系統代碼資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/12  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetSystemCode(ReceiveObject obj)
    {
        return this.SystemService.GetSystemCode(obj);
    }

    /// <summary>
    /// 取得系統代碼(Array)
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/16   Daniel Lee   Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetSystemCodeByList(ReceiveObject obj)
    {
        return this.SystemService.GetSystemCodeByList(obj);
    }
}
