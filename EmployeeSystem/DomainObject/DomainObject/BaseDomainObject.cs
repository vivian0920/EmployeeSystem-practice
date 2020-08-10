using Newtonsoft.Json;
using System;

namespace DomainObject.DomainObject
{
    public class BaseDomainObject
    {       
        /// <summary>
        /// 新增人員
        /// </summary>
        [JsonProperty(propertyName:"CREATE_USER")]
        public string CREATE_USER { get; set; }

        /// <summary>
        /// 新增資料時間
        /// </summary>
        [JsonProperty(propertyName:"CREATE_DATE")]
        public DateTime? CREATE_DATE { get; set; }

        /// <summary>
        /// 更新人員
        /// </summary>
        [JsonProperty(propertyName:"UPDATE_USER")]
        public string UPDATE_USER { get; set; }

        /// <summary>
        /// 更新資料時間
        /// </summary>
        [JsonProperty(propertyName:"UPDATE_DATE")]
        public DateTime? UPDATE_DATE { get; set; }
    }
}
