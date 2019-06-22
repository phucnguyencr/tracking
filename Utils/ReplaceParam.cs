using System;
using System.IO;
using tracking.Utils;

namespace tracking.Utils
{
    public class ReplaceParam
    {
        public static string MakeStringWithParams(string flowStr, string[] valueParams)
        {
            string newStr = flowStr;
            for(int i = 1; i <= valueParams.Length; i++) 
            {
                string param = String.Format("$param{0}$", i);
                newStr = newStr.Replace(param, valueParams[i-1]);
            }
            return newStr;
        }

        public static string CheckActualOrEstimate(DateTime dateAny)
        {
            if (DateTime.Now.Date >= dateAny) {
                return "Actual ";
            }
            return "Estimated ";
        }
    }
}
