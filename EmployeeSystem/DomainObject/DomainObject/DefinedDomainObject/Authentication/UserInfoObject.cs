using System.Collections.Generic;
using Newtonsoft.Json;

namespace DomainObject.DomainObject
{
    public class UserInfoObject
    {
        /// <summary>
        /// Session 代碼
        /// </summary>
        [JsonProperty("SessionId")]
        public string SessionId { get; set; }

        /// <summary>
        /// 使用者公司ID
        /// </summary>
        [JsonProperty("UserCompId")]
        public string UserCompId { get; set; }

        /// <summary>
        /// 使用者ID
        /// </summary>
        [JsonProperty("UserId")]
        public string UserId { get; set; }

        /// <summary>
        /// 使用者名稱
        /// </summary>
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        /// <summary>
        /// 代理人公司ID
        /// </summary>
        [JsonProperty("AgentUserCompId")]
        public string AgentUserCompId { get; set; }

        /// <summary>
        /// 代理人ID
        /// </summary>
        [JsonProperty("AgentUserId")]
        public string AgentUserId { get; set; }

        /// <summary>
        /// 代理人名稱
        /// </summary>
        [JsonProperty("AgentUserName")]
        public string AgentUserName { get; set; }

        /// <summary>
        /// 帳號所擁有的角色權限
        /// </summary>
        [JsonProperty("AllRole")]
        public List<RoleInfoObject> AllRole { get; set; }

        /// <summary>
        /// 使用者所屬組織
        /// </summary>
        [JsonProperty("UserOrganization")]
        public OrganizationInfoObject UserOrganization { get; set; }

        /// <summary>
        /// Client端IP
        /// </summary>
        [JsonProperty("ClientIP")]
        public string ClientIP { get; set; }
    }
}
