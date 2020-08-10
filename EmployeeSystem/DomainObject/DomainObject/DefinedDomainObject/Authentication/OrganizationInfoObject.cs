using System.Text;
using Newtonsoft.Json;
using System.Web;

namespace DomainObject.DomainObject
{
    public class OrganizationInfoObject
    {
        /// <summary>
        /// 組織代碼
        /// </summary>
        [JsonProperty("OU_ID")]
        public string OU_ID { get; set; }

        /// <summary>
        /// 組織機關代碼
        /// </summary>
        [JsonProperty("OU_COMP_ID")]
        public string OU_COMP_ID { get; set; }

        /// <summary>
        /// 組織Domain代碼
        /// </summary>
        [JsonProperty("OU_DOMAIN_ID")]
        public string OU_DOMAIN_ID { get; set; }

        /// <summary>
        /// 組織名稱
        /// </summary>
        [JsonProperty("OU_NAME")]
        public string OU_NAME { get; set; }

        /// <summary>
        /// 組織型別
        /// </summary>
        [JsonProperty("OU_TYPE")]
        public string OU_TYPE { get; set; }

        /// <summary>
        /// 組織類別
        /// </summary>
        [JsonProperty("OU_KIND")]
        public string OU_KIND { get; set; }

        /// <summary>
        /// 組織註釋
        /// </summary>
        [JsonProperty("OU_DESC")]
        public string OU_DESC { get; set; }

        /// <summary>
        /// 組織排序碼
        /// </summary>
        [JsonProperty("OU_SORT_ORDER")]
        public string OU_SORT_ORDER { get; set; }

        /// <summary>
        /// 組織是否開啟
        /// </summary>
        [JsonProperty("IS_ENABLE")]
        public string IS_ENABLE { get; set; }

        /// <summary>
        /// 組織開始日期
        /// </summary>
        [JsonProperty("OU_SDATE")]
        public string OU_SDATE { get; set; }

        /// <summary>
        /// 組織結束日期
        /// </summary>
        [JsonProperty("OU_EDATE")]
        public string OU_EDATE { get; set; }

        private string _PARENT_OU = string.Empty;
        /// <summary>
        /// 上層組織
        /// </summary>
        [JsonProperty("PARENT_OU")]
        public string PARENT_OU 
        {
            get
            {
                return HttpUtility.UrlEncode(_PARENT_OU, Encoding.UTF8);
            }
            set
            {
                //避免非法字元
                _PARENT_OU = HttpUtility.UrlDecode(value, Encoding.UTF8);
            }
        }

        /// <summary>
        /// 關聯類別
        /// </summary>
        [JsonProperty("REL_KIND")]
        public string REL_KIND { get; set; }

        /// <summary>
        /// 連結類別
        /// </summary>
        [JsonProperty("LINK_KIND")]
        public string LINK_KIND { get; set; }
    }
}
