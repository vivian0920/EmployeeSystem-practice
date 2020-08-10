using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainObject.DomainObject.DefinedDomainObject
{
    /// <summary>
    /// 定義LOG相關資訊
    /// </summary>
    public class LogInfoObject
    {
        /// <summary>
        /// 使用者名稱
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 目前Service的方法名稱
        /// </summary>
        public string ServiceMethodName { get; set; }

        /// <summary>
        /// 目前功能列(麵包屑)
        /// </summary>
        public string FunctionList { get; set; }

        /// <summary>
        /// 目前Service的方法名稱
        /// </summary>
        public string DaoMethodName { get; set; }
    }
}
