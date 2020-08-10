using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace DomainObject.DomainObject
{
    public class GridParametersObject
    {
        /// <summary>
        /// 目前頁碼
        /// </summary>
        public int page { get; set; }

        /// <summary>
        /// 每頁筆數
        /// </summary>
        public int pageSize { get; set; }

        /// <summary>
        /// 排序物件
        /// </summary>
        public List<GridSortObject> sort { get; set; }

        /// <summary>
        /// 去除幾筆
        /// </summary>
        public int skip { get; set; }

        /// <summary>
        /// 取幾筆
        /// </summary>
        public int take { get; set; }

        /// <summary>
        /// 是否取得所有資料
        /// </summary>
        public bool GetAllData { get; set; }
    }

    public class GridSortObject
    {
        /// <summary>
        /// 欄位名稱
        /// </summary>
        public string field { get; set; }

        /// <summary>
        /// 排序方式
        /// </summary>
        public string dir { get; set; }
    }
}
