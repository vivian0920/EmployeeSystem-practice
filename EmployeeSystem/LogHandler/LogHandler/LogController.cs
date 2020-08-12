using log4net;
using LogHandler.DomainObject;
using System;

namespace LogHandler
{
    /// <summary>
    /// LOG控制器
    /// </summary>
    public class LogController
    {
        #region Property

        /// <summary>
        /// 紀錄Log
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        private ILog Logger
        {
            get
            {
                //設定LOG路徑多增加年月
                //Property Name: LogPath 與Web.config設定對應, 請勿任意修改
                log4net.GlobalContext.Properties["LogPath"] = DateTime.Now.Year + "/" + DateTime.Now.Month + "/" + DateTime.Now.Day;
                return LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            }
        }

        /// <summary>
        /// CSV
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        private CSVController CSVController
        {
            get
            {
                return new CSVController();
            }
        }

        #endregion

        #region Public Method

        /// <summary>
        /// 撰寫SQL相關LOG為主(base on log4net 的Info method)
        /// </summary>
        /// <param name="log">LOG資訊物件</param>
        /// <history>
        /// 1. 2014/08/20   1.00   Ben_Tsai   Create
        /// </history>
        public void WriteInfoLog(LogInfoObject log)
        {
            log.Type = LogType.DB;

            //Step1: 格式化訊息
            string formatLog = this.FormatLog(log);

            //Step2: 產生CSV檔
            CSVController.SaveToCSVFile(log);

            //Step3: 紀錄LOG
            Logger.Info(formatLog);
        }

        /// <summary>
        /// 原生 log4net 的Info method
        /// </summary>
        /// <param name="message">訊息物件</param>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        public void WriteInfoLog(object message)
        {
            Logger.Info(message);
        }

        /// <summary>
        /// 撰寫系統相關LOG為主(base on log4net 的Debug method)
        /// </summary>
        /// <param name="log">LOG資訊物件</param>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        public void WriteDebugLog(LogInfoObject log)
        {
            log.Type = LogType.SYS;

            //Step1: 格式化訊息
            string formatLog = this.FormatLog(log);

            //Step2: 產生CSV檔
            CSVController.SaveToCSVFile(log);

            //Step3: 紀錄LOG
            Logger.Debug(formatLog);
        }

        /// <summary>
        /// 原生 log4net 的Debug method
        /// </summary>
        /// <param name="message">訊息物件</param>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        public void WriteDebugLog(object message)
        {
            Logger.Debug(message);
        }

        /// <summary>
        /// 撰寫系統錯誤LOG為主(base on log4net 的Error method)
        /// </summary>
        /// <param name="log">LOG資訊物件</param>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        public void WriteErrorLog(LogInfoObject log)
        {
            log.Type = LogType.ERROR;

            //Step1: 格式化訊息
            string formatLog = this.FormatLog(log);

            //Step2: 產生CSV檔
            CSVController.SaveToCSVFile(log);

            //Step3: 紀錄LOG
            Logger.Error(formatLog);
        }

        /// <summary>
        /// 原生 log4net 的Error method
        /// </summary>
        /// <param name="message">訊息物件</param>
        /// <history>
        /// 1. 2014/08/21   1.00   Ben_Tsai   Create
        /// </history>
        public void WriteErrorLog(object message)
        {
            Logger.Error(message);
        }

        #endregion

        #region Private Method

        /// <summary>
        /// 格式化LOG訊息
        /// </summary>
        /// <param name="log">LOG訊息物件</param>
        /// <returns>格式化後的LOG訊息</returns>
        /// <history>
        /// 1. 2014/08/20   1.00   Ben_Tsai   Create
        /// </history>
        private string FormatLog(LogInfoObject log)
        {
            string logInfo = string.Empty;

            //依造domain object定義順序依序寫出裡面內容
            foreach (System.Reflection.PropertyInfo objItem in log.GetType().GetProperties())
            {
                if (objItem.GetValue(log, null) != null)
                {
                    logInfo += "[" + objItem.Name + "]" + Environment.NewLine
                                + objItem.GetValue(log, null) + Environment.NewLine + Environment.NewLine;
                }
            }

            return logInfo;
        }

        #endregion
    }
}
