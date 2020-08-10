using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Interface
{
    public interface ISystemDao
    {
        /// <summary>
        /// 取得系統代碼
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/09/12  Steven_Chen   Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </histor>
        IList<ReCodeObject> GetSystemCode(LogInfoObject objLogInfo, ReCodeObject obj);

        /// <summary>
        /// 取得系統代碼(Array)
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/10/16  Daniel Lee   Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </histor>
        IList<ReCodeObject> GetSystemCodeByList(LogInfoObject objLogInfo, ReCodeQueryObject obj);
    }
}
