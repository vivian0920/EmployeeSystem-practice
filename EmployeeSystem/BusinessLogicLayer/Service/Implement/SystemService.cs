using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BusinessLogicLayer.Service.Interface;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainObject;
using Newtonsoft.Json;

namespace BusinessLogicLayer.Service.Implement
{
    public class SystemService:BaseService, ISystemService
    {
        #region Properties
        private ISystemDao SystemDao { get; set; }
        #endregion

        /// <summary>
        /// 取得系統代碼
        /// </summary>
        /// <param name="strParameters">參數</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/12  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public DeliverObject GetSystemCode(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將objParameters轉成所需的格式
            ReCodeObject objParameters = JsonConvert.DeserializeObject<ReCodeObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得系統代碼資料
            IList<ReCodeObject> objReCode = SystemDao.GetSystemCode(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objReCode;
            
            return objDeliver;
        }

        /// <summary>
        /// 取得系統代碼(Array)
        /// </summary>
        /// <param name="strParameters">參數</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/16  Daniel Lee   Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public DeliverObject GetSystemCodeByList(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將objParameters轉成所需的格式
            ReCodeQueryObject objParameters = JsonConvert.DeserializeObject<ReCodeQueryObject>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得系統代碼資料
            IList<ReCodeObject> objReCode = SystemDao.GetSystemCodeByList(objPara.LogInfoObject, objParameters);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objReCode;

            return objDeliver;
        }
    }
}
