using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DomainObject.DomainObject;
using DomainObject.DomainObject.DefinedDomainObject;
using Newtonsoft.Json;
using DataAccessLayer.Dao.Interface;
using BusinessLogicLayer.Service.Interface;

namespace BusinessLogicLayer.Service.Implement
{
    public class CustomService:ICustomService
    {
        #region Properties
        private ICustomDao CustomDao { get; set; }
        #endregion

        /// <summary>
        /// 取得Customer資料
        /// </summary>
        /// <param name="strParameters">參數</param>
        /// <returns></returns>
        /// <history>
        /// 2015/01/20  Daniel Lee   Create
        /// </history>
        public DeliverObject GetCustomer(ReceiveObject objPara)
        {
            DeliverObject objDeliver = new DeliverObject();

            //將objParameters轉成所需的格式
            IList<CustomObject> objParameters = JsonConvert.DeserializeObject <IList<CustomObject>>(JsonConvert.SerializeObject(objPara.Parameters));

            //取得Customer
            IList<CustomObject> objReCode = CustomDao.GetCustomer(objPara.LogInfoObject, objParameters);
            
            //總共有幾筆資料
            objDeliver.TotalCount = objReCode.Count;

            //處理Grid每頁取得資料
           // ProcGridData<CustomObject>(objPara.GridParameters, ref objReCode);

            //將欲回傳的資料存入DeliverObject.Data中
            objDeliver.Data = objReCode;

            return objDeliver;
        }
        /// <summary>
        /// 新增員工
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public DeliverObject InsertCustomer(ReceiveObject obj)
        {
            DeliverObject deliverObj = new DeliverObject();
            //將傳入的資料序列化綁上去
            IList<CustomObject> inputObject = JsonConvert.DeserializeObject<IList<CustomObject>>(JsonConvert.SerializeObject(obj.Parameters));

            //取得使用者輸入的員編
            List<string> idList = new List<string>();
            foreach (CustomObject customId in inputObject) 
            {
                idList.Add(customId.CUST_ID);
            }
            //將欲新增的員編先去資料庫做搜尋
            IList<CustomObject> customObjects = CustomDao.GetCustomerById(obj.LogInfoObject, idList);

            //檢查資料庫是否已有相同的員編
            if (customObjects.Count == 0)
            {
                try
                {   //回傳新增結果(true表示每一筆資料都新增成功)
                    if (CustomDao.InsertCustomer(obj.LogInfoObject, inputObject))
                    {  //將欲回傳的資料存入deliverObj.Data中
                        deliverObj.Data = "新增成功";
                    }
                    else
                    {
                        deliverObj.Data = "新增有誤";
                    }
                }
                catch
                {
                    //將欲回傳的資料存入 deliverObj.Data中
                    deliverObj.Data = "新增失敗";

                }
            }
            else {
                deliverObj.Data = "不得新增已有的資料。";
            }
            
            return deliverObj;
        }



        /// <summary>
        /// 刪除員工
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public DeliverObject DeleteCustomer(ReceiveObject obj)
        {
            DeliverObject deliverObj = new DeliverObject();
            //將傳入的資料序列化綁上去
            CustomObject inputObject = JsonConvert.DeserializeObject<CustomObject>
                (JsonConvert.SerializeObject(obj.Parameters));
            try
            {   //回傳刪除結果
                if (CustomDao.DeleteCustomer(obj.LogInfoObject, inputObject))
                {  //將欲回傳的資料存入deliverObj.Data中
                    deliverObj.Data = "員工編號: "+inputObject.CUST_ID + " 刪除成功";
                }
                else
                {
                    deliverObj.Data = "員工編號: "+ inputObject.CUST_ID + " 刪除時發生錯誤";
                }
            }
            catch
            {
                //將欲回傳的資料存入 deliverObj.Data中
                deliverObj.Data = "員工編號: " + inputObject.CUST_ID + " 刪除失敗";

            }

            return deliverObj;
        }



    }
}
