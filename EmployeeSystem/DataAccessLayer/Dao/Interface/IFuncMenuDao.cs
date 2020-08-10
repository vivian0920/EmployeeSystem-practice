using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Interface
{
    public interface IFuncMenuDao
    {
        /// <summary>
        /// 依據使用者代碼取得其功能列
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="userId">使用者代碼</param>
        /// <param name="apId">系統代碼</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/02/21   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        IList<FuncMenuObject> GetFuncMenu(LogInfoObject objLogInfo, string userId, string apId);
    }
}
