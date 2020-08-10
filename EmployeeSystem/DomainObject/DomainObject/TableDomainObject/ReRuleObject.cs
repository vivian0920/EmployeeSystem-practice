using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReRuleObject:BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_RULE"; } }

        /// <summary>
        /// 規則編號
        /// </summary>
        [JsonProperty(propertyName: "RULE_ID")]
        public string RULE_ID { get; set; }

        /// <summary>
        /// 規則版本
        /// </summary>
        [JsonProperty(propertyName: "RULE_VERSION")]
        public string RULE_VERSION { get; set; }

        /// <summary>
        /// 規則名稱
        /// </summary>
        [JsonProperty(propertyName: "RULE_NAME")]
        public string RULE_NAME { get; set; }

        /// <summary>
        /// 規則說明
        /// </summary>
        [JsonProperty(propertyName: "RULE_DESCRIPTION")]
        public string RULE_DESCRIPTION { get; set; }

        /// <summary>
        /// 狀態
        /// </summary>
        [JsonProperty(propertyName: "STATUS")]
        public string STATUS { get; set; }

        /// <summary>
        /// 生效日期
        /// </summary>
        [JsonProperty(propertyName: "START_DATE")]
        public string START_DATE { get; set; }

        /// <summary>
        /// 失效日期
        /// </summary>
        [JsonProperty(propertyName: "END_DATE")]
        public string END_DATE { get; set; }

        /// <summary>
        /// 資料集
        /// </summary>
        [JsonProperty(propertyName: "DATASET_ID")]
        public string DATASET_ID { get; set; }
        #endregion
    }
}
