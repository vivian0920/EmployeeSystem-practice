using System.Collections.Generic;
using DomainObject.DomainObject.DefinedDomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface IFuncMenuService
    {
        /// <summary>
        /// 依據使用者代碼取得其功能列
        /// </summary>
        /// <param name="userId">使用者代碼</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/02/21   1.00   Ben_Tsai   Create
        /// </histor>
        List<KendoPanelBarObject> GetFuncMenu(string userId);

    }
}
