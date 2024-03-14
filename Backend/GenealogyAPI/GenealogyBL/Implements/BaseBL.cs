using GenealogyBL.Interfaces;
using GenealogyCommon.Configuration;
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
    internal class BaseBL<T> : IBaseBL<T> where T : class
    {
        protected readonly IConfiguration _configuration;
        private readonly IBaseDL<T> _baseDL;

        public BaseBL(IWebHostEnvironment env, IBaseDL<T> baseDL)
        {
            _configuration = ConfigService.GetConfiguration(env);
            _baseDL = baseDL;
        }

        public async Task<object> Create(T obj)
        {
            return await _baseDL.Create(obj);
        }

        public async Task<bool> DeleteByID(int Id)
        {
            return await _baseDL.DeleteById(Id);
        }

        public async Task<T> GetById(object id)
        {
            return await _baseDL.GetById(id);
        }

        public Task<bool> Update(T obj)
        {
            return _baseDL.Update(obj);
        }
        public async Task<PageResult<T>> GetPagingData(PageRequest pagingRequest){
            this.GetCustomParamPaging(pagingRequest);
            return await _baseDL.GetPagingData(pagingRequest.PageSize, pagingRequest.PageNumber, pagingRequest.Condition, pagingRequest.SortOrder);
        }
        public virtual void GetCustomParamPaging(PageRequest pagingRequest){

        }
    }
}
