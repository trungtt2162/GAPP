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
    internal class UserGenealogyBL: BaseBL<UserGenealogy>, IUserGenealogyBL
    {
        private readonly IUserGenealogyDL _userGenealogyDL;
        public UserGenealogyBL(IUserGenealogyDL userGenealogyDL, IWebHostEnvironment env) : base(env, userGenealogyDL)
        {
            _userGenealogyDL = userGenealogyDL;
        }

    }
}
