using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LogHandler.DomainObject
{
    /// <summary>
    /// LOG類別
    /// </summary>
    public enum LogType
    {
        SYS,
        DB,
        ERROR
    }

    /// <summary>
    /// 定義LOG相關資訊
    /// </summary>
    public class LogInfoObject
    {
        /// <summary>
        /// 使用者ID
        /// </summary>
        public string UserID { get; set; }

        /// <summary>
        /// 使用者IP
        /// </summary>
        public string UserIP { get; set; }

        /// <summary>
        /// 目前功能列(麵包屑)
        /// </summary>
        public string FunctionList { get; set; }

        /// <summary>
        /// 目前Service的方法名稱
        /// </summary>
        public string ServiceMethodName { get; set; }

        /// <summary>
        /// 目前Service的方法名稱
        /// </summary>
        public string DaoMethodName { get; set; }

        /// <summary>
        /// 類別
        /// </summary>
        public LogType Type { get; set; }

        /// <summary>
        /// SQL語法
        /// </summary>
        public string SQL { get; set; }

        /// <summary>
        /// 錯誤訊息
        /// </summary>
        public string Exception { get; set; }

        /// <summary>
        /// BATCH名稱
        /// </summary>
        public string BatchName { get; set; }

        /// <summary>
        /// BATCH名稱
        /// </summary>
        public string BatchMethodName { get; set; }
    }
}
