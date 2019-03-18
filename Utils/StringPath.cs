using System;
using System.IO;
using tracking.Utils;

namespace tracking.Utils
{
    public class StringPath
    {
        public static string FilesPath(string fileName, string fileType)
        {
            string rootPath = Directory.GetCurrentDirectory();
            switch(fileType)
            {
                case Contants.JSONFILE:
                    return String.Format("{0}/JsonFiles/{1}", rootPath, fileName);
                default:
                    return String.Format("{0}/ExcelFiles/", rootPath);
            }
        }
    }
}
