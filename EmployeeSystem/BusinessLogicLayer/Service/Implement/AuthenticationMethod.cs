using BusinessLogicLayer.Service.Interface;
using GSS.Stirrup.Scorpio30;
using DomainObject.DomainObject;
using System.Data;
using Newtonsoft.Json;
using System.Collections.Generic;
using PermissionControl.Interface;
using System.Web;

namespace BusinessLogicLayer.Service.Implement
{
    public class AuthenticationMethod : IAuthenticationMethod
    {
        #region Property
        private static IPermissionControl _PermissionControl;
        public IPermissionControl PermissionControl
        {
            get
            {
                if (_PermissionControl == null)
                {
                    _PermissionControl = (IPermissionControl)(new RepositoryFactory()).Service("PermissionControl");
                }

                return _PermissionControl;
            }
        }
        #endregion

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="userPassword">使用者密碼</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/19   1.00   Ben_Tsai   Create
        /// 2. 2014/09/02   1.01   Steven_Chen Token改成自GetCurrentToken()取得
        /// 3. 2014/11/12   1.02   Ben_Tsai   Modify 增加取得Client端IP
        /// </history>
        public AuthenticationDataObject Login(string userId, string userPassword)
        {
            AuthenticationDataObject AuthenticationDataObject = new AuthenticationDataObject();
            string token = GetNewToken();

            //判斷帳號密碼是否正確
            if (CheckLoginAccount(userId, userPassword))
            {                
                //設定AuthenticationDataObject
                AuthenticationDataObject.AuthenticationStatus = "100";
                AuthenticationDataObject.AuthenticationMessage = "Login Success";
                //AuthenticationDataObject.UserInfo = GetUserInfo();
                AuthenticationDataObject.Token = token;
            }
            else
            {
                AuthenticationDataObject.AuthenticationStatus = "200";
                AuthenticationDataObject.AuthenticationMessage = "Login Error";
            }

            AuthenticationDataObject.ClientIP = this.GetClientIP();

            //將AuthenticationDataObject存入Session中
            HttpContext.Current.Session[token] = AuthenticationDataObject;
            
            return AuthenticationDataObject;
        }
        
        /// <summary>
        /// 取得使用者帳號資訊
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// 2. 2014/09/03   1.01   Steven_Chen  改取自PermissionControl.GetUserInfo()
        /// </history>
        public UserInfoObject GetUserInfo()
        {
            return PermissionControl.GetUserInfo();
        }

        /// <summary>
        /// 驗證Token是否合法
        /// </summary>
        /// <param name="token">token</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// 2. 2014/09/02   1.01   Steven_Chen 改自PermissionControl.CheckToken(token)驗證
        /// </history>
        public bool CheckToken(string token)
        {
            return PermissionControl.CheckToken(token);
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <param name="sessionId">SC的SessionID</param>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// </history>
        public void Logout(string sessionId)
        {
            PermissionControl.Logout(sessionId);
        }

        /// <summary>
        /// 取得新Token
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 2014/09/01  Steven_Chen Create
        /// </history>
        public string GetNewToken()
        {
            return PermissionControl.GetNewToken();
        }

        /// <summary>
        /// 檢測使用者帳號是否存在
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="userPassword">使用者密碼</param>
        /// <returns>true:該帳號存在 false:該帳號不存在或帳密不一致</returns>
        /// <history>
        /// 1. 2014/09/02   Steven_Chen  Create
        /// </history>
        public bool CheckLoginAccount(string userId, string userPassword)
        {
            return PermissionControl.CheckLoginAccount(userId, userPassword);
        }

        #region Private Method

        /// <summary>
        /// 取得用戶端的IP位置
        /// </summary>
        /// <returns>IP</returns>
        /// <history>
        /// 1. 2014/11/12   1.00   Ben_Tsai   Create
        /// </history>
        private string GetClientIP()
        {
            //取得Client端IP
            string strClientIP = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (string.IsNullOrEmpty(strClientIP))
            {
                strClientIP = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }

            return strClientIP;
        }

        #endregion
    }
}