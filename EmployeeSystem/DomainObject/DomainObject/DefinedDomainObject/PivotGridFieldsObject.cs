
namespace DomainObject.DomainObject.DefinedDomainObject
{
    /// <summary>
    /// 定義Grid欄位
    /// </summary>
    public class PivotGridFieldsObject
    {
        /// <summary>
        /// Grid欄位ID
        /// </summary>
        public string FieldName { get; set; }

        /// <summary>
        /// Grid欄位顯示名稱
        /// </summary>
        public string FieldCaption { get; set; }

        /// <summary>
        /// Grid欄位類型
        /// </summary>
        public string DataType { get; set; }
    }
}
