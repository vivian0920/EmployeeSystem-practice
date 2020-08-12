using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using GSS.Stirrup.Scorpio30;
using GSS.Stirrup.Scorpio30.ProcessKit;

namespace PermissionControl.Implement
{
    public class BaseMethod
    {
        #region SC Property設定
        private static string _ScCompID;
        /// <summary>
        /// SC Comp ID
        /// </summary>
        public string ScCompID
        {
            get
            {
                _ScCompID = ConfigurationManager.AppSettings["COMP_ID"];
                return _ScCompID;
            }
        }

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

        private static string _ScApID;
        /// <summary>
        /// SC Ap ID
        /// </summary>
        public string ScApID
        {
            get
            {
                _ScApID = ConfigurationManager.AppSettings["AP_ID"];
                return _ScApID;
            }
        }
        #endregion
        
    }
}
