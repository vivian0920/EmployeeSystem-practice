using System.Collections.Generic;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.DefinedDomainObject
{
    public class KendoPanelBarObject
    {
        #region Property

        /// <summary>
        /// 顯示字樣
        /// </summary>
        [JsonProperty(propertyName: "text")]
        public string text { get; set; }

        /// <summary>
        /// 被選定後的value
        /// </summary>
        [JsonProperty(propertyName: "value")]
        public string value { get; set; }

        /// <summary>
        /// 目前項目的層級
        /// </summary>
        [JsonProperty(propertyName: "level")]
        public int level { get; set; }

        /// <summary>
        /// 導頁網址
        /// </summary>
        [JsonProperty(propertyName: "url")]
        public string url { get; set; }

        /// <summary>
        /// 預設是否開啟
        /// </summary>
        [JsonProperty(propertyName: "expanded")]
        public bool expanded { get; set; }

        /// <summary>
        /// 子項目
        /// </summary>
        [JsonProperty(propertyName: "items")]
        public List<KendoPanelBarObject> items { get; set; }

        #endregion
    }
}
