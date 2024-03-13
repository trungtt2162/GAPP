using GenealogyBL.Interfaces;
using GenealogyCommon.Configuration;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Implements
{
    public class AuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserName(){
            return httpContext.User.FindFirst("UserName")?.Value;
        }

        public string GetRoleCode(){
            return httpContext.User.FindFirst("Role")?.Value;
        }

    }
}
