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
        override
        public void GetCustomParamPaging(PageRequest pagingRequest)
        {
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                throw new ArgumentException("IDGenealogy is null");
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }

        }
    }

}