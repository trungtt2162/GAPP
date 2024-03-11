using GenealogyBL.Interfaces;
using GenealogyCommon.Configuration;
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
    internal class BaseBL<T> : IBaseBL<T> where T : class
    {
        protected readonly IConfiguration _configuration;
        private readonly IBaseDL<T> _baseDL;

        public BaseBL(IWebHostEnvironment env, IBaseDL<T> baseDL)
        {
            _configuration = ConfigService.GetConfiguration(env);
            _baseDL = baseDL;
        }
        public async Task<T> GetById(object id)
        {
            return await _baseDL.GetById(id);
        }
    }
}
