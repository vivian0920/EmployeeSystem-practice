using Newtonsoft.Json;

namespace DomainObject.DomainObject.DefinedDomainObject
{
     public class KendoGridSortObject
    {
        #region Properties

        /// <summary>
        /// 排序欄位
        /// </summary>
        [JsonProperty(propertyName: "field")]
        public string field { get; set; }

        /// <summary>
        /// 排序方式
        /// </summary>
        [JsonProperty(propertyName: "dir")]
        public string dir { get; set; }

        #endregion
    }
}
