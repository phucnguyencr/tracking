using System;
using System.IO;

namespace tracking.Utils
{
    public class JsonPath
    {
        public static string FilesPath(string fileName)
        {
            string rootPath = Directory.GetCurrentDirectory();
            return String.Format("{0}\\JsonFiles\\{1}", rootPath, fileName);
        }
    }
}
