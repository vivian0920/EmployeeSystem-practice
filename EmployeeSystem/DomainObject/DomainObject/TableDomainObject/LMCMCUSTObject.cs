using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class LMCMCUSTObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TBALE_NAME { get { return "LMCM_CUST"; } }
        /// <summary>
        /// 員工編號
        /// </summary>
        [JsonProperty(propertyName: "CUST_ID")]
        public string CUST_ID { get; set; }

        /// <summary>
        /// 員工姓名
        /// </summary>
        [JsonProperty(propertyName: "CUST_NM")]
        public string CUST_NM { get; set; }

        /// <summary>
        /// 員工到職日期
        /// </summary>
        [JsonProperty(propertyName: "UPD_DT")]
        public string UPD_DT { get; set; }


        #endregion

    }
}
