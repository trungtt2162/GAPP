using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    public class FundDL : BaseDL<Fund>, IFundDL
    {
        public FundDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }

        public async Task<bool> UpdateMoneyFund(int idFund, int idGenealogy)
        {
            var proc = $"Proc_Update_Money_Fund";
            var param = new Dictionary<string , object>()
            {
                ["p_IdGenealogy"] = idGenealogy,
                ["p_IdFund"] = idFund
            };
            return (await this.QueryFirstOrDefaultAsync<int>(proc, param)) > 0;
        }
    }
}
