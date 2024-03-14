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
    public class FamilyTreeDL: BaseDL<FamilyTree>, IFamilyTree
    {
        public FamilyTreeDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }

    }
}
