
namespace DomainObject.DomainObject.TableDomainObject
{
    public class CaseQueryObject
    {
        #region Properties

        /// <summary>
        /// 案件編號
        /// </summary>
        public string CASE_SN { get; set; }

        /// <summary>
        /// 案件量
        /// </summary>
        public int? CASE_COUNT { get; set; }

        /// <summary>
        /// 啟案人員 
        /// </summary>
        public string CASE_AO_NM { get; set; }

        /// <summary>
        /// 申請單位
        /// </summary>
        public string CASE_OU_NM { get; set; }

        /// <summary>
        /// 申請類別
        /// </summary>
        public string CASE_KIND { get; set; }

        /// <summary>
        /// 作業步驟
        /// </summary>
        public string CASE_STEP { get; set; }

        /// <summary>
        /// 授權層級
        /// </summary>
        public string APRV_LEVEL_NM { get; set; }

        /// <summary>
        /// 授信戶名稱
        /// </summary>
        public string CUST_NM { get; set; }

        /// <summary>
        /// 起案日期
        /// </summary>
        public string APPLY_DT { get; set; }

        /// <summary>
        /// 起案日期(年份)
        /// </summary>
        public string APPLY_DT_Y { get; set; }

        /// <summary>
        /// 起案日期(月份)
        /// </summary>
        public string APPLY_DT_M { get; set; }

        /// <summary>
        /// 申請金額
        /// </summary>
        public decimal? LINE_AMT_CASE { get; set; }

        #endregion
    }
}
