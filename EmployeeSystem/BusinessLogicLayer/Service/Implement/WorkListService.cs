using System.Collections.Generic;
using System.Linq;
using BusinessLogicLayer.Service.Interface;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using DataAccessLayer.Dao.Interface;
using System.Xml;
using LogHandler.DomainObject;

namespace BusinessLogicLayer.Service.Implement
{
    public class WorkListService : BaseService, IWorkListService
    {
        private IWorkListDao WorkListDao { get; set; }
        private IWorkListForMobileDao WorkListForMobileDao { get; set; }
        private ICaseQueryDao CaseQueryDao { get; set; }

        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="pageNum">目前頁碼</param>
        /// <param name="pageSize">每頁筆數</param>
        /// <param name="userId">使用者代碼</param>
        /// <param name="sortObjectList">排序物件</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/02/24   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </histor>
        public KendoGridObject<WorkListObject> GetWorkList(int pageNum, int pageSize, string userId, List<KendoGridSortObject> sortObjectList)
        {
            KendoGridObject<WorkListObject> kendoGridWorkList = new KendoGridObject<WorkListObject>();

            //計算 開始/結束資料列編號
            int startRowNum = 0;
            int endRowNum = 0;

            startRowNum = (pageNum - 1) * pageSize + 1;
            endRowNum = pageNum * pageSize;

            //TODO: ben 未完成 需要改寫底層
            string sort = base.GenerateSortString(sortObjectList);

            IList<WorkListObject> workList = this.WorkListDao.GetWorkList(new LogInfoObject(), userId, sort);
            kendoGridWorkList.total = workList.Count;

            //依據當前頁面所需的筆數, 取得資料
            var dataList = from dataItem in workList
                           where dataItem.DATA_ID >= startRowNum
                               && dataItem.DATA_ID <= endRowNum
                           select dataItem;

            kendoGridWorkList.data = dataList.ToList();

            return kendoGridWorkList;
        }

        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="userId">使用者代碼</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/03/26   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </histor>
        public List<WorkListObject> GetWorkListForMobile(string userId)
        {
            return (List<WorkListObject>)this.WorkListForMobileDao.GetWorkListForMobile(new LogInfoObject(), userId);
        }

        /// <summary>
        /// 依據案件編號取得案件歷程
        /// </summary>
        /// <param name="caseSn">案件編號</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public List<CaseHistoryObject> GetCaseHistoryForMobile(string caseSn)
        {
            List<CaseHistoryObject> caseHistoryList = new List<CaseHistoryObject>();
            CaseHistoryObject objCaseHistory = new CaseHistoryObject();

            string flowInstanceId = this.WorkListForMobileDao.GetCaseFlowInstanceId(new LogInfoObject(), caseSn);

            OperationService.OperationServices opService = new OperationService.OperationServices();
            string strCaseHistory = opService.ManWKItemTrack("GSSWF20", flowInstanceId, false);

            XmlDocument xmlCaseHistory = new XmlDocument();
            xmlCaseHistory.LoadXml(strCaseHistory);

            //取出每筆資料的XML資訊
            XmlNodeList xmlNodeListCaseHistory = xmlCaseHistory.SelectNodes("/NewDataSet/DefaultDataTable");

            #region 將相對應的資料存入物件中

            foreach (XmlNode xmlNodeItem in xmlNodeListCaseHistory)
            {
                objCaseHistory = new CaseHistoryObject();

                objCaseHistory.WKITEM_NAME = xmlNodeItem["WKITEM_NAME"].InnerText.Trim();

                if (xmlNodeItem["PTCP_ACTN_STATE"].InnerText.Trim() == "0")
                {
                    objCaseHistory.PRO_NAME = xmlNodeItem["PTCP_NAME"].InnerText.Trim();

                    if (xmlNodeItem["ACTN_STATE"].InnerText.Trim() == "0")
                    {
                        objCaseHistory.CASE_TRNS_TYPE = string.Empty;
                    }
                    else
                    {
                        objCaseHistory.CASE_TRNS_TYPE = xmlNodeItem["PRO_STATE"].InnerText.Trim();
                    }
                }
                else
                {
                    objCaseHistory.PRO_NAME = xmlNodeItem["PTCP_PRO_NAME"].InnerText.Trim();
                    objCaseHistory.CASE_TRNS_TYPE = xmlNodeItem["PTCP_PRO_STATE"].InnerText.Trim();
                    objCaseHistory.PTCP_PRO_TIME = xmlNodeItem["PTCP_PRO_TIME"].InnerText.Trim();
                }

                //當前一關退回前手時, 顯示理由
                string strEXTEND1 = xmlNodeItem["EXTEND1"].InnerText.Trim();
                string strCaseOtherDesc = string.Empty;

                if (strEXTEND1.Length > 0) strEXTEND1 += "<BR>";

                switch (xmlNodeItem["PTCP_ACTN_STATE"].InnerText.Trim())
                {
                    case "8":
                    case "9":
                    case "12":

                        strCaseOtherDesc = strEXTEND1 + "退回前手理由: " + xmlNodeItem["PTCP_COMM"].InnerText.Trim();
                        break;

                    case "15":

                        strCaseOtherDesc = strEXTEND1 + "指定退件理由: " + xmlNodeItem["PTCP_COMM"].InnerText.Trim();
                        break;

                    default:

                        if (xmlNodeItem["PTCP_ACTN_STATE"].InnerText.Trim() == "7"
                            && xmlNodeItem["PRO_STATE"].InnerText.Trim() == "退回前手")
                        {
                            //特例!! 陪同作業的退回前手為呼叫Forward, PTCP_ACTN_STATE='7', 需額外以PRO_STATE判別
                            strCaseOtherDesc = strEXTEND1 + "退回前手理由: " + xmlNodeItem["PTCP_COMM"].InnerText.Trim();
                        }
                        else if (xmlNodeItem["PTCP_ACTN_STATE"].InnerText.Trim() == "13"
                            && xmlNodeItem["PRO_STATE"].InnerText.Trim() == "退回前手")
                        {
                            //特例!! 總行要求補件時, 授信初審的退回前手為呼叫ForJump, PTCP_ACTN_STATE='13', 需額外以PRO_STATE判別
                            strCaseOtherDesc = strEXTEND1 + "退回前手理由: " + xmlNodeItem["PTCP_COMM"].InnerText.Trim();
                        }
                        else if (xmlNodeItem["PTCP_ACTN_STATE"].InnerText.Trim() == "7"
                            && xmlNodeItem["PRO_STATE"].InnerText.Trim() == "撤件")
                        {
                            //EB委辦鑑價A110、A130關卡發動撤件
                            strCaseOtherDesc = strEXTEND1 + "撤件理由: " + xmlNodeItem["PTCP_COMM"].InnerText.Trim();
                        }
                        else
                        {
                            strCaseOtherDesc = xmlNodeItem["EXTEND1"].InnerText.Trim();
                        }

                        break;
                }

                objCaseHistory.CASE_OTHER_DESC = strCaseOtherDesc;
                objCaseHistory.OTHER_DESC = xmlNodeItem["EXTEND2"].InnerText.Trim();
                objCaseHistory.EXTEND2 = xmlNodeItem["EXTEND2"].InnerText.Trim();
                objCaseHistory.EXTEND3 = xmlNodeItem["EXTEND3"].InnerText.Trim();
                objCaseHistory.PTCP_RECV_TIME = xmlNodeItem["PTCP_RECV_TIME"].InnerText.Trim();

                caseHistoryList.Add(objCaseHistory);
            }

            #endregion

            //過濾掉不需要的資料, 並且做排序
            var dataList = from dataItem in caseHistoryList
                                orderby dataItem.EXTEND2 descending, dataItem.PTCP_RECV_TIME descending
                                select dataItem;

            caseHistoryList = dataList.ToList();

            return caseHistoryList;
        }

        /// <summary>
        /// 案件查詢
        /// </summary>
        /// <param name="startDT">開始日期</param>
        /// <param name="endDT">結束日期</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/15   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public List<CaseQueryObject> GetCaseQuery(string startDT, string endDT)
        {
            return (List<CaseQueryObject>)this.CaseQueryDao.GetCaseQuery(new LogInfoObject(), startDT, endDT);
        }

    }
}
