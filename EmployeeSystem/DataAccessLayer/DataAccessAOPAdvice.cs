using AopAlliance.Intercept;
using LogHandler;
using LogHandler.DomainObject;
using System;

namespace DataAccessLayer
{
    /// <summary>
    /// 驗證裝置(應用Spring.net AOP機制)
    /// 執行所有Dao內所有Method前, 須驗證SessionId是否合法
    /// 參考：http://www.springframework.net/doc-latest/reference/html/aop.html
    /// </summary>
    /// <history>
    /// 1. 2013/08/18   1.00   Ben_Tsai   Create
    /// </history>
    public class DataAccessAOPAdvice : IMethodInterceptor
    {
        #region Property

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

        #endregion

        public object Invoke(IMethodInvocation invocation)
        {
            object result = new object();

            //設定Log相關資訊
            LogInfoObject objLogInfo = (LogInfoObject)invocation.Arguments[0];
            objLogInfo.DaoMethodName = invocation.TargetType.FullName + "." + invocation.Method.Name;

            //try
            //{
            invocation.Arguments[0] = objLogInfo;
            result = invocation.Proceed();
            //}
            //catch (Exception ex)
            //{
            //    objLogInfo.Exception = ex.ToString();
            //    LogController.WriteErrorLog(objLogInfo);
            //}

            return result;
        }
    }
}
