using System.Collections.Generic;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface IWorkListService
    {
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
        /// </histor>
        KendoGridObject<WorkListObject> GetWorkList(int pageNum, int pageSize, string userId, List<KendoGridSortObject> sortObjectList);

        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="userId">使用者代碼</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/03/26   1.00   Ben_Tsai   Create
        /// </histor>
        List<WorkListObject> GetWorkListForMobile(string userId);

        /// <summary>
        /// 依據案件編號取得案件歷程
        /// </summary>
        /// <param name="caseSn">案件編號</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai Create
        /// </history>
        List<CaseHistoryObject> GetCaseHistoryForMobile(string caseSn);

        /// <summary>
        /// 案件查詢
        /// </summary>
        /// <param name="startDT">開始日期</param>
        /// <param name="endDT">結束日期</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/15   1.00   Ben_Tsai   Create
        /// </history>
        List<CaseQueryObject> GetCaseQuery(string startDT, string endDT);
    }
}
