using System.Collections.Generic;
using System.Linq;
using BusinessLogicLayer.Service.Interface;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;


namespace BusinessLogicLayer.Service.Implement
{
    public class FuncMenuService : BaseService, IFuncMenuService
    {
        private IFuncMenuDao FuncMenuDao { get; set; }

        /// <summary>
        /// 依據使用者代碼取得其功能列
        /// </summary>
        /// <param name="userId">使用者代碼</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/02/21   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </histor>
        public List<KendoPanelBarObject> GetFuncMenu(string userId)
        {
            string apId = System.Configuration.ConfigurationManager.AppSettings["AP_ID"];

            List<KendoPanelBarObject> kendoPanelList = new List<KendoPanelBarObject>();
            KendoPanelBarObject kendoPanelParent = new KendoPanelBarObject();
            KendoPanelBarObject kendoPanelChild = new KendoPanelBarObject();
            
            IList<FuncMenuObject> funcMenuList = FuncMenuDao.GetFuncMenu(new LogInfoObject(), userId, apId);

            //取得父項目
            List<FuncMenuObject> funcMenuParentList = funcMenuList.Where(e => string.IsNullOrEmpty(e.PARENT_FUN_ID)).OrderBy(e => e.SORT_ORDER).ToList();
            List<FuncMenuObject> funcMenuChildList = new List<FuncMenuObject>(); 

            foreach (FuncMenuObject funcMenuParent in funcMenuParentList)
            {
                kendoPanelParent = new KendoPanelBarObject();
                kendoPanelParent.text = funcMenuParent.FUN_NAME;
                kendoPanelParent.expanded = true;

                kendoPanelParent.items = new List<KendoPanelBarObject>();

                #region 取得子項目

                //依據父功能代碼取得子功能資料
                var menuList = from menuItem in funcMenuList
                                      where !string.IsNullOrEmpty(menuItem.PARENT_FUN_ID) 
                                          && menuItem.PARENT_FUN_ID == funcMenuParent.FUN_ID
                                      orderby menuItem.SORT_ORDER
                                      select menuItem;

                funcMenuChildList = menuList.ToList();

                foreach (FuncMenuObject funcMenuChild in funcMenuChildList)
                {
                    kendoPanelChild = new KendoPanelBarObject();
                    kendoPanelChild.text = funcMenuChild.FUN_NAME;
                    kendoPanelChild.expanded = true;
                    kendoPanelChild.value = funcMenuChild.PRG_PATH;
                    kendoPanelChild.level = 1;

                    kendoPanelParent.items.Add(kendoPanelChild);
                }

                #endregion

                kendoPanelList.Add(kendoPanelParent);
            }

            return kendoPanelList;
        }

    }
}
