using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReDataSetObject:BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_DATASET"; } }

        /// <summary>
        /// 資料集編號
        /// </summary>
        [JsonProperty(propertyName: "DATASET_ID")]
        public string DATASET_ID { get; set; }

        /// <summary>
        /// 資料集名稱
        /// </summary>
        [JsonProperty(propertyName: "DATASET_NAME")]
        public string DATASET_NAME { get; set; }

        /// <summary>
        /// 狀態
        /// </summary>
        [JsonProperty(propertyName: "STATUS")]
        public string STATUS { get; set; }
        #endregion
    }
}
