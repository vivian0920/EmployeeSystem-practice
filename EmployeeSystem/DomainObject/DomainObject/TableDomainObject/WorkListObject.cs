using System;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class WorkListObject
    {
        #region Properties

        /// <summary>
        /// 資料序號
        /// </summary>
        [JsonProperty(propertyName: "DATA_ID")]
        public int? DATA_ID { get; set; }

        /// <summary>
        /// 類型
        /// </summary>
        [JsonProperty(propertyName: "APPLY_FLAG")]
        public string APPLY_FLAG { get; set; }

        /// <summary>
        /// 作業流程
        /// </summary>
        [JsonProperty(propertyName: "FLOW_NM")]
        public string FLOW_NM { get; set; }

        /// <summary>
        /// 待辦作業名稱 
        /// </summary>
        [JsonProperty(propertyName: "STEP_NM")]
        public string STEP_NM { get; set; }

        /// <summary>
        /// 申請單位
        /// </summary>
        [JsonProperty(propertyName: "BRCH_NM")]
        public string BRCH_NM { get; set; }

        /// <summary>
        /// AO人員
        /// </summary>
        [JsonProperty(propertyName: "AO_NM")]
        public string AO_NM { get; set; }

        /// <summary>
        /// 案件編號
        /// </summary>
        [JsonProperty(propertyName: "CASE_SN")]
        public string CASE_SN { get; set; }

        /// <summary>
        /// 借款人姓名
        /// </summary>
        [JsonProperty(propertyName: "CUST_NM")]
        public string CUST_NM { get; set; }

        /// <summary>
        /// 案由
        /// </summary>
        [JsonProperty(propertyName: "CASE_KND")]
        public string CASE_KND { get; set; }

        /// <summary>
        /// 申請金額(單位：千元)
        /// </summary>
        [JsonProperty(propertyName: "APPLY_AMT")]
        public string APPLY_AMT { get; set; }

        /// <summary>
        /// 前承辦人員
        /// </summary>
        [JsonProperty(propertyName: "PREV_TAKER_NM")]
        public string PREV_TAKER_NM { get; set; }

        /// <summary>
        /// 送達時間
        /// </summary>
        [JsonProperty(propertyName: "RECV_DT")]
        public DateTime? RECV_DT { get; set; }

        /// <summary>
        /// 使用者代碼
        /// </summary>
        [JsonProperty(propertyName: "USER_ID")]
        public string USER_ID { get; set; }

        /// <summary>
        /// 授權層級
        /// </summary>
        [JsonProperty(propertyName: "APRV_LEVEL_NM")]
        public string APRV_LEVEL_NM { get; set; }

        /// <summary>
        /// 申請時間
        /// </summary>
        [JsonProperty(propertyName: "APPLY_DT")]
        public DateTime? APPLY_DT { get; set; }

        #endregion
    }
}
