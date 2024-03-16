using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace GenealogyDL.Implements
{
    internal class FamilyAddressDL : BaseDL<FamilyAddress>, IFamilyAddressDL
    {
        public FamilyAddressDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }
    }

}