using GenealogyAPI.Infrastructure;

namespace GenealogyAPI.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenBlacklist _tokenBlacklist;

        public JwtMiddleware(RequestDelegate next, TokenBlacklist tokenBlacklist)
        {
            _next = next;
            _tokenBlacklist = tokenBlacklist;
        }

        public async Task Invoke(HttpContext context)
        {
            string token = context.Request.Headers["Authorization"];

            if (!string.IsNullOrEmpty(token) && _tokenBlacklist.Contains(token))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }
            await _next(context);
        }
    }
}
