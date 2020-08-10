using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReDataSetPartyAttribute : BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_DATASET_PARTY_ATTRIBUTE"; } }

        /// <summary>
        /// 資料集編號
        /// </summary>
        [JsonProperty(propertyName: "DATASET_ID")]
        public string DATASET_ID { get; set; }

        /// <summary>
        /// 對象代碼
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
        /// 變數種類-S:系統,U:自訂
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_KIND")]
        public string ATTRIBUTE_KIND { get; set; }

        /// <summary>
        /// 傳入傳出設定-I:傳入,O:傳出,IO:傳入傳出
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_IO_KIND")]
        public string ATTRIBUTE_IO_KIND { get; set; }

        /// <summary>
        /// 層次-M:主要,S:次層
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_LEVEL")]
        public string ATTRIBUTE_LEVEL { get; set; }

        /// <summary>
        /// 上層屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "UPPER_ATTRIBUTE_ID")]
        public string UPPER_ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 資料型態-List/Number/Enum
        /// </summary>
        [JsonProperty(propertyName: "DATA_TYPE")]
        public string DATA_TYPE { get; set; }

        /// <summary>
        /// 比較基準代碼種類
        /// </summary>
        [JsonProperty(propertyName: "BASE_CODE_KIND")]
        public string BASE_CODE_KIND { get; set; }

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
        /// 清單-是否允許複選-Y/N
        /// </summary>
        [JsonProperty(propertyName: "ALLOW_MULTIPLE")]
        public string ALLOW_MULTIPLE { get; set; }

        /// <summary>
        /// 數字-最大值
        /// </summary>
        [JsonProperty(propertyName: "MAX_VALUE")]
        public string MAX_VALUE { get; set; }

        /// <summary>
        /// 數字-最小值
        /// </summary>
        [JsonProperty(propertyName: "MIN_VALUE")]
        public string MIN_VALUE { get; set; }

        /// <summary>
        /// 後置文字
        /// </summary>
        [JsonProperty(propertyName: "SUFFIX")]
        public string SUFFIX { get; set; }

        /// <summary>
        /// 單位代碼
        /// </summary>
        [JsonProperty(propertyName: "UNIT_CODE_KIND")]
        public string UNIT_CODE_KIND { get; set; }

        /// <summary>
        /// 是否允許範圍設定
        /// </summary>
        [JsonProperty(propertyName: "ALLOW_RANGE")]
        public string ALLOW_RANGE { get; set; }
        #endregion
    }
    
    public class ReDataSetPartyAttribute_Query : BaseDomainObject
    {
        #region Properties

        /// <summary>
        /// 資料型態-List/Number/Enum
        /// </summary>
        [JsonProperty(propertyName: "DATA_TYPE")]
        public string DATA_TYPE { get; set; }

        /// <summary>
        /// 資料型態模式
        /// </summary>
        [JsonProperty(propertyName: "DATA_TYPE_MODE")]
        public string DATA_TYPE_MODE { get; set; }

        /// <summary>
        /// 層次-M:主要,S:次層
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_LEVEL")]
        public string ATTRIBUTE_LEVEL { get; set; }

        /// <summary>
        /// 傳入傳出設定-I:傳入,O:傳出,IO:傳入傳出
        /// </summary>
        [JsonProperty(propertyName: "ATTRIBUTE_IO_KIND")]
        public string[] ATTRIBUTE_IO_KIND { get; set; }

        /// <summary>
        /// 上層屬性代碼
        /// </summary>
        [JsonProperty(propertyName: "UPPER_ATTRIBUTE_ID")]
        public string UPPER_ATTRIBUTE_ID { get; set; }

        /// <summary>
        /// 對象代碼
        /// </summary>
        [JsonProperty(propertyName: "PARTY_ID")]
        public string PARTY_ID { get; set; }
        #endregion
    }
}
