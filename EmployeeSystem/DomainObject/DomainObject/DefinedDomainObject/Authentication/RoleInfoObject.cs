using Newtonsoft.Json;

namespace DomainObject.DomainObject
{
    public class RoleInfoObject
    {
        /// <summary>
        /// 角色代碼
        /// </summary>
        [JsonProperty("ROL_ID")]
        public string ROL_ID { get; set; }

        /// <summary>
        /// 角色Domain代碼
        /// </summary>
        [JsonProperty("ROL_DOMAIN_ID")]
        public string ROL_DOMAIN_ID { get; set; }

        /// <summary>
        /// 角色組織代碼
        /// </summary>
        [JsonProperty("ROL_COMP_ID")]
        public string ROL_COMP_ID { get; set; }

        /// <summary>
        /// 角色名稱
        /// </summary>
        [JsonProperty("ROL_NAME")]
        public string ROL_NAME { get; set; }

        /// <summary>
        /// 角色型別
        /// </summary>
        [JsonProperty("ROL_TYPE")]
        public string ROL_TYPE { get; set; }

        /// <summary>
        /// 角色類別
        /// </summary>
        [JsonProperty("ROL_KIND")]
        public string ROL_KIND { get; set; }

        /// <summary>
        /// 角色註釋
        /// </summary>
        [JsonProperty("ROL_DESC")]
        public string ROL_DESC { get; set; }

        /// <summary>
        /// 角色排序碼
        /// </summary>
        [JsonProperty("ROL_SORT_ORDER")]
        public string ROL_SORT_ORDER { get; set; }
    }
}
