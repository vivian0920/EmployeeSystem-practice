using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class CaseHistoryObject
    {
        #region Properties

        /// <summary>
        /// 資料序號
        /// </summary>
        [JsonProperty(propertyName: "DATA_ID")]
        public int? DATA_ID { get; set; }

        /// <summary>
        /// 作業階段
        /// </summary>
        [JsonProperty(propertyName: "WKITEM_NAME")]
        public string WKITEM_NAME { get; set; }

        /// <summary>
        /// 經手人員
        /// </summary>
        [JsonProperty(propertyName: "PRO_NAME")]
        public string PRO_NAME { get; set; }

        /// <summary>
        /// 案件處理方式
        /// </summary>
        [JsonProperty(propertyName: "CASE_TRNS_TYPE")]
        public string CASE_TRNS_TYPE { get; set; }

        /// <summary>
        /// 處理日期
        /// </summary>
        [JsonProperty(propertyName: "PTCP_PRO_TIME")]
        public string PTCP_PRO_TIME { get; set; }

        /// <summary>
        /// 案件補充說明
        /// </summary>
        [JsonProperty(propertyName: "CASE_OTHER_DESC")]
        public string CASE_OTHER_DESC { get; set; }

        /// <summary>
        /// 補件說明
        /// </summary>
        [JsonProperty(propertyName: "OTHER_DESC")]
        public string OTHER_DESC { get; set; }

        /// <summary>
        /// 補件說明2
        /// </summary>
        [JsonProperty(propertyName: "EXTEND2")]
        public string EXTEND2 { get; set; }

        /// <summary>
        /// 補件說明3
        /// </summary>
        [JsonProperty(propertyName: "EXTEND3")]
        public string EXTEND3 { get; set; }

        /// <summary>
        /// 收到日期
        /// </summary>
        [JsonProperty(propertyName: "PTCP_RECV_TIME")]
        public string PTCP_RECV_TIME { get; set; }

        #endregion
    }
}
