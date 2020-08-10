using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PermissionControl.Interface;
using DomainObject.DomainObject;

namespace PermissionControl.Implement
{
    public class PermissionControl : IPermissionControl
    {
        #region 執行Interface method
        /// <summary>
        /// 取得新token
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 2014/9/1 Steven_Chen Create
        /// </history>
        public string GetNewToken()
        {
            return SelectModel().GetNewToken();
        }

        /// <summary>
        /// 檢測使用者帳號是否存在
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="userPassword">使用者密碼</param>
        /// <returns>true:該帳號存在 false:該帳號不存在或帳密不一致</returns>
        /// <history>
        /// 2014/09/02   Steven_Chen  Create
        /// </history>
        public bool CheckLoginAccount(string userId, string userPassword)
        {
            return SelectModel().CheckLoginAccount(userId, userPassword);
        }

        /// <summary>
        /// 驗證Token是否合法
        /// </summary>
        /// <param name="token">token</param>
        /// <returns>true:合法 false:不合法</returns>
        /// <history>
        /// 2014/09/02 Steven_Chen Create
        /// </history>
        public bool CheckToken(string token)
        {
            return SelectModel().CheckToken(token);
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <param name="sessionID">SessionID</param>
        /// <history>
        /// 2014/09/02 Steven_Chen Create
        /// </history>
        public void Logout(string sessionID)
        {
            SelectModel().Logout(sessionID);
        }

        /// <summary>
        /// 取得使用者帳號資訊
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 2014/09/03   Steven_Chen   Create
        /// </history>
        public UserInfoObject GetUserInfo()
        {
            return SelectModel().GetUserInfo();
        }
        #endregion

        #region 選擇執行的模組
        private IPermissionControl SelectModel()
        {
            string strSystemCode = System.Configuration.ConfigurationManager.AppSettings["SYSTEM_CODE"];

            switch (strSystemCode)
            {
                default:
                    return new DefaultModel();
            }                  
        }
        #endregion
    }

}
