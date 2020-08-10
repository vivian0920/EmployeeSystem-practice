
namespace DomainObject.DomainObject.TableDomainObject
{
    public class FuncMenuObject
    {
        #region Properties

        /// <summary>
        /// 功能代碼
        /// </summary>
        public string FUN_ID { get; set; }

        /// <summary>
        /// 功能名稱
        /// </summary>
        public string FUN_NAME { get; set; }

        /// <summary>
        /// 功能路徑 
        /// </summary>
        public string PRG_PATH { get; set; }

        /// <summary>
        /// 上層功能代碼
        /// </summary>
        public string PARENT_FUN_ID { get; set; }

        /// <summary>
        /// 排序編號
        /// </summary>
        public string SORT_ORDER { get; set; }

        #endregion
    }
}
