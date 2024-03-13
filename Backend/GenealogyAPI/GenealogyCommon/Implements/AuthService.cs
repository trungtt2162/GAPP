using GenealogyCommon.Interfaces;
using Microsoft.AspNetCore.Http;

namespace GenealogyCommon.Implements
{
    public class AuthService: IAuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserName(){
            return _httpContextAccessor.HttpContext.User.FindFirst("UserName")?.Value;
        }

        public string GetRoleCode(){
            return _httpContextAccessor.HttpContext.User.FindFirst("Role")?.Value;
        }

    }
}
