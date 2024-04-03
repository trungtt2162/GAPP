﻿using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
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
    internal class GenealogyBL : BaseBL<Genealogy>, IGenealogyBL
    {
        private readonly IGenealogyDL _genealogyDL;
        public GenealogyBL(IGenealogyDL genealogyDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService) : base(env, genealogyDL, logDL, authService)
        {
            _genealogyDL = genealogyDL;
        }

        public async Task<PageResult<Genealogy>> GetPagingDataGuest(PageRequest pagingRequest)
        {
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                pagingRequest.Condition = " 1 = 1 ";
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }
            return await _genealogyDL.GetPagingData(pagingRequest.PageSize, pagingRequest.PageNumber, pagingRequest.Condition, pagingRequest.SortOrder);
        }
    }
}
