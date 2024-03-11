using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace GenealogyBL.Implements
{
    internal class UserBL : BaseBL<User>, IUserBL
    {
        private readonly IUserDL _userDL;
        public UserBL(IUserDL userDL, IWebHostEnvironment env):base(env, userDL)
        {
            _userDL = userDL;
            var conn = _configuration.GetConnectionString("Genealogy_DB");
            _userDL.InitializeDatabaseContext(conn ?? "");
        }
    }
}
