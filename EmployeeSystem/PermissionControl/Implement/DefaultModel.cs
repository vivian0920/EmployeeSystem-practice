using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PermissionControl.Interface;
using System.Configuration;
using GSS.Stirrup.Scorpio30;
using DomainObject.DomainObject;
using System.Data;
using Newtonsoft.Json;


namespace PermissionControl.Implement
{    
    public class DefaultModel: BaseMethod, IPermissionControl
    {
        /// <summary>
        /// 取得新token
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 2014/9/1 Steven_Chen Create
        /// </history>
        public string GetNewToken()
        {
            string newToken = Guid.NewGuid().ToString();
            HttpContext.Current.Session[newToken] = null;
            return newToken;                  
        }

        /// <summary>
        /// 檢測使用者帳號是否存在
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="userPassword">使用者密碼</param>
        /// <param name="sessionID">SessionID</param>
        /// <returns>true:該帳號存在 false:該帳號不存在或帳密不一致</returns>
        /// <history>
        /// 2014/09/02   Steven_Chen  Create
        /// </history>
        public bool CheckLoginAccount(string userId, string userPassword)
        {
            bool isLegal = false;

            //if (userId != string.Empty)
            //{
            //    //步驟1:判斷於SC是否有該使用者
            //    if (ScUser.LoadUser(userId, ScCompID))
            //    {
            //        //步驟2:判斷使用者密碼是否無誤
            //        if (ScUser.ChkPass(userPassword)){
            //            isLegal=true;
            //        }                    
            //    }
            //}

            #region Test By Steven_Chen
            if (userId == "GSS" && userPassword=="gss")
            {
                isLegal = true;
            }            
            #endregion
            return isLegal;
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
            bool isLegal = false;

            if (token != string.Empty && HttpContext.Current.Session !=null && HttpContext.Current.Session[token]!=null)
            {
                isLegal = true;
            }

            return isLegal;
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
            ScUser.Logout(ScApID, sessionID);

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
            UserInfoObject userInfoObject = new UserInfoObject();
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();

            userInfoObject.UserCompId = ScUser.USR_COMP_ID;
            userInfoObject.UserId = ScUser.USR_ID;
            userInfoObject.UserName = ScUser.USR_NAME;

            //若無使用者資訊則不做下列動作
            if (ScUser.USR_ID != string.Empty)
            {
                userInfoObject.SessionId = ScUser.GetNewSessionID(ScApID, ScCompID, ScUser.USR_ID);

                //取得使用者角色
                List<RoleInfoObject> scRoleInfoObject = new List<RoleInfoObject>();

                dt = ScUser.ApLoginRoleSelAllInUsrRole(ScApID, string.Empty, ScCompID);

                #region test data

                DataRow dr = dt.NewRow();

                dr["ROL_ID"] = "001";
                dr["ROL_DOMAIN_ID"] = "TLI";
                dr["ROL_COMP_ID"] = "TLI";
                dr["ROL_NAME"] = "Test";
                dr["ROL_TYPE"] = "A";
                dr["ROL_KIND"] = "1";
                dr["ROL_DESC"] = "測試用";
                dr["ROL_SORT_ORDER"] = "1";

                dt.Rows.Add(dr);

                dr = dt.NewRow();
                dr["ROL_ID"] = "002";
                dr["ROL_DOMAIN_ID"] = "TLI";
                dr["ROL_COMP_ID"] = "TLI";
                dr["ROL_NAME"] = "Test";
                dr["ROL_TYPE"] = "B";
                dr["ROL_KIND"] = "2";
                dr["ROL_DESC"] = "測試功能";
                dr["ROL_SORT_ORDER"] = "2";

                dt.Rows.Add(dr);

                #endregion

                //取得代理人角色
                dt.Merge(ScAgent.RolSelAllByToUsr(ScUser.USR_ID, ScUser.USR_COMP_ID));

                scRoleInfoObject = JsonConvert.DeserializeObject<List<RoleInfoObject>>(JsonConvert.SerializeObject(dt));
                userInfoObject.AllRole = scRoleInfoObject;

                //取得使用者組織
                dt = ScUser.OuSelAll();

                //因為DataTable被反序列化後會變成JArray, 所以無法直解轉成單筆ScOrganizationObject, 須先轉成List<T>才行, 在取第一筆資料
                userInfoObject.UserOrganization = JsonConvert.DeserializeObject<List<OrganizationInfoObject>>(JsonConvert.SerializeObject(dt))[0];

                //取得所有代理人ID
                dt = ScAgent.FromUsrSelAll(ScUser.USR_ID, ScUser.USR_COMP_ID);

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    userInfoObject.AgentUserCompId += dt.Rows[i]["USR_COMP_ID"].ToString() + "##";
                    userInfoObject.AgentUserId += dt.Rows[i]["USR_ID"].ToString() + "##";
                    userInfoObject.AgentUserName += dt.Rows[i]["USR_NAME"].ToString() + "##";
                }
            }

            return userInfoObject;
        }
    }
}
