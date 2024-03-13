using GenealogyAPI.Infrastructure;

namespace GenealogyAPI.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenBlacklist _tokenBlacklist;
        private readonly JwtAuthManager _jwtAuthManager;

        public JwtMiddleware(RequestDelegate next, TokenBlacklist tokenBlacklist)
        {
            _next = next;
            _tokenBlacklist = tokenBlacklist;
            //_jwtAuthManager = jwtAuthManager;
        }

        public async Task Invoke(HttpContext context)
        {
            string token = context.Request.Headers["Authorization"];

            if (!string.IsNullOrEmpty(token) && _tokenBlacklist.Contains(token))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }
            //var token1 = token.Substring("Bearer ".Length).Trim();
            //var (principal, jwtToken) = _jwtAuthManager.DecodeJwtToken(token1);
            //var roleCode = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "Role")?.Value;
            //var userName = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "Name")?.Value;
            //context.Items["roleCode"] = roleCode;
            //context.Items["userName"] = userName;
            await _next(context);
        }
    }
}
 