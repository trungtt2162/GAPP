using GenealogyCommon.Models;
using Newtonsoft.Json;

namespace GenealogyAPI.Middleware
{
    public class ExceptionHandleMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionHandleMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                var result = new ServiceResult
                {
                    Success = false,
                    Message = "Có lỗi xảy ra",
                    DevMessage = ex.Message
                };
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(result));
            }
        }
    }
}
