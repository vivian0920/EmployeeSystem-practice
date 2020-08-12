using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using DomainObject.DomainObject.TableDomainObject;

namespace DomainObject.DomainObject.DefinedDomainObject
{
    /// <summary>
    /// 客戶列表
    /// </summary>
    public class CustomObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "LMCM_CUST"; } }
        /// <summary>
        /// name
        /// </summary>
        [JsonProperty(propertyName: "CUST_NM")]
        public string CUST_NM { get; set; }

        /// <summary>
        /// id
        /// </summary>
        [JsonProperty(propertyName: "CUST_ID")]
        public string CUST_ID { get; set; }

        /// <summary>
        /// update 
        /// </summary>
        [JsonProperty(propertyName: "UPD_DT")]
        public string UPD_DT { get; set; }

        #endregion
    }
}
