using Spring.Context;
using Spring.Context.Support;


namespace BusinessLogicLayer
{
    /// <summary>
    /// 共用，讀取Spring設定檔，主要for Dependency Injection使用，透過factory製造出需要的service instance
    /// </summary>
    public class RepositoryFactory
    {
        private static IApplicationContext ctx = null;

        public RepositoryFactory()
        {
            RepositoryFactory.ApplicationContext = ContextRegistry.GetContext();
        }

        public static IApplicationContext ApplicationContext
        {
            get
            {
                if (ctx == null)
                {
                    ctx = ContextRegistry.GetContext();
                }

                return ctx;
            }
            set { ctx = value; }
        }

        /// <summary>
        /// 利用Spring.Net 注入 所選擇的Service
        /// </summary>
        /// <param name="serviceName"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        public object Service(string serviceName)
        {
            return RepositoryFactory.ApplicationContext[serviceName];
        }

    }
}
