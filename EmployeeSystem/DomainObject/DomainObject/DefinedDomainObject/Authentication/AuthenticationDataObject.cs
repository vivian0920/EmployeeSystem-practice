using System.Collections.Generic;
using Newtonsoft.Json;

namespace DomainObject.DomainObject
{
    public class AuthenticationDataObject: DeliverObject
    {       
        /// <summary>
        /// Token
        /// </summary>
        [JsonProperty("Token")]
        public string Token { get; set; }
        
        /// <summary>
        /// 使用者資訊
        /// </summary>
        [JsonProperty("UserInfo")]
        public UserInfoObject UserInfo { get; set; }

        /// <summary>
        /// Client端IP
        /// </summary>
        [JsonProperty("ClientIP")]
        public string ClientIP { get; set; }
    }
}
