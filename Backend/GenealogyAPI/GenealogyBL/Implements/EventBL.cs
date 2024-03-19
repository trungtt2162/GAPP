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
    internal class EventBL : BaseBL<Event>, IEventBL
    {
        private readonly IEventDL _eventDL;
        public readonly IAuthService _authService;
        public readonly IGenealogyBL _genealogyBL;
        public EventBL(IGenealogyBL genealogyBL, IAuthService authService, IEventDL eventDL, IWebHostEnvironment env) : base(env, eventDL)
        {
            _eventDL = eventDL;
            _authService = authService;
            _genealogyBL = genealogyBL;
        }
        public async Task<object> Create(Event obj)
        {
            obj.UserIDHost = int.Parse(_authService.GetUserID());
            return await _eventDL.Create(obj);
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

        public async Task<PageResult<Event>> GetPagingDataGuest(PageRequest pagingRequest,int idGenealogy)
        {
            var gen = await _genealogyBL.GetById(idGenealogy);
            if (gen == null || !gen.IsPublic )
            {
                return new PageResult<Event>();
            }
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                pagingRequest.Condition = $" 1 = 1 and IdGenealogy = {idGenealogy} ";
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }
            return await _eventDL.GetPagingData(pagingRequest.PageSize, pagingRequest.PageNumber, pagingRequest.Condition, pagingRequest.SortOrder);
        }
    }

}