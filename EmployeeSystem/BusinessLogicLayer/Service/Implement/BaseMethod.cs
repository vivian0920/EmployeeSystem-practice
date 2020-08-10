using GSS.Stirrup.Scorpio30;
using System.Configuration;
using GSS.Stirrup.Scorpio30.ProcessKit;

namespace BusinessLogicLayer.Service.Implement
{
    public class BaseMethod
    {
        #region Property

        //依據SC WebService內的web.config設定

        private static ScUser _ScUser;
        /// <summary>
        /// SC User
        /// </summary>
        public ScUser ScUser
        {
            get
            {
                if (_ScUser == null)
                {
                    _ScUser = new ScUser(BaseProc.GetASPXTemplateConfig("GSSstrAP_CONNECT_ID"));
                }

                return _ScUser;
            }
        }

        private static ScAgent _ScAgent;
        /// <summary>
        /// SC Agent
        /// </summary>
        public ScAgent ScAgent
        {
            get
            {
                if (_ScAgent == null)
                {
                    _ScAgent = new ScAgent(BaseProc.GetASPXTemplateConfig("GSSstrAP_CONNECT_ID"));
                }

                return _ScAgent;
            }
        }

        private static string _ScCompId;
        /// <summary>
        /// SC Comp ID
        /// </summary>
        public string ScCompId
        {
            get
            {
                _ScCompId = ConfigurationManager.AppSettings["COMP_ID"];
                return _ScCompId;
            }
        }

        private static string _ScApId;
        /// <summary>
        /// SC Ap ID
        /// </summary>
        public string ScApId
        {
            get
            {
                _ScApId = ConfigurationManager.AppSettings["AP_ID"];
                return _ScApId;
            }
        }

        #endregion
    }
}
