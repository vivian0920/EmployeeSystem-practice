using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using DomainObject.DomainObject.TableDomainObject;

namespace DomainObject.DomainObject.DefinedDomainObject
{
    /// <summary>
    /// 規則列表
    /// </summary>
    public class RuleEngineObject_RuleList : BaseDomainObject
    {
        #region Properties     
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
        /// 狀態
        /// </summary>
        [JsonProperty(propertyName: "STATUS_NAME")]
        public string STATUS_NAME { get; set; }

        /// <summary>
        /// 資料集
        /// </summary>
        [JsonProperty(propertyName: "DATASET_NAME")]
        public string DATASET_NAME { get; set; }

        /// <summary>
        /// 狀態ID
        /// </summary>
        [JsonProperty(propertyName: "STATUS_ID")]
        public string STATUS_ID { get; set; }

        /// <summary>
        /// 有效期間
        /// </summary>
        [JsonProperty(propertyName: "EFFECTIVE_DATE")]
        public string EFFECTIVE_DATE { get; set; }

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
        /// Grid_Key
        /// </summary>
        [JsonProperty(propertyName: "MAIN_KEY")]
        public string MAIN_KEY { get; set; }
        #endregion        
    }

    /// <summary>
    /// 規則查詢
    /// </summary>
    public class RuleEngineObject_RuleQuery : BaseDomainObject
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
        public string[] STATUS { get; set; }

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
        public string[] DATASET_ID { get; set; }
        #endregion
    }

    /// <summary>
    /// 規則明細
    /// </summary>
    public class RuleEngineObject_RuleStep : BaseDomainObject
    {
        #region Properties
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
        /// 規則步驟序號
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_SEQ")]
        public string RULE_STEP_SEQ { get; set; }

        /// <summary>
        /// 規則種類-CODE_KIND=RE002
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_KIND")]
        public string RULE_STEP_KIND { get; set; }

        /// <summary>
        /// 規則步驟名稱
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_NAME")]
        public string RULE_STEP_NAME { get; set; }
        #endregion
    }

    
    /// <summary>
    /// 規則ActionSet物件
    /// </summary>
    public class RuleEngineObject_ActionSet : BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 對象代碼-Case/Borrower/Guarantor/Spouse/CollOwner/Group/Related
        /// </summary>
        [JsonProperty(propertyName: "PARTY_ID")]
        public string PARTY_ID { get; set; }

        /// <summary>
        /// 屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_ID")]
        public string ATTRIBUTE_ID { get; set; }


        /// <summary>
        /// 屬性名稱
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_NAME")]
        public string ATTRIBUTE_NAME { get; set; }

        /// <summary>
        /// 運算子代碼種類
        /// </summary>
        [JsonProperty(propertyName: "OPERATOR_CODE_KIND")]
        public string OPERATOR_CODE_KIND { get; set; }

        /// <summary>
        /// 清單-清單代碼種類-List-CODE_KINDTextBox/NumericTextBox-DATA_MODE
        /// </summary>
        [JsonProperty(propertyName: "VALUE_KIND")]
        public string VALUE_KIND { get; set; }

        /// <summary>
        /// 資料類型
        /// </summary>
        [JsonProperty(propertyName: "DATA_TYPE")]
        public string DATA_TYPE { get; set; }
        #endregion
    }

    /// <summary>
    /// 規則ActionSetEnumFunction物件
    /// </summary>
    public class RuleEngineObject_ActionSetEnumFunction : BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 代碼種類
        /// </summary>
        [JsonProperty(propertyName: "CODE_KIND")]
        public string CODE_KIND { get; set; }

        /// <summary>
        /// 代碼
        /// </summary>
        [JsonProperty(propertyName: "CODE_ID")]
        public string CODE_ID { get; set; }

        /// <summary>
        /// 代碼名稱
        /// </summary>
        [JsonProperty(propertyName: "CODE_NAME")]
        public string CODE_NAME { get; set; }

        /// <summary>
        /// 順序
        /// </summary>
        [JsonProperty(propertyName: "SORT_ORDER")]
        public int? SORT_ORDER { get; set; }

        /// <summary>
        /// 資料類型
        /// </summary>
        [JsonProperty(propertyName: "DATA_TYPE")]
        public string DATA_TYPE { get; set; }

        /// <summary>
        /// 屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_ID")]
        public string ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 清單-清單代碼種類-List-CODE_KINDTextBox/NumericTextBox-DATA_MODE
        /// </summary>
        [JsonProperty(propertyName: "VALUE_KIND")]
        public string VALUE_KIND { get; set; }

        /// <summary>
        /// 比較基準代碼種類
        /// </summary>
        [JsonProperty(propertyName: "BASE_CODE_KIND")]
        public string BASE_CODE_KIND { get; set; }

        /// <summary>
        /// 單位代碼
        /// </summary>
        [JsonProperty(propertyName: "UNIT_CODE_KIND")]
        public string UNIT_CODE_KIND { get; set; }

        /// <summary>
        /// 上層屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "UPPER_ATTRIBUTE_ID")]
        public string UPPER_ATTRIBUTE_ID { get; set; }
        #endregion
    }
    
    /// <summary>
    /// 規則ReRuleStepDetail物件
    /// </summary>
    public class RuleEngineObject_ReRuleStepDetail : BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 代碼種類
        /// </summary>
        [JsonProperty(propertyName: "RE_RILE_STEP")]
        public ReRuleStepObject RE_RILE_STEP { get; set; }

        /// <summary>
        /// 代碼
        /// </summary>
        [JsonProperty(propertyName: "RE_RILE_STEP_DETAIL")]
        public ReRuleStepDetailObject[] RE_RILE_STEP_DETAIL { get; set; }
        #endregion

    }
}
