using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Interface
{
    public interface IWorkListDao
    {
        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="userId">使用者代碼</param>
        /// <param name="sort">排序字串</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        IList<WorkListObject> GetWorkList(LogInfoObject objLogInfo, string userId, string sort);
    }
}
