using LogHandler.DomainObject;
using System;
using System.IO;
using System.Text;

namespace LogHandler
{
    /// <summary>
    /// CSV檔案控制器
    /// </summary>
    public class CSVController
    {
        #region Property

        private static object CSVLock = new Object();

        /// <summary>
        /// 紀錄Log
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        private LogController LogController
        {
            get
            {
                return new LogController();
            }
        }

        /// <summary>
        /// 資料跟資料中的分隔符號
        /// </summary>
        private string _DelimiterChar = ",";

        #endregion

        #region Public Method

        /// <summary>
        /// 儲存至CSV檔
        /// </summary>
        /// <param name="log">LOG資訊物件</param>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        public void SaveToCSVFile(LogInfoObject log)
        {
            try
            {
                if (this.CheckHasCSVFile())
                {
                    string filePath = this.GetCSVFilePath();
                    string logData = this.GenerateCSVData(log);

                    WriteData(filePath, logData);
                }
            }
            catch (Exception ex)
            {
                log.Exception = ex.ToString();
                LogController.WriteErrorLog(log);
                throw;
            }
        }

        #endregion

        #region Private Method

        /// <summary>
        /// 是否需要產生CSV檔案
        /// </summary>
        /// <returns>true:是; false:否</returns>
        /// <history>
        /// 1. 2014/08/22   1.00   Ben_Tsai   Create
        /// </history>
        private bool CheckHasCSVFile()
        {
            bool hasCSV = false;

            if (System.Configuration.ConfigurationManager.AppSettings["HAS_CSV"] == "Y")
            {
                hasCSV = true;
            }

            return hasCSV;
        }

        /// <summary>
        /// 取得CSV檔案路徑
        /// </summary>
        /// <returns>CSV檔案路徑(包含檔名)</returns>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        private string GetCSVFilePath()
        {
            string filePath = System.Configuration.ConfigurationManager.AppSettings["CSV_PATH"]
                            + DateTime.Now.Year + "/" + DateTime.Now.Month + "/";
            string fileName = DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day + ".csv";

            //檢查資料夾是否存在
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            //檢查檔案是否存在
            if (!File.Exists(filePath + fileName))
            {
                File.Create(filePath + fileName).Close();
            }

            return filePath + fileName;
        }

        /// <summary>
        /// 產生CSV資料
        /// </summary>
        /// <param name="log">LOG資訊物件</param>
        /// <returns>組合後的CSV資料列</returns>
        /// <history>
        /// 1. 2014/08/22   1.00   Ben_Tsai   Create
        /// </history>
        private string GenerateCSVData(LogInfoObject log)
        {
            string data = "";

            //撰寫的欄位有EXEC_TIME, USER_ID, TYPE, FUNC_LIST, METHOD_LIST, MSG_DESC
            //CSV: 分隔符號為, 
            //     分行符號為\r\n
            data = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + _DelimiterChar
                    + log.UserID + _DelimiterChar
                    + log.Type + _DelimiterChar
                    + log.FunctionList + _DelimiterChar;

            //在此前後加上""是為了跟CSV說這全部資料為一組的, 避免受到分行或分隔符號影響
            if (log.BatchMethodName != null)
            {
                data += "\"" + log.BatchName + Environment.NewLine
                        + log.BatchMethodName + _DelimiterChar + "\"";
            }
            else
            {
                data += "\"" + log.ServiceMethodName + Environment.NewLine
                        + log.DaoMethodName + _DelimiterChar + "\"";
            }

            //在此前後加上""是為了跟CSV說這全部資料為一組的, 避免受到分行或分隔符號影響
            if (log.Exception != null)
            {
                data += "\"" + log.Exception + "\"";
            }
            else
            {

                data += "\"" + log.SQL + "\"";
            }

            return data;
        }

        /// <summary>
        /// 將資料寫入檔案
        /// </summary>
        /// <param name="filePath">檔案路徑</param>
        /// <param name="logData">寫入資料</param>
        /// <history>
        /// 1. 2014/08/22   1.00   Ben_Tsai   Create
        /// </history>
        private static void WriteData(string filePath, string logData)
        {
            //避免多人寫檔造成的問題
            //參考:http://blog.darkthread.net/post-2011-01-29-logging-thread-safe.aspx
            lock (CSVLock)
            {
                using (StreamWriter sw = new StreamWriter(filePath, true, Encoding.Unicode))
                {
                    sw.WriteLine(logData);
                    sw.Close();
                }
            }
        }

        #endregion
    }
}
