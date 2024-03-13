using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    internal class PermissionDL: BaseDL<Permission>, IPermissionDL
    {
        public PermissionDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }

        public async Task<bool> InsertPermission(Dictionary<string, object> param)
        {
            var proc = "Proc_Permission_Insert";
            return (await this.QueryFirstOrDefaultAsync<int>(proc, param)) > 0;
        }
    }
}
