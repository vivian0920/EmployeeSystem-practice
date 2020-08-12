using System.Collections.Generic;
using System.Web.Services;
using BusinessLogicLayer;
using BusinessLogicLayer.Service.Interface;
using DomainObject.DomainObject.DefinedDomainObject;

/// <summary>
/// FuncMenuWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下一行。
[System.Web.Script.Services.ScriptService]
public class FuncMenuWebService : System.Web.Services.WebService
{
    #region Property

    private static IFuncMenuService _FuncMenuService;
    public IFuncMenuService FuncMenuService
    {
        get
        {
            if (_FuncMenuService == null)
            {
                _FuncMenuService = (IFuncMenuService)(new RepositoryFactory()).Service("FuncMenuService");
            }

            return _FuncMenuService;
        }
    }

    #endregion

    [WebMethod()]
    public List<KendoPanelBarObject> GetFuncMenu(string userId)
    {
        return this.FuncMenuService.GetFuncMenu(userId);
    }
}
