using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReRuleStepDetailObject:BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_RULE_STEP_DETAIL"; } }

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
        /// 規則步驟區塊序號
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_DETAIL_SEQ")]
        public string RULE_STEP_DETAIL_SEQ { get; set; }

        /// <summary>
        /// 規則步驟明細序號
        /// </summary>
        [JsonProperty(propertyName: "RULE_STEP_DETAIL_ORDER")]
        public string RULE_STEP_DETAIL_ORDER { get; set; }

        /// <summary>
        /// 順序
        /// </summary>
        [JsonProperty(propertyName: "UPPER_STEP_DETAIL_SEQ")]
        public string UPPER_STEP_DETAIL_SEQ { get; set; }

        /// <summary>
        /// 上層規則步驟序號
        /// </summary>
        [JsonProperty(propertyName: "STEP_DETAIL_LEVEL")]
        public string STEP_DETAIL_LEVEL { get; set; }

        /// <summary>
        /// 步驟明細名稱
        /// </summary>
        [JsonProperty(propertyName: "STEP_DETAIL_NAME")]
        public string STEP_DETAIL_NAME { get; set; }

        /// <summary>
        /// 步驟明細類型
        /// </summary>
        [JsonProperty(propertyName: "STEP_DETAIL_KIND")]
        public string STEP_DETAIL_KIND { get; set; }

        /// <summary>
        /// 條件類型-CODE_KIND=RE062單筆規則/集合規則/函數規則
        /// </summary>
        [JsonProperty(propertyName: "CONDITION_KIND")]
        public string CONDITION_KIND { get; set; }

        /// <summary>
        /// 條件-COND時使用CODE_KIND=RE050
        /// </summary>
        [JsonProperty(propertyName: "CONDITION")]
        public string CONDITION { get; set; }

        /// <summary>
        /// 行動種類-ACTION時使用CODE_KIND=RE065Do/Set
        /// </summary>
        [JsonProperty(propertyName: "ACTION_TYPE")]
        public string ACTION_TYPE { get; set; }

        /// <summary>
        /// 對象代碼
        /// </summary>
        [JsonProperty(propertyName: "PARTY_ID")]
        public string PARTY_ID { get; set; }

        /// <summary>
        /// 集合屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "UPPER_ATTRIBUTE_ID")]
        public string UPPER_ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_ID")]
        public string ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 間距類型
        /// </summary>
        [JsonProperty(propertyName: "BASE_DIFF_KIND")]
        public string BASE_DIFF_KIND { get; set; }

        /// <summary>
        /// 比較基準
        /// </summary>
        [JsonProperty(propertyName: "BASE_VALUE")]
        public string BASE_VALUE { get; set; }

        /// <summary>
        /// 函數/運算
        /// </summary>
        [JsonProperty(propertyName: "FUNCTION")]
        public string FUNCTION { get; set; }

        /// <summary>
        /// 函數/運算名稱
        /// </summary>
        [JsonProperty(propertyName: "FUNCTION_NAME")]
        public string FUNCTION_NAME { get; set; }

        /// <summary>
        /// 運算子-ParentCodeId IN (S,R)
        /// </summary>
        [JsonProperty(propertyName: "OPERATOR")]
        public string OPERATOR { get; set; }

        /// <summary>
        /// 設定值類型-CODE_KIND=RE067
        /// </summary>
        [JsonProperty(propertyName: "SET_KIND")]
        public string SET_KIND { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        [JsonProperty(propertyName: "VALUE")]
        public string VALUE { get; set; }

        /// <summary>
        /// 設定值類型-區間-CODE_KIND=RE067
        /// </summary>
        [JsonProperty(propertyName: "SET_KIND_RANGE")]
        public string SET_KIND_RANGE { get; set; }

        /// <summary>
        /// 值-區間-區間時使用
        /// </summary>
        [JsonProperty(propertyName: "VALUE_RANGE")]
        public string VALUE_RANGE { get; set; }

        /// <summary>
        /// 比較單位
        /// </summary>
        [JsonProperty(propertyName: "BASE_UNIT")]
        public string BASE_UNIT { get; set; }

        /// <summary>
        /// 設定-對象代碼-ACTION時使用
        /// </summary>
        [JsonProperty(propertyName: "VALUE_PARTY_ID")]
        public string VALUE_PARTY_ID { get; set; }

        /// <summary>
        /// 設定-上層屬性代碼-ACTION時使用
        /// </summary>
        [JsonProperty(propertyName: "VALUE_UPPER_ATTRIBUTE_ID")]
        public string VALUE_UPPER_ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 設定-屬性代碼-ACTION時使用
        /// </summary>
        [JsonProperty(propertyName: "VALUE_ATTRIBUTE_ID")]
        public string VALUE_ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 設定-對象代碼-區間-ACTION時使用
        /// </summary>
        [JsonProperty(propertyName: "VALUE_PARTY_ID_RANGE")]
        public string VALUE_PARTY_ID_RANGE { get; set; }

        /// <summary>
        /// 設定-上層屬性代碼-區間-ACTION時使用(暫無使用)
        /// </summary>
        [JsonProperty(propertyName: "VALUE_UPPER_ATTRIBUTE_ID_RANGE")]
        public string VALUE_UPPER_ATTRIBUTE_ID_RANGE { get; set; }

        /// <summary>
        /// 設定-屬性代碼-區間-ACTION時使用
        /// </summary>
        [JsonProperty(propertyName: "VALUE_ATTRIBUTE_ID_RANGE")]
        public string VALUE_ATTRIBUTE_ID_RANGE { get; set; }

        /// <summary>
        /// 設定-函數/運算-區間
        /// </summary>
        [JsonProperty(propertyName: "VALUE_FUNCTION_RANGE")]
        public string VALUE_FUNCTION_RANGE { get; set; }

        /// <summary>
        /// 設定-函數/運算
        /// </summary>
        [JsonProperty(propertyName: "VALUE_FUNCTION")]
        public string VALUE_FUNCTION { get; set; }

        #endregion
    }
}
