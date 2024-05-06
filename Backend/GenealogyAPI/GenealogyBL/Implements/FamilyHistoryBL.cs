using GenealogyBL.Interfaces;
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
    internal class FamilyHistoryBL : BaseBL<FamilyHistory>, IFamilyHistoryBL
    {
        private readonly IFamilyHistoryDL _familyHistoryDL;
        public FamilyHistoryBL(IFamilyHistoryDL familyHistoryDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService, INotificationDL notificationDL, INotificationService notificationService) : base(env, familyHistoryDL, logDL, authService, notificationDL, notificationService)
        {
            _familyHistoryDL = familyHistoryDL;
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

        public async Task<FamilyHistory> GetByGenealogyId(object id)
        {
            return await _familyHistoryDL.GetByGenealogyId(id);
        }

    }

}