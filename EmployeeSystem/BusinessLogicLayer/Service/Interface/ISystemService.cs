using System.Collections.Generic;
using DomainObject.DomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface ISystemService
    {
        /// <summary>
        /// 取得系統代碼
        /// </summary>
        /// <param name="strParameters">參數</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/12  Steven_Chen Create
        /// </history>
        DeliverObject GetSystemCode(ReceiveObject objParameters);

        /// <summary>
        /// 取得系統代碼(Array)
        /// </summary>
        /// <param name="strParameters">參數</param>
        /// <returns></returns>
        /// <histor>
        /// 2014/10/16   Daniel Lee   Create
        /// </history>
        DeliverObject GetSystemCodeByList(ReceiveObject objParameters);
    }
}
