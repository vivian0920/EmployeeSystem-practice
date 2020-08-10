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
/// RuleEngineWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下列一行。
[System.Web.Script.Services.ScriptService]
public class RuleEngineWebService : System.Web.Services.WebService {

    #region Property

    //SC Authentication Service
    private static IRuleEngineService _RuleEngineService;
    public IRuleEngineService RuleEngineService
    {
        get
        {
            if (_RuleEngineService == null)
            {
                _RuleEngineService = (IRuleEngineService)(new RepositoryFactory()).Service("RuleEngineService");
            }

            return _RuleEngineService;
        }
    }

    #endregion

    /// <summary>
    /// 取得資料集資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/18  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetDataSet(ReceiveObject obj)
    {
        return this.RuleEngineService.GetDataSet(obj);
    }

    /// <summary>
    /// 取得規則主檔資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/11/06  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetReRule(ReceiveObject obj)
    {
        return this.RuleEngineService.GetReRule(obj);
    }

    /// <summary>
    /// 新增規則主檔資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/19  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject InsertReRule(ReceiveObject obj)
    {
        return this.RuleEngineService.InsertReRule(obj);
    }

    /// <summary>
    /// 更新規則主檔資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/27  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject UpdateReRule(ReceiveObject obj)
    {
        return this.RuleEngineService.UpdateReRule(obj);
    }

    /// <summary>
    /// 刪除規則主檔資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/16  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession=true)]
    public DeliverObject DeleteReRule(ReceiveObject obj)
    {
        return this.RuleEngineService.DeleteReRule(obj);
    }

    /// <summary>
    /// 取得規則清單
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/23  Steven_Chen Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleList(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleList(obj);
    }

    /// <summary>
    /// 取得規則步驟
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/29  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStep(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStep(obj);
    }

    /// <summary>
    /// 取得規則步驟明細
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/29  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepDetail(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepDetail(obj);
    }

    /// <summary>
    /// 取得規則步驟對象
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/29  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepParty(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepParty(obj);
    }

    /// <summary>
    /// 取得規則步驟屬性
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/29  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepActionSetAttribute(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepActionSetAttribute(obj);
    }

    /// <summary>
    /// 取得規則步驟屬性
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/09/29  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepAttribute(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepAttribute(obj);
    }

    /// <summary>
    /// 取得規則步驟ActionSet屬性
    /// </summary>
    /// <param name="objParameters">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/07  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepActionSetEnumAttribute(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepActionSetEnumAttribute(obj);
    }

    /// <summary>
    /// 取得規則步驟ActionSet EnumFunction
    /// </summary>
    /// <param name="obj">資料物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/07  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepActionSetEnumFunction(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepActionSetEnumFunction(obj);
    }

    /// <summary>
    /// 取得RuleStep
    /// </summary>
    /// <param name="obj">資料物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/08  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetRuleStepObject(ReceiveObject obj)
    {
        return this.RuleEngineService.GetRuleStepObject(obj);
    }

    /// <summary>
    /// 新增規則明細資料
    /// </summary>
    /// <param name="obj">參數物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/24  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject InsertReRuleDetail(ReceiveObject obj)
    {
        return this.RuleEngineService.InsertReRuleDetail(obj);
    }

    /// <summary>
    /// 取得資料集明細資料
    /// </summary>
    /// <param name="obj">資料物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/10/29  Daniel Lee Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject GetDataSetDetail(ReceiveObject obj)
    {
        return this.RuleEngineService.GetDataSetDetail(obj);
    }

    /// <summary>
    /// 判斷規則是否有維護中的版本
    /// </summary>
    /// <param name="obj">資料物件</param>
    /// <returns></returns>
    /// <history>
    /// 2014/11/05  Steven_Chen Create 
    /// </history>
    [WebMethod(EnableSession = true)]
    public DeliverObject IsHaveMaintainVersion(ReceiveObject obj)
    {
        return this.RuleEngineService.IsHaveMaintainVersion(obj);
    }
}
