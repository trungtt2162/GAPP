using GenealogyBL.Interfaces;
using GenealogyCommon.Interfaces;
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
        public FundBL(IFundDL fundDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService, INotificationDL notificationDL, INotificationService notificationService) : base(env, fundDL, logDL, authService, notificationDL, notificationService)
        {
            _fundDL = fundDL;
        }
        public async Task<bool> UpdateMoneyFund(int idFund, int idGenealogy)
        {
            return await _fundDL.UpdateMoneyFund(idFund, idGenealogy);
        }
    }

}