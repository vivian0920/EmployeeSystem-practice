using Newtonsoft.Json;
using System;

namespace DomainObject.DomainObject.TableDomainObject
{
    public class CUTPHOTOObject
    {
        #region Properties

        /// <summary>
        /// 資料序號
        /// </summary>
        [JsonProperty(propertyName: "DATA_ID")]
        public int? DATA_ID { get; set; }

        /// <summary>
        /// 資料編號
        /// </summary>
        [JsonProperty(propertyName: "DATANO")]
        public string DATANO { get; set; }

        /// <summary>
        /// 檔案名稱
        /// </summary>
        [JsonProperty(propertyName: "FILENAME")]
        public string FILENAME { get; set; }

        /// <summary>
        /// 檔案說明
        /// </summary>
        [JsonProperty(propertyName: "FILEDESC")]
        public string FILEDESC { get; set; }

        /// <summary>
        /// 上傳人員 
        /// </summary>
        [JsonProperty(propertyName: "USERNAME")]
        public string USERNAME { get; set; }

        /// <summary>
        /// 上傳日期
        /// </summary>
        [JsonProperty(propertyName: "CREATEDATE")]
        public DateTime? CREATEDATE { get; set; }

        #endregion
    }
}
