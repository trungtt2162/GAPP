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
    internal class LogBL : BaseBL<Log>, ILogBL
    {
        public LogBL( IWebHostEnvironment env, ILogDL logDL, IAuthService authService, INotificationDL notificationDL, INotificationService notificationService) : base(env, logDL, logDL, authService, notificationDL, notificationService)
        {
        }

    }

}