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
    internal class FundBL : BaseBL<Fund>, IFundBL
    {
        private readonly IFundDL _fundDL;
        public FundBL(IFundDL fundDL, IWebHostEnvironment env) : base(env, fundDL)
        {
            _fundDL = fundDL;
        }

    }

}