using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class FamilyHistoryBL : BaseBL<FamilyHistory>, IFamilyHistoryBL
    {
        private readonly IFamilyHistoryDL _familyHistoryDL;
        public FamilyHistoryBL(IFamilyHistoryDL familyHistoryDL, IWebHostEnvironment env) : base(env, familyHistoryDL)
        {
            _familyHistoryDL = familyHistoryDL;
        }

    }

}