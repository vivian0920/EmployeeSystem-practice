using System;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace DataAccessLayer
{
    public class DBProvider
    {
        //DB Password 解密金鑰(必須與加密程式同步)
        private static readonly byte[] RfcSALT = new byte[] {0xfe, 0x7, 0xaf, 0xff, 0x0, 0x4d, 0x8, 0x22, 0xee, 0xc5, 0x3c, 0x26, 0xdc, 0xad, 0xed, 0x7a};
        private static string RfcPassword = "1qaz@WSX3edc$RFV4rfv%TGB";

        /// <summary>
        /// 自行加密
        /// </summary>
        /// <param name="dbProvider"></param>
        /// <param name="connectionString"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static Spring.Data.Common.DbProvider GetDbProvider(string dbProvider)
        {
            Spring.Data.Common.IDbProvider db = Spring.Data.Common.DbProviderFactory.GetDbProvider(dbProvider);

            db.ConnectionString = DecryptString(System.Configuration.ConfigurationManager.ConnectionStrings["FBU_BASE"].ToString());

            return (Spring.Data.Common.DbProvider)db;
        }

        /// <summary>
        /// 自行加密
        /// </summary>
        /// <param name="dbProvider"></param>
        /// <param name="connectionString"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static Spring.Data.Common.DbProvider GetDbProviderForMobile(string dbProvider)
        {
            Spring.Data.Common.IDbProvider db = Spring.Data.Common.DbProviderFactory.GetDbProvider(dbProvider);

            db.ConnectionString = DecryptString(System.Configuration.ConfigurationManager.ConnectionStrings["COSMOS_LMB"].ToString());

            return (Spring.Data.Common.DbProvider)db;
        }

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="encryptString">加密字串</param>
        /// <returns></returns>
        /// <remarks></remarks>
        private static string DecryptString(string encryptString)
        {
            string result = string.Empty;

            // Instantiate a new RijndaelManaged object to perform string symmetric encryption
            RijndaelManaged rijndaelManaged = new RijndaelManaged();

            Rfc2898DeriveBytes rfc = new Rfc2898DeriveBytes(RfcPassword, RfcSALT);

            // Set key and IV
            rijndaelManaged.Key = rfc.GetBytes(32);
            rijndaelManaged.IV = rfc.GetBytes(16);

            // Instantiate a new MemoryStream object to contain the encrypted bytes
            MemoryStream memoryStream = new MemoryStream();

            // Instantiate a new encryptor from our RijndaelManaged object
            ICryptoTransform cryptoTransform = rijndaelManaged.CreateDecryptor();

            // Instantiate a new CryptoStream object to process the data and write it to the 
            // memory stream
            CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoTransform, CryptoStreamMode.Write);

            try
            {
                // Convert the EncryptConnection string into a byte array
                byte[] encryptConnectionBytes = Convert.FromBase64String(encryptString);

                // Decrypt the input Encrypt Connection string
                cryptoStream.Write(encryptConnectionBytes, 0, encryptConnectionBytes.Length);

                // Complete the decryption process
                cryptoStream.FlushFinalBlock();

                // Convert the decrypted data from a MemoryStream to a byte array
                byte[] connectBytes = memoryStream.ToArray();

                // Convert the encrypted byte array to a base64 encoded string
                result = Encoding.ASCII.GetString(connectBytes, 0, connectBytes.Length);
            }
            finally
            {
                // Close both the MemoryStream and the CryptoStream
                memoryStream.Close();
                cryptoStream.Close();
            }

            return result;
        }

    }
}
