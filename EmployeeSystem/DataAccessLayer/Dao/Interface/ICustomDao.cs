using System.Collections.Generic;
using DomainObject.DomainObject.DefinedDomainObject;
using LogHandler.DomainObject;


namespace DataAccessLayer.Dao.Interface
{
    public interface ICustomDao
    {
        /// <summary>
        /// 取得員工資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <histor>
        /// 2015/01/20   Daniel Lee   Create
        /// </histor>
        IList<CustomObject> GetCustomer(LogInfoObject objLogInfo, IList<CustomObject> obj);

        /// <summary>
        /// 用ID取得員工資料
        /// </summary>
        /// <param name="objLogInfo"></param>
        /// <param name="idList"></param>
        /// <returns></returns>
        IList<CustomObject> GetCustomerById(LogInfoObject objLogInfo, List<string> idList);

        bool InsertCustomer(LogInfoObject objLogInfo, IList<CustomObject> obj);


        bool DeleteCustomer(LogInfoObject objLogInfo, CustomObject obj);
    }
}
