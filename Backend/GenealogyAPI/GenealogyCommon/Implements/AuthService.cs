using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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
            
            return _httpContextAccessor.HttpContext.User.FindFirstValue("UserName");
        }

        public string GetUserID(){
            return _httpContextAccessor.HttpContext.User.FindFirstValue("UserID");
        }

        public string GetFullName()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue("FullName");
        }

         

    }
}
