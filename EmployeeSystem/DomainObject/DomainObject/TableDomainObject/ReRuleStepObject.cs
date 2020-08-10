using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReRuleStepObject:BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_RULE_STEP"; } }

        /// <summary>
        /// 規則步驟序號
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_SEQ")]
        public string RULE_STEP_SEQ { get; set; }

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
        /// 規則步驟順序
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_ORDER")]
        public string RULE_STEP_ORDER { get; set; }

        /// <summary>
        /// 規則步驟名稱
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_NAME")]
        public string RULE_STEP_NAME { get; set; }

        /// <summary>
        /// 規則種類-CODE_KIND=RE002
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_KIND")]
        public string RULE_STEP_KIND { get; set; }

        #endregion
    }
}
