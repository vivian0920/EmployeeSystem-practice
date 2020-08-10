using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Interface
{
    public interface ICaseQueryDao
    {
        /// <summary>
        /// 案件查詢
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="startDT">開始日期</param>
        /// <param name="endDT">結束日期</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/15   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        IList<CaseQueryObject> GetCaseQuery(LogInfoObject objLogInfo, string startDT, string endDT);
    }
}
