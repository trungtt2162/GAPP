using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class FamilyTreeBL: BaseBL<FamilyTree>, IFamilyTreeBL
    {
        private readonly IFamilyTreeDL _familyTreeDL;
        public FamilyTreeBL(IFamilyTreeDL familyTreeDL, IWebHostEnvironment env) : base(env, familyTreeDL)
        {
            _familyTreeDL = familyTreeDL;
        }

    }
}
