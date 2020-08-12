using System.Collections.Generic;
using DomainObject.DomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface ICustomService
    {
        /// <summary>
        /// 取得Customer
        /// </summary>
        /// <param name="strParameters">參數</param>
        /// <returns></returns>
        /// <history>
        /// 2015/01/20  Daniel Lee   Create
        /// </history>
        DeliverObject GetCustomer(ReceiveObject objParameters);

        DeliverObject InsertCustomer(ReceiveObject objParameters);

        DeliverObject DeleteCustomer(ReceiveObject obj);
    }
}
