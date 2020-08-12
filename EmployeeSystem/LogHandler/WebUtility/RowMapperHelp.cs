using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Reflection;

namespace WebUtility
{
    public static class RowMapperHelp
    {
        /// <summary>
        /// 檢核PropertyName是否存在且具有資料
        /// </summary>
        /// <param name="obj">data object</param>
        /// <param name="dataReader">The data reader</param>
        /// <returns>Boolean</returns>
        /// <history>
        /// 2014/09/23  Steven_Chen Create
        /// </history>
        public static object GetRowMapperObject(object obj, IDataReader dataReader)
        {
            for (int i = 0; i < dataReader.FieldCount; i++)
            {
                if (!Convert.IsDBNull(dataReader[i]))
                {
                    foreach (PropertyInfo objItem in obj.GetType().GetProperties())
                    {
                        if (objItem.Name == dataReader.GetName(i))
                        {
                            switch (objItem.PropertyType.Name.ToLower())
                            {
                                case "string":
                                    objItem.SetValue(obj, ConvertDBObject.ConvertString(dataReader[i]), null);
                                    break;
                                case "int":
                                    objItem.SetValue(obj, ConvertDBObject.ConvertInt(dataReader[i]), null);
                                    break;
                                case "date":
                                    objItem.SetValue(obj, ConvertDBObject.ConvertDate(dataReader[i]), null);
                                    break;
                                default:
                                    break;
                            }
                            
                        }
                    }
                }
            }            

            return obj;
        }
    }
}
