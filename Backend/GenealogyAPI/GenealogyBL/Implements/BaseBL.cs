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

        public Task<object> Create(T obj)
        {
            return await _baseDL.Create(obj);
        }

        public Task<bool> DeleteByID(T obj)
        {
            return await _baseDL.DeleteByID(id);
        }

        public async Task<T> GetById(object id)
        {
            return await _baseDL.GetById(id);
        }

        public Task<bool> Update(T obj)
        {
            return _baseDL.Update(obj);
        }
        public Task<PageResult> GetPagingData(PagingRequest pagingRequest){
            this.GetCustomParamPaging(pagingRequest);
            return await _baseDL.GetPagingData(pagingRequest.PageSize, pagingRequest.PageNumber, pagingRequest.Condition, pagingRequest.SortOrder);
        }
        virtual void GetCustomParamPaging(PagingRequest pagingRequest){

        }
    }
}
