using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainObject.TableDomainObject;

namespace BusinessLogicLayer.Service.Interface
{
    public interface IClipboardService
    {
        /// <summary>
        /// 取得檔案上傳清單
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/07/28   1.00   Ben_Tsai   Create
        /// </history>
        KendoGridObject<CUTPHOTOObject> GetFileUploadList(int pageNum, int pageSize);

        /// <summary>
        /// 新增檔案
        /// </summary>
        /// <param name="dataObj">資料物件</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// </history>
        void InsertFile(CUTPHOTOObject dataObj);

        /// <summary>
        /// 刪除檔案
        /// </summary>
        /// <param name="dataObj">資料物件</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// </history>
        void DeleteFile(CUTPHOTOObject dataObj);
    }
}
