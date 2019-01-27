using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Linq;
using tracking.Models;

namespace tracking.Utils
{
    public class ErrorHandlingFilter: ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var logger = ApplicationLogging.CreateLogger();
            var exception = context.Exception.Message.ToString();
            string messages = "";
            switch (exception) {
                case Contants.UNVALID:
                    messages = "Validation Error: " + string.Join("; ", context.ModelState.Values
                        .SelectMany(x => x.Errors)
                        .Select(x => x.ErrorMessage));
                    break;
                case Contants.DUPLICATE:
                    messages = "Data is Duplicated.";
                    break;
                default:
                    messages = "Unkow Message: " + context.Exception.StackTrace;
                    break;
            }
            logger.LogError(messages);
            context.ExceptionHandled = true;
            context.HttpContext.Response.StatusCode = 500;
            context.HttpContext.Response.WriteAsync(Contants.INTERNALERROR);
        }
    }
}
