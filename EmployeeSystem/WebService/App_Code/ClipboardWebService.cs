using BusinessLogicLayer;
using BusinessLogicLayer.Service.Interface;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;
using Newtonsoft.Json;
using System.Web.Services;
using WebUtility;

/// <summary>
/// ClipboardWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下列一行。
[System.Web.Script.Services.ScriptService]
public class ClipboardWebService : System.Web.Services.WebService
{
    #region Property

    private static IClipboardService _ClipboardService;
    public IClipboardService ClipboardService
    {
        get
        {
            if (_ClipboardService == null)
            {
                _ClipboardService = (IClipboardService)(new RepositoryFactory()).Service("ClipboardService");
            }

            return _ClipboardService;
        }
    }

    #endregion

    [WebMethod]
    public KendoGridObject<CUTPHOTOObject> GetFileUploadList(int page, int pageSize)
    {
        return this.ClipboardService.GetFileUploadList(page, pageSize);
    }

    /// <summary>
    /// 新增資料
    /// </summary>
    /// <param name="actionData">資料物件(格式為json字串)</param>
    [WebMethod]
    public void InsertFile(string actionData)
    {
        CUTPHOTOObject dataObj = JsonConvert.DeserializeObject<CUTPHOTOObject>(actionData);
        this.ClipboardService.InsertFile(dataObj);
    }

    /// <summary>
    /// 刪除資料
    /// </summary>
    /// <param name="actionData">資料物件(格式為json字串)</param>
    [WebMethod]
    public void DeleteFile(string actionData)
    {
        //LogInfoObject log = new LogInfoObject();
        //log.UserID = "Ben";
        //log.FunctionList = "待辦清單/案件資訊";
        //LogBySession.SetLogInfoToSession(log);

        CUTPHOTOObject dataObj = JsonConvert.DeserializeObject<CUTPHOTOObject>(actionData);
        this.ClipboardService.DeleteFile(dataObj);
    }

}
