using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject
{
    public class DeliverObject
    {
        /// <summary>
        /// 驗證結果訊息
        /// </summary>
        [JsonProperty(propertyName: "AuthenticationMessage")]
        public string AuthenticationMessage { get; set; }

        /// <summary>
        /// 驗證狀態
        /// </summary>
        [JsonProperty(propertyName: "AuthenticationStatus")]
        public string AuthenticationStatus { get; set; }

        /// <summary>
        /// 資料總筆數(For GridView使用)
        /// </summary>
        [JsonProperty(propertyName: "TotalCount")]
        public int TotalCount { get; set; }

        /// <summary>
        /// 回傳資料物件
        /// </summary>
        [JsonProperty(propertyName:"Data")]
        public object Data { get; set; }
    }
}
