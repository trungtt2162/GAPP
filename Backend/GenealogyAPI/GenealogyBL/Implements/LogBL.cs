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
    internal class LogBL : BaseBL<Log>, ILogBL
    {
        private readonly ILogDL _logDL;
        public LogBL(ILogDL logDL, IWebHostEnvironment env) : base(env, logDL)
        {
            _logDL = logDL;
        }

    }

}