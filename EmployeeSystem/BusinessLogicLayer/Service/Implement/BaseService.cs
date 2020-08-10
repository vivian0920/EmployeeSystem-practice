using System.Collections.Generic;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject;
using Newtonsoft.Json;
using System.Linq;
using System;
using DomainObject.DomainEnum;
using System.Web;

namespace BusinessLogicLayer.Service.Implement
{
    public class BaseService
    {
        /// <summary>
        /// 產生排序的SQL語法
        /// </summary>
        /// <param name="sortObjectList">排序物件</param>
        /// <returns></returns>
        public string GenerateSortString(List<KendoGridSortObject> sortObjectList)
        {
            string sort = string.Empty;

            foreach (KendoGridSortObject sortItem in sortObjectList)
            {
                sort += sortItem.field + " " + sortItem.dir + ",";
            }

            return sort.TrimEnd(',');
        }

        /// <summary>
        /// 根據Grid設定取得所需的資料
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="objGridParameters">Gird參數</param>
        /// <param name="objData">SQL取得的資料</param>
        /// <history>
        /// 2014/10/08  Steven_Chen Create
        /// </history>
        public void ProcGridData<T>(object objGridParameters,ref IList<T> objData)
        {
            if (objGridParameters != null)
            {
                GridParametersObject objGrid = JsonConvert.DeserializeObject<GridParametersObject>(JsonConvert.SerializeObject(objGridParameters));

                //先將objData轉成IOrderedEnumerable<T>
                IOrderedEnumerable<T> data = objData.Cast<T>().OrderBy(x => 1);

                //處理排序
                if (objGrid.sort != null && objGrid.sort.Count > 0)
                {
                    foreach (GridSortObject item in objGrid.sort)
                    {
                        var para = typeof(T).GetProperty(item.field);

                        if (item.dir == "asc")
                        {
                            data = data.ThenBy(x => para.GetValue(x, null));
                        }

                        if (item.dir == "desc")
                        {
                            data = data.ThenByDescending(x => para.GetValue(x, null));
                        }
                    }
                }

                if (objGrid.GetAllData)
                {
                    objData = data.ToList();
                }
                else
                {
                    objData = data.Skip(objGrid.skip).Take(objGrid.take).ToList();
                }              

            }
        }
    }
}
