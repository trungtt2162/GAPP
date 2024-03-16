using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace GenealogyDL.Implements
{
    public class FamilyHistoryDL: BaseDL<FamilyHistory>, IFamilyHistoryDL
    {
        public FamilyHistoryDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }
    }
}
