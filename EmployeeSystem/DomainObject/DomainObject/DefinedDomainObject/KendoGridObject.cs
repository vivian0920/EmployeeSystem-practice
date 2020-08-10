using System.Collections.Generic;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.DefinedDomainObject
{
    public class KendoGridObject<T>
    {
        #region Property

        /// <summary>
        /// Grid資料
        /// </summary>
        [JsonProperty(propertyName: "data")]
        public List<T> data { get; set; }

        /// <summary>
        /// 總筆數
        /// </summary>
        [JsonProperty(propertyName: "total")]
        public int total { get; set; }

        #endregion
    }
}
