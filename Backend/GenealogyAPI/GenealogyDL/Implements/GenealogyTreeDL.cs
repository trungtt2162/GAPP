using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{ 
    public class GenealogyTreeDL: BaseDL<Genealogy>, IGenealogyDL
    {
        public GenealogyTreeDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }
        public async Task<int> Create(Genealogy gen)
        {
            var proc = "Proc_genealogy_Insert";
            var param = this.GetParamInsertDB(gen);
            return await this.QueryFirstOrDefaultAsync<int>(proc, param);
        }
    }
}
