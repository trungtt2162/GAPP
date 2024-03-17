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
        public EventBL(IAuthService authService, IEventDL eventDL, IWebHostEnvironment env) : base(env, eventDL)
        {
            _eventDL = eventDL;
            _authService = authService;
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
    }

}