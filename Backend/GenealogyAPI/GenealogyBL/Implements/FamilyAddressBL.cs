using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class FamilyAddressBL : BaseBL<FamilyAddress>, IFamilyAddressBL
    {
        private readonly IFamilyAddressDL _familyAddressDL;
        public FamilyAddressBL(IFamilyAddressDL familyAddressDL, IWebHostEnvironment env) : base(env, familyAddressDL)
        {
            _familyAddressDL = familyAddressDL;
        }

    }

}