using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReCodeObject:BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName:"TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_CODE"; } }

        /// <summary>
        /// 代碼種類
        /// </summary>
        [JsonProperty(propertyName:"CODE_KIND")]
        public string CODE_KIND { get; set; }

        /// <summary>
        /// 代碼
        /// </summary>
        [JsonProperty(propertyName:"CODE_ID")]
        public string CODE_ID { get; set; }

        /// <summary>
        /// 代碼名稱
        /// </summary>
        [JsonProperty(propertyName:"CODE_NAME")]
        public string CODE_NAME { get; set; }

        /// <summary>
        /// 上層代碼
        /// </summary>
        [JsonProperty(propertyName:"PARENT_CODE_ID")]
        public string PARENT_CODE_ID { get; set; }

        /// <summary>
        /// 註記
        /// </summary>
        [JsonProperty(propertyName:"MEMO")]
        public string MEMO { get; set; }

        /// <summary>
        /// 刪除狀態
        /// </summary>
        [JsonProperty(propertyName:"DELETE_FLAG")]
        public string DELETE_FLAG { get; set; }

        /// <summary>
        /// 順序
        /// </summary>
        [JsonProperty(propertyName:"SORT_ORDER")]
        public int? SORT_ORDER { get; set; }

        #endregion
    }
    public class ReCodeQueryObject : BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_CODE"; } }

        /// <summary>
        /// 代碼種類
        /// </summary>
        [JsonProperty(propertyName: "CODE_KIND")]
        public string CODE_KIND { get; set; }

        /// <summary>
        /// 上層代碼
        /// </summary>
        [JsonProperty(propertyName: "PARENT_CODE_ID")]
        public string[] PARENT_CODE_ID { get; set; }

        #endregion
    }
}
