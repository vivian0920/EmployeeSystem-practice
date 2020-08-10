using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class ReDatasetParty : BaseDomainObject
    {
        #region Properties
        /// <summary>
        /// 資料表名稱
        /// </summary>
        [JsonProperty(propertyName: "TABLE_NAME")]
        public string TABLE_NAME { get { return "RE_DATASET_PARTY"; } }

        /// <summary>
        /// 資料集編號
        /// </summary>
        [JsonProperty(propertyName: "DATASET_ID")]
        public string DATASET_ID { get; set; }

        /// <summary>
        /// 對象代碼-Case/Borrower/Guarantor/Spouse/CollOwner/Group/Related
        /// </summary>
        [JsonProperty(propertyName: "PARTY_ID")]
        public string PARTY_ID { get; set; }

        /// <summary>
        /// 對象名稱
        /// </summary>
        [JsonProperty(propertyName: "PARTY_NAME")]
        public string PARTY_NAME { get; set; }

        /// <summary>
        /// 單筆/多筆-S/M，影響XML格式
        /// </summary>
        [JsonProperty(propertyName: "DATA_ROW")]
        public string DATA_ROW { get; set; }
        #endregion
    }
}
