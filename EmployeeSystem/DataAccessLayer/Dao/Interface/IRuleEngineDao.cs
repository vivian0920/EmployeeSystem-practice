using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainObject.DefinedDomainObject;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Interface
{
    public interface IRuleEngineDao
    {
        /// <summary>
        /// 取得資料集資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/18  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReDataSetObject> GetDataSet(LogInfoObject objLogInfo, ReDataSetObject obj);

        /// <summary>
        /// 取得規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/11/06  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReRuleObject> GetReRule(LogInfoObject objLogInfo, ReRuleObject obj);

        /// <summary>
        /// 新增規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/09/19  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        void InsertReRule(LogInfoObject objLogInfo, ReRuleObject obj);

        /// <summary>
        /// 更新規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/27  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        void UpdateReRule(LogInfoObject objLogInfo, ReRuleObject obj);

        /// <summary>
        /// 刪除規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/16  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        void DeleteReRule(LogInfoObject objLogInfo, ReRuleObject obj);

        /// <summary>
        /// 取得規則清單
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/23  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<RuleEngineObject_RuleList> GetRuleList(LogInfoObject objLogInfo, RuleEngineObject_RuleQuery obj);

        /// <summary>
        /// 取得規則步驟資
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<RuleEngineObject_RuleStep> GetRuleStep(LogInfoObject objLogInfo, RuleEngineObject_RuleStep obj);

        /// <summary>
        /// 取得規則步驟明細
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<RuleEngineObject_RuleList> GetRuleStepDetail(LogInfoObject objLogInfo, ReRuleObject obj);

        /// <summary>
        /// 取得規則步驟對象
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReDatasetParty> GetRuleStepParty(LogInfoObject objLogInfo, ReDatasetParty obj);

        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReDataSetPartyAttribute> GetRuleStepActionSetAttribute(LogInfoObject objLogInfo, ReDataSetPartyAttribute_Query obj);

        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReDataSetPartyAttribute> GetRuleStepAttribute(LogInfoObject objLogInfo, ReDataSetPartyAttribute_Query obj);

        /// <summary>
        /// 取得規則步驟ActionSet屬性
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/07  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<RuleEngineObject_ActionSet> GetRuleStepActionSetEnumAttribute(LogInfoObject objLogInfo, RuleEngineObject_ActionSet obj);

        /// <summary>
        /// 取得規則步驟ActionSet EnumFunction
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/07  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<RuleEngineObject_ActionSetEnumFunction> GetRuleStepActionSetEnumFunction(LogInfoObject objLogInfo, RuleEngineObject_ActionSetEnumFunction obj);

        /// <summary>
        /// 取得RuleStep
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/08  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReRuleStepObject> GetRuleStepObject(LogInfoObject objLogInfo, ReRuleStepObject obj);

        /// <summary>
        /// 新增規則明細資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/24  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        void InsertReRuleDetail(LogInfoObject objLogInfo, ReRuleStepDetailObject[] obj);

        /// <summary>
        /// 取得最大值序號
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <history>
        /// 1. 2014/10/27  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        int GetMaxRuleStepSeq(LogInfoObject objLogInfo);

        /// <summary>
        /// 取得資料集明細資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        IList<ReRuleStepDetailObject> GetDataSetDetail(LogInfoObject objLogInfo, ReRuleStepDetailObject obj);

        /// <summary>
        /// 刪除規則明細資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/24  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        void DeleteReRuleDetail(LogInfoObject objLogInfo, ReRuleStepDetailObject obj);

        /// <summary>
        /// 更新規則步驟主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/30  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        void UpdateReRuleStep(LogInfoObject objLogInfo, ReRuleStepObject obj);

        /// <summary>
        /// 判斷規則是否有維護中的版本
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/11/05  Steven_Chen Create 
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        bool IsHaveMaintainVersion(LogInfoObject objLogInfo, ReRuleObject obj);
    }
}
