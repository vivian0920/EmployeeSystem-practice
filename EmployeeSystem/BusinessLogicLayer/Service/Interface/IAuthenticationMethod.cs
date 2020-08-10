using DomainObject.DomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface IAuthenticationMethod
    {
        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="userPassword">使用者密碼</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/19   1.00   Ben_Tsai   Create
        /// </history>
        AuthenticationDataObject Login(string userId, string userPassword);
        
        /// <summary>
        /// 檢測使用者帳號是否存在
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="userPassword">使用者密碼</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// </history>
        bool CheckLoginAccount(string userId, string userPassword);

        /// <summary>
        /// 取得使用者帳號資訊
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// </history>
        UserInfoObject GetUserInfo();

        /// <summary>
        /// 驗證Token是否合法
        /// </summary>
        /// <param name="token">Token</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// </history>
        bool CheckToken(string token);

        /// <summary>
        /// 登出
        /// </summary>
        /// <param name="sessionId">SessionID</param>
        /// <history>
        /// 1. 2013/04/18   1.00   Ben_Tsai   Create
        /// </history>
        void Logout(string sessionId);

        /// <summary>
        /// 取得新Token
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 2014/09/01  Steven_Chen Create
        /// </history>
        string GetNewToken();

    }
}
