using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BusinessLogicLayer.Service.Interface;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainObject;
using Newtonsoft.Json;
using System.Linq.Expressions;
using LogHandler.DomainObject;


namespace BusinessLogicLayer.Service.Implement
{
    public class RuleEngineService : BaseService, IRuleEngineService
    {
        #region Properties
        
        private IRuleEngineDao RuleEngineDao { get; set; }

        #endregion

        /// <summary>
        /// 取得資料集資料
        /// </summary>
        /// <param name="objPara">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/18   1.00   Steven_Chen   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetDataSet(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReDataSetObject objParameters = JsonConvert.DeserializeObject<ReDataSetObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得系統代碼資料
            IList<ReDataSetObject> objDataSet = RuleEngineDao.GetDataSet(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objDataSet;

            return objDeliver;
        }

        /// <summary>
		/// 取得規則主檔資料
        /// </summary>
        /// <param name="objPara">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/11/06   1.00   Steven_Chen   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetReRule(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleObject objParameters = JsonConvert.DeserializeObject<ReRuleObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得系統代碼資料
            IList<ReRuleObject> objDataSet = RuleEngineDao.GetReRule(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objDataSet;

            return objDeliver;
        }

        /// <summary>
        /// 新增規則主檔資料
        /// </summary>
        /// <param name="objPara">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/19   1.00   Steven_Chen   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject InsertReRule(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleObject objParameters = JsonConvert.DeserializeObject<ReRuleObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //新增規則主檔
            RuleEngineDao.InsertReRule(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = true;

            return objDeliver;
        }

        /// <summary>
        /// 更新規則主檔資料
        /// </summary>
        /// <param name="objPara">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/27   1.00   Steven_Chen   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject UpdateReRule(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleObject objParameters = JsonConvert.DeserializeObject<ReRuleObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //刪除規則主檔
            RuleEngineDao.UpdateReRule(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = true;

            return objDeliver;
        }

        /// <summary>
        /// 刪除規則主檔資料
        /// </summary>
        /// <param name="objPara">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/16   1.00   Steven_Chen   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject DeleteReRule(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleObject objParameters = JsonConvert.DeserializeObject<ReRuleObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //刪除規則主檔
            RuleEngineDao.DeleteReRule(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = true;

            return objDeliver;

        }

        /// <summary>
        /// 取得規則清單
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/23   1.00   Steven_Chen   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleList(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            RuleEngineObject_RuleQuery objParameters = JsonConvert.DeserializeObject<RuleEngineObject_RuleQuery>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<RuleEngineObject_RuleList> objRuleList = RuleEngineDao.GetRuleList(objPara.LogInfoObject, objParameters);

            objDeliver.TotalCount = objRuleList.Count;

            //處理Grid每頁取得資料
            ProcGridData<RuleEngineObject_RuleList>(objPara.GridParameters, ref objRuleList);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStep(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            RuleEngineObject_RuleStep objParameters = JsonConvert.DeserializeObject<RuleEngineObject_RuleStep>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<RuleEngineObject_RuleStep> objRuleList = RuleEngineDao.GetRuleStep(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟明細
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepDetail(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleObject objParameters = JsonConvert.DeserializeObject<ReRuleObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<RuleEngineObject_RuleList> objRuleList = RuleEngineDao.GetRuleStepDetail(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟對象
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepParty(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReDatasetParty objParameters = JsonConvert.DeserializeObject<ReDatasetParty>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<ReDatasetParty> objRuleList = RuleEngineDao.GetRuleStepParty(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepActionSetAttribute(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReDataSetPartyAttribute_Query objParameters = JsonConvert.DeserializeObject<ReDataSetPartyAttribute_Query>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<ReDataSetPartyAttribute> objRuleList = RuleEngineDao.GetRuleStepActionSetAttribute(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepAttribute(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReDataSetPartyAttribute_Query objParameters = JsonConvert.DeserializeObject<ReDataSetPartyAttribute_Query>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<ReDataSetPartyAttribute> objRuleList = RuleEngineDao.GetRuleStepAttribute(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟ActionSet屬性
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/07   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepActionSetEnumAttribute(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            RuleEngineObject_ActionSet objParameters = JsonConvert.DeserializeObject<RuleEngineObject_ActionSet>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<RuleEngineObject_ActionSet> objRuleList = RuleEngineDao.GetRuleStepActionSetEnumAttribute(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得規則步驟ActionSet EnumFunction
        /// </summary>
        /// <param name="objPara">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/07   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepActionSetEnumFunction(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            RuleEngineObject_ActionSetEnumFunction objParameters = JsonConvert.DeserializeObject<RuleEngineObject_ActionSetEnumFunction>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<RuleEngineObject_ActionSetEnumFunction> objRuleList = RuleEngineDao.GetRuleStepActionSetEnumFunction(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 取得RuleStep
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/08   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetRuleStepObject(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleStepObject objParameters = JsonConvert.DeserializeObject<ReRuleStepObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得規則清單
            IList<ReRuleStepObject> objRuleList = RuleEngineDao.GetRuleStepObject(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objRuleList;

            return objDeliver;
        }

        /// <summary>
        /// 新增規則明細資料
        /// </summary>
        /// <param name="objParameters">參數物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/24   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject InsertReRuleDetail(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            RuleEngineObject_ReRuleStepDetail objParameters = JsonConvert.DeserializeObject<RuleEngineObject_ReRuleStepDetail>(JsonConvert.SerializeObject(objPara.Parameters));
            
            ReRuleStepDetailObject[] objRRSD = objParameters.RE_RILE_STEP_DETAIL;

            //更新規則明細主檔案
            RuleEngineDao.UpdateReRuleStep(objPara.LogInfoObject, objParameters.RE_RILE_STEP);

            //刪除規則明細明細檔
            RuleEngineDao.DeleteReRuleDetail(objPara.LogInfoObject, objRRSD[0]);

            //設定RULE_STEP_DETAIL_SEQ(規則步驟區塊序號)、UPPER_STEP_DETAIL_SEQ(規則步驟明細序號)、RULE_STEP_DETAIL_ORDER(順序)
            SetRuleStepSeq(objPara.LogInfoObject, ref objRRSD);

            //新增規則明細明細檔
            RuleEngineDao.InsertReRuleDetail(objPara.LogInfoObject, objRRSD);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = true;

            return objDeliver;
        }

        /// <summary>
        /// 設定RULE_STEP_DETAIL_SEQ(規則步驟區塊序號)、UPPER_STEP_DETAIL_SEQ(規則步驟明細序號)、RULE_STEP_DETAIL_ORDER(順序)
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/27   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify 增加傳入LOG物件
        /// </history>
        private void SetRuleStepSeq(LogInfoObject objLogInfo, ref ReRuleStepDetailObject[] obj)
        {
            int intMaxRuleStepSeq = RuleEngineDao.GetMaxRuleStepSeq(objLogInfo);
            for (int i = 0; i < obj.Length; i++)
            {
                //取得目前規則步驟區塊序號最大值
                intMaxRuleStepSeq += 1;
                obj[i].RULE_STEP_DETAIL_SEQ = intMaxRuleStepSeq.ToString();

                //設定UPPER_STEP_DETAIL_SEQ為上一層的RULE_STEP_DETAIL_SEQ
                for (int j = i; j >= 0; j--)
                {
                    if ((Convert.ToInt16(obj[i].STEP_DETAIL_LEVEL) - 1).ToString() == obj[j].STEP_DETAIL_LEVEL)
                    {
                        obj[i].UPPER_STEP_DETAIL_SEQ = obj[j].RULE_STEP_DETAIL_SEQ;
                        break;
                    }
                }

                //依照UPPER_STEP_DETAIL_SEQ的筆數給予RULE_STEP_DETAIL_ORDER
                int intRuleStepDetailOrder = 0;
                for (int k = 0; k <= i; k++)
                {
                    if (obj[k].UPPER_STEP_DETAIL_SEQ == obj[i].UPPER_STEP_DETAIL_SEQ)
                    {
                        intRuleStepDetailOrder++;
                    }
                }
                obj[i].RULE_STEP_DETAIL_ORDER = intRuleStepDetailOrder.ToString();
            }
        }

        /// <summary>
        /// 取得資料集明細資料
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/29   1.00   Daniel Lee    Create
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject GetDataSetDetail(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleStepDetailObject objParameters = JsonConvert.DeserializeObject<ReRuleStepDetailObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得系統代碼資料
            IList<ReRuleStepDetailObject> objDataSet = RuleEngineDao.GetDataSetDetail(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objDataSet;

            return objDeliver;
        }

        /// <summary>
        /// 判斷規則是否有維護中的版本
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/11/05   1.00   Steven_Chen   Create 
        /// 2. 2014/11/10   1.01   Ben_Tsai      Modify Dao部份多傳入Log資訊物件
        /// </history>
        public DeliverObject IsHaveMaintainVersion(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將obj.Parameters轉成所需的格式
            ReRuleObject objParameters = JsonConvert.DeserializeObject<ReRuleObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //判斷規則是否有維護中的版本
            bool result = RuleEngineDao.IsHaveMaintainVersion(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = result;

            return objDeliver;
        }
    }
}
