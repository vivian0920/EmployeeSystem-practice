using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Interface
{
    public interface IWorkListForMobileDao
    {
        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="userId">使用者代碼</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        IList<WorkListObject> GetWorkListForMobile(LogInfoObject objLogInfo, string userId);

        /// <summary>
        /// 取得案件的流程編號
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="caseSn">案件編號</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        string GetCaseFlowInstanceId(LogInfoObject objLogInfo, string caseSn);
    }
}
