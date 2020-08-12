using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DomainObject.DomainObject;
using BusinessLogicLayer.Service.Interface;
using BusinessLogicLayer;
using Newtonsoft.Json;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainObject.DefinedDomainObject;

public partial class TestTransactionSample : System.Web.UI.Page
{
    #region Property

    private static IAuthenticationMethod _AuthenticationMethod;
    public IAuthenticationMethod AuthenticationMethod
    {
        get
        {
            if (_AuthenticationMethod == null)
            {
                _AuthenticationMethod = (IAuthenticationMethod)(new RepositoryFactory()).Service("AuthenticationMethod");
            }

            return _AuthenticationMethod;
        }
    }

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

    protected void Page_Load(object sender, System.EventArgs e)
    {
    }

    protected void btnSearch_Click(object sender, EventArgs e)
    {
        //List<KendoGridSortObject> sortObject = JsonConvert.DeserializeObject<List<KendoGridSortObject>>("[{\"field\":\"FLOW_NM\",\"dir\":\"asc\"}]");

        ClipboardWebService webService = new ClipboardWebService();
        //FuncMenuWebService funcWebService = new FuncMenuWebService();
        //funcWebService.GetFuncMenu("019405");


        //List<WorkListObject> workList = webService.GetWorkListForMobile("872222");
        //KendoGridObject<CUTPHOTOObject> caseHistory = webService.GetFileUploadList(1, 5);

        string aaa = "{\"__type\":\"DomainObject.DomainObject.TableDomainObject.CUTPHOTOObject\",\"DATA_ID\":2,\"DATANO\":\"test111\",\"FILENAME\":\"testByBen\",\"FILEDESC\":\"測試用\",\"USERNAME\":\"sa\",\"CREATEDATE\":\"2014-07-28T16:00:00.000Z\"}";
        webService.DeleteFile(aaa);

    }
}