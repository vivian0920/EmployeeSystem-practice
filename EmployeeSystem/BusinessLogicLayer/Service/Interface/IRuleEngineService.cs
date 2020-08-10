using System.Collections.Generic;
using DomainObject.DomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface IRuleEngineService
    {
        /// <summary>
        /// 取得資料集資料
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/18  Steven_Chen Create
        /// </history>
        DeliverObject GetDataSet(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則主檔資料
        /// </summary>
        /// <param name="objPara">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/11/06  Steven_Chen Create
        /// </history>
        DeliverObject GetReRule(ReceiveObject objParameters);

        /// <summary>
        /// 新增規則主檔資料
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/19  Steven_Chen Create
        /// </history>
        DeliverObject InsertReRule(ReceiveObject objParameters);

        /// <summary>
        /// 更新規則主檔資料
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/27  Steven_Chen Create
        /// </history>
        DeliverObject UpdateReRule(ReceiveObject objParameters);

        /// <summary>
        /// 刪除規則主檔資料
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/16  Steven_Chen Create
        /// </history>
        DeliverObject DeleteReRule(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則清單
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/23  Steven_Chen Create
        /// </history>
        DeliverObject GetRuleList(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/29  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStep(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟明細
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/29  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepDetail(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟對象
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/29  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepParty(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/29  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepAttribute(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟ActionSet屬性
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/07  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepActionSetAttribute(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟ActionSet屬性
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/07  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepActionSetEnumAttribute(ReceiveObject objParameters);

        /// <summary>
        /// 取得規則步驟ActionSet EnumFunction
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/07  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepActionSetEnumFunction(ReceiveObject objParameters);

        /// <summary>
        /// 取得RuleStep
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/08  Daniel Lee Create
        /// </history>
        DeliverObject GetRuleStepObject(ReceiveObject objParameters);

        /// <summary>
        /// 新增規則明細資料
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/24  Daniel Lee Create
        /// </history>
        DeliverObject InsertReRuleDetail(ReceiveObject objParameters);

        /// <summary>
        /// 取得資料集明細資料
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/29  Daniel Lee Create
        /// </history>
        DeliverObject GetDataSetDetail(ReceiveObject objParameters);

        /// <summary>
        /// 判斷規則是否有維護中的版本
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/11/05  Steven_Chen Create 
        /// </history>
        DeliverObject IsHaveMaintainVersion(ReceiveObject objParameters);
    }
}
