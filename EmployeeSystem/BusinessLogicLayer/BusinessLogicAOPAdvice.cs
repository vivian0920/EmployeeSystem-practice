using System;
using AopAlliance.Intercept;
using BusinessLogicLayer.Service.Interface;
using LogHandler.DomainObject;
using LogHandler;
using DomainObject.DomainObject;
using Newtonsoft.Json;
using BusinessLogicLayer.Service.Implement;
using System.Web;

namespace BusinessLogicLayer
{
    /// <summary>
    /// 驗證裝置(應用Spring.net AOP機制)
    /// 執行所有Service內所有Method前, 須驗證Token是否合法
    /// 參考：http://www.springframework.net/doc-latest/reference/html/aop.html
    /// </summary>
    /// <history>
    /// 1. 2013/04/18   1.00   Ben_Tsai   Create
    /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 調整LOG取得方式
    /// </history>
    public class BusinessLogicAOPAdvice : IMethodInterceptor
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

        //SC Authentication Service
        private static IAuthenticationMethod _AuthenticationMethod;
        public IAuthenticationMethod AuthenticationMethod
        {
            get
            {
                if (_AuthenticationMethod == null)
                {
                    _AuthenticationMethod = (IAuthenticationMethod)(new RepositoryFactory()).Service("AuthenticationMethod");
                }

                return _AuthenticationMethod;
            }
        }
        #endregion

        public object Invoke(IMethodInvocation invocation)
        {
            DeliverObject objDeliver = new DeliverObject();

            //驗證使用者的Token是否合法
            ReceiveObject objReceive = (ReceiveObject)invocation.Arguments[0];
            bool executeFlag = AuthenticationMethod.CheckToken(objReceive.Token);

            //if (executeFlag)
            //{
            //依據Token取得AuthenticationData Session資料
            AuthenticationDataObject objAuthenticationData = (AuthenticationDataObject)this.GetSessionInfo(objReceive.Token);

            //設定Log相關資訊
            LogInfoObject objLogInfo = new LogInfoObject();
            objLogInfo.UserID = "SYSTEM"; //objAuthenticationData.UserInfo.UserId;    //TODO: ben 目前先註解之後須打開讓其寫入USER_ID
            //objLogInfo.UserIP = objAuthenticationData.ClientIP;
            objLogInfo.FunctionList = objReceive.CurrentPath;
            objLogInfo.ServiceMethodName = invocation.TargetType.FullName + "." + invocation.Method.Name;
            objReceive.LogInfoObject = objLogInfo;

            //當inital不為null及false時,才執行method
            if (objReceive.inital != null && !objReceive.inital)
            {
                try
                {
                    invocation.Arguments[0] = objReceive;
                    objDeliver = (DeliverObject)invocation.Proceed();
                }
                catch (Exception ex)
                {
                    objReceive.LogInfoObject.Exception = ex.ToString();
                    LogController.WriteErrorLog(objReceive.LogInfoObject);

                    objDeliver.Data = false;
                }
            }

            //指定驗證資訊
            objDeliver.AuthenticationMessage = "Authentication Success";
            objDeliver.AuthenticationStatus = "100";
            //}
            //else
            //{
            //    //指定驗證資訊
            //    objDeliver.AuthenticationMessage = "Authentication Failure";
            //    objDeliver.AuthenticationStatus = "200";
            //}

            return objDeliver;
        }

        #region Private

        /// <summary>
        /// 依據Token取得Session資料
        /// </summary>
        /// <param name="token">辨識碼Token</param>
        /// <returns>Session物件</returns>
        /// <history>
        /// 1. 2014/11/06   1.00   Ben_Tsai   Create
        /// </history>
        public object GetSessionInfo(string token)
        {
            object objSession = null;

            if (HttpContext.Current.Session != null)
            {
                if (HttpContext.Current.Session[token] != null)
                {
                    objSession = HttpContext.Current.Session[token];
                }
            }

            return objSession;
        }

        #endregion
    }
}
