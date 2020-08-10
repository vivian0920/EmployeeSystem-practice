using System.Collections.Generic;
using System.Web.Services;
using BusinessLogicLayer.Service.Interface;
using BusinessLogicLayer;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using Newtonsoft.Json;

/// <summary>
/// WorkListWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下一行。
[System.Web.Script.Services.ScriptService]
public class WorkListWebService : System.Web.Services.WebService
{
    #region Property

    private static IWorkListService _WorkListService;
    public IWorkListService WorkListService
    {
        get
        {
            if (_WorkListService == null)
            {
                _WorkListService = (IWorkListService)(new RepositoryFactory()).Service("WorkListService");
            }

            return _WorkListService;
        }
    }

    #endregion

    [WebMethod]
    public KendoGridObject<WorkListObject> GetWorkList(int page, int pageSize, object sort, string queryData)
    {
        WorkListObject filterObject = JsonConvert.DeserializeObject<WorkListObject>(queryData);

        List<KendoGridSortObject> sortObjectList = new List<KendoGridSortObject>();
        if (sort != null)
        {
            sortObjectList = JsonConvert.DeserializeObject<List<KendoGridSortObject>>(JsonConvert.SerializeObject(sort));
        }

        return this.WorkListService.GetWorkList(page, pageSize, filterObject.USER_ID, sortObjectList);
    }

    [WebMethod]
    public List<WorkListObject> GetWorkListForMobile(string userId)
    {
        return this.WorkListService.GetWorkListForMobile(userId);
    }

    [WebMethod]
    public List<CaseHistoryObject> GetCaseHistoryForMobile(string caseSn)
    {
        return this.WorkListService.GetCaseHistoryForMobile(caseSn);
    }

    [WebMethod]
    public List<CaseQueryObject> GetCaseQuery(string startDT, string endDT)
    {
        return this.WorkListService.GetCaseQuery(startDT, endDT);
    }
}
