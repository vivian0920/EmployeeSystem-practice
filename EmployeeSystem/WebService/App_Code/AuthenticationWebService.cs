using System.Web.Services;
using DomainObject.DomainObject;
using BusinessLogicLayer.Service.Interface;
using BusinessLogicLayer;

/// <summary>
/// AuthenticationWebService 的摘要描述
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允許使用 ASP.NET AJAX 從指令碼呼叫此 Web 服務，請取消註解下一行。
[System.Web.Script.Services.ScriptService]
public class AuthenticationWebService : System.Web.Services.WebService
{
    #region Property

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

    /// <summary>
    /// 登入
    /// </summary>
    /// <param name="userId">使用者帳號</param>
    /// <param name="userPassword">使用者密碼</param>
    /// <returns></returns>
    /// <history>
    /// 1. 2013/04/19   1.00   Ben_Tsai   Create
    /// </history>
    [WebMethod(EnableSession=true)]
    public AuthenticationDataObject Login(string userId, string userPassword)
    {
        return AuthenticationMethod.Login(userId, userPassword);
    }

    /// <summary>
    /// 檢測使用者帳號是否存在
    /// </summary>
    /// <param name="userId">使用者帳號</param>
    /// <param name="userPassword">使用者密碼</param>
    /// <returns></returns>
    /// <history>
    /// 1. 2013/04/16   1.00   Ben_Tsai   Create
    /// 2. 2014/09/04   1.01   Steven_Chen  新增傳入SessionID
    /// </history>
    [WebMethod(EnableSession = true)]
    public bool CheckLoginAccount(string userId, string userPassword)
    {
        return AuthenticationMethod.CheckLoginAccount(userId, userPassword);
    }

    /// <summary>
    /// 取得使用者帳號資訊
    /// </summary>
    /// <returns></returns>
    /// <history>
    /// 1. 2013/04/16   1.00   Ben_Tsai   Create
    /// </history>
    [WebMethod()]
    public UserInfoObject GetScUserInfo()
    {
        return AuthenticationMethod.GetUserInfo();
    }

    /// <summary>
    /// 驗證Token是否合法
    /// </summary>
    /// <param name="token">token</param>
    /// <returns></returns>
    /// <history>
    /// 1. 2013/04/16   1.00   Ben_Tsai   Create
    /// </history>
    [WebMethod(EnableSession = true)]
    public bool CheckToken(string token)
    {
        //return AuthenticationMethod.CheckToken(token);
        return true;
    }

    /// <summary>
    /// 登出
    /// </summary>
    /// <param name="sessionId">SessionID</param>
    /// <history>
    /// 1. 2013/04/16   1.00   Ben_Tsai   Create
    /// </history>
    [WebMethod()]
    public void Logout(string sessionId)
    {
        AuthenticationMethod.Logout(sessionId);
    }

    /// <summary>
    /// 取得新Token
    /// </summary>
    /// <returns></returns>
    /// <history>
    /// 2014/09/01  Steven_Chen Create
    /// </history>
    [WebMethod()]
    public string GetNewToken()
    {
        return AuthenticationMethod.GetNewToken();
    }
}
