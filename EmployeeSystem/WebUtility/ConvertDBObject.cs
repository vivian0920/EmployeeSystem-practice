using System;

namespace WebUtility
{
    public static class ConvertDBObject
    {
        /// <summary>
        /// 轉型成字串
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ConvertString(object obj)
        {
            return Convert.IsDBNull(obj) || obj == null ? string.Empty : Convert.ToString(obj).Trim();
        }

        /// <summary>
        /// 轉型成整數
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static int? ConvertInt(object obj)
        {
            if (Convert.IsDBNull(obj) || obj == null) return null;

            return Convert.ToInt32(obj);
        }

        /// <summary>
        /// 轉型成日期
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static DateTime? ConvertDate(object obj)
        {
            if (Convert.IsDBNull(obj) || obj == null) return null;

            return Convert.ToDateTime(obj);
        }

    }
}
